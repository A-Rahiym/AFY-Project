// src/services/adminAssignmentService.js
// This file contains the core logic for administrative room assignment based on student choices.

import supabase from '../config/supabase.js'; // Ensure this path is correct for your Supabase client
import { getAvailableRoomsInHostel } from '../models/hostelModel.js'; // Import the model function that calls get_available_rooms_with_occupancy RPC

/**
 * Fetches a student's profile by ID, specifically for the purpose of room assignment.
 * Retrieves student's gender, submitted hostel choices, and current assignment status.
 *
 * @param {string} studentId - The UUID of the student to fetch.
 * @returns {object|null} The student's profile data, or null if the student is not found.
 * @throws {Error} If the database query fails for reasons other than 'no rows found'.
 */
const getStudentDetailsForAssignment = async (studentId) => {
    try {
        const { data, error } = await supabase
            .from('students')
            // Select the necessary columns for assignment logic:
            // id: student's unique ID
            // gender: student's gender (for matching with hostel gender)
            // choice1_host, choice2_host, choice3_host: the UUIDs of their preferred hostels
            // assigned_room_id: checks if they already have an assigned room
            .select('id, gender, choice1_hostel_id, choice2_hostel_id, choice3_hostel_id, assigned_room_id')
            .eq('id', studentId)
            .single(); // Use .single() as we expect only one student

        if (error) {
            // Check for specific error code for 'no rows found' (PGRST116 for PostgREST)
            // If it's just no data, it's not a critical error, just means student not found.
            if (error.code === 'PGRST116') {
                return null; // Student not found
            }
            console.error(`Error fetching student ${studentId} for assignment:`, error.message);
            throw new Error(`Failed to retrieve student details: ${error.message}`);
        }
        return data; // Return the student data
    } catch (error) {
        // Re-throw any errors encountered during the Supabase call
        throw error;
    }
};

/**
 * Attempts to assign a room to a single student based on their submitted hostel choices.
 * This function orchestrates the assignment process by:
 * 1. Fetching student details (gender, choices, current assignment).
 * 2. Iterating through the student's prioritized hostel choices.
 * 3. For each choice, it calls getAvailableRoomsInHostel (which uses a DB RPC) to find available rooms.
 * 4. If an available room is found, it calls assign_student_to_room_atomically (a DB RPC)
 * to perform the assignment transactionally in the database, preventing race conditions.
 *
 * @param {string} studentId The unique identifier (UUID) of the student to assign a room to.
 * @returns {Promise<object|null>} A Promise that resolves to an object containing assignment
 * details if successful, or null if no room could be assigned
 * after trying all choices.
 * @throws {Error} If the student is not found, already assigned, has no choices, or other
 * critical errors occur during the process.
 */
export const assignRoomToStudentByChoices = async (studentId) => {
    // 1. Fetch student details to get their gender and submitted choices
    const student = await getStudentDetailsForAssignment(studentId);

    if (!student) {
        // Throw a specific error if the student is not found
        throw new Error(`Student with ID ${studentId} not found.`);
    }

    // Check if the student is already assigned a room
    if (student.assigned_room_id) {
        // Throw an error if the student already has an assignment
        throw new Error(`Student ${studentId} is already assigned to a room.`);
    }

    // Filter out any null or undefined choices and create a clean array of hostel IDs
    // Assumes student profile columns for choices are `choice1_host`, `choice2_host`, `choice3_host`
    const choices = [student.choice1_hostel_id, student.choice2_hostel_id, student.choice3_hostel_id].filter(id => id !== null);

    if (choices.length === 0) {
        // Throw an error if the student has no submitted choices
        throw new Error(`Student ${studentId} has no hostel choices submitted.`);
    }

    console.log(`Attempting to assign room for student ${studentId} (Gender: ${student.gender}) with choices:`, choices);

    // 2. Iterate through the student's choices in order of preference
    for (const hostelChoiceId of choices) {
        try {
            // Get available rooms for the current hostel choice, filtered by student's gender.
            // This calls the Supabase RPC function `get_available_rooms_with_occupancy.
            const availableRooms = await getAvailableRoomsInHostel(hostelChoiceId, student.gender);
            console.log(`Found ${availableRooms.length} available rooms in hostel ${hostelChoiceId} for gender ${student.gender}.`);
            if (availableRooms.length > 0) {
                // Take the first available room, as they are already sorted by current_occupancy.
                const roomToAttemptAssign = availableRooms[0];
                console.log(`Attempting atomic assignment for student ${studentId} to room ${roomToAttemptAssign.room_name} (ID: ${roomToAttemptAssign.id}).`);
                // 3. Perform the atomic assignment using the Supabase RPC function.
                // This RPC handles all critical checks (capacity, gender match, student not already assigned)
                // and updates the database (inserts booking, updates student) in a single transaction.
                const { data: rpcResult, error: rpcError } = await supabase.rpc('assign_student_to_room_atomically', {
                    p_student_id: studentId,
                    p_room_id: roomToAttemptAssign.id,
                    p_assignment_status: 'ACTIVE' // Use 'ACTIVE' or 'ASSIGNED_AUTO' as per your booking_status_enum
                });

                if (rpcError) {
                    // This means the RPC *call itself* failed (e.g., network issue, malformed RPC call)
                    console.error(`RPC call 'assign_student_to_room_atomically' failed for student ${studentId} to room ${roomToAttemptAssign.id}:`, rpcError.message);
                    // Continue to the next choice, as this room might be problematic, or it's a transient error.
                    continue;
                }

                if (rpcResult && rpcResult.success) {
                    // If the RPC returns `success: true`, the assignment was fully successful at the DB level.
                    console.log(`Successfully assigned student ${studentId} to room ${rpcResult.assignedRoomName} (ID: ${rpcResult.assignedRoomId}). Booking ID: ${rpcResult.bookingId}`);
                    // Return the assignment details to the caller
                    return {
                        studentId: studentId,
                        assignedRoomId: rpcResult.assignedRoomId,
                        assignedRoomName: rpcResult.assignedRoomName,
                        bookingId: rpcResult.bookingId,
                        message: rpcResult.message
                    };
                } else if (rpcResult && !rpcResult.success) {
                    // If the RPC returned `success: false`, it means a business rule was violated (e.g., room just became full).
                    console.warn(`Atomic assignment failed for student ${studentId} to room ${roomToAttemptAssign.id}: ${rpcResult.message}. Trying next choice if applicable.`);
                    // If the failure reason indicates the student is already assigned (a redundant check but good safety),
                    // then we should stop trying other choices for this student.
                    if (rpcResult.message.includes('already assigned')) {
                        throw new Error(`Student ${studentId} is already assigned (detected during atomic assignment).`);
                    }
                    // Otherwise, if it's a room-specific failure (like 'room full'), try the next choice.
                    continue;
                }
            }
        } catch (error) {
            // Catch any unexpected errors during the processing of a specific choice
            console.error(`Error processing hostel choice ${hostelChoiceId} for student ${studentId}:`, error.message);
            // Continue to the next choice, as this specific choice might be problematic.
        }
    }

    // If the loop completes without successfully assigning a room after trying all choices
    console.log(`Could not assign a room for student ${studentId} after checking all choices.`);
    return null; // Indicate that no room could be assigned
};