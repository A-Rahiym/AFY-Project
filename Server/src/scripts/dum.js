// src/models/studentModel.js
import supabase from '../config/supabase.js';
import { ulid } from 'ulid';

import { getAvailableRoomsInHostel } from './hostelModel.js';

// --- Function to generate a new FCFS ID using ULID ---
function generateFcfsId() {
    return ulid(); // Generates a new ULID string
}

/**
 * Updates a student's payment status and assigns a ULID-based FCFS ID if the status is set to true.
 * If setting to false, it explicitly sets fcfs_id to null.
 * @param {string} studentId - The ID of the student.
 * @param {boolean} paidStatus - The new payment status (true for paid, false for not paid).
 * @returns {Promise<object>} The updated student record.
 * @throws {Error} If the update fails.
 */
export const updateStudentPaymentStatus = async (studentId, paidStatus) => {
    if (typeof paidStatus !== 'boolean') {
        throw new Error('paidStatus must be a boolean (true or false).');
    }

    let updateData = { has_paid: paidStatus };

    // Conditionally assign FCFS ID if paidStatus is true
    if (paidStatus) {
        // Check if student already has an FCFS ID to prevent re-assignment
        const { data: currentStudent, error: fetchError } = await supabase
            .from('students')
            .select('fcfs_id')
            .eq('id', studentId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means 'No rows found'
            console.error(`Error fetching student ${studentId} for FCFS check:`, fetchError.message);
            throw new Error(`Failed to retrieve student for FCFS check: ${fetchError.message}`);
        }

        if (currentStudent && currentStudent.fcfs_id !== null) {
            console.log(`Student ${studentId} already has FCFS ID: ${currentStudent.fcfs_id}. Not assigning a new one.`);
            // No need to include fcfs_id in updateData if it's already set
        } else {
            const newFcfsId = generateFcfsId();
            updateData.fcfs_id = newFcfsId;
            console.log(`Assigning new FCFS ID ${newFcfsId} to student ${studentId}`);
        }
    } else {
        // If setting to false, explicitly set fcfs_id to null
        updateData.fcfs_id = null;
    }

    const { data, error } = await supabase
        .from('students')
        .update(updateData)
        .eq('id', studentId)
        .select();

    if (error) {
        console.error(`Error updating payment status for student ${studentId}:`, error.message);
        throw new Error(`Failed to update student payment status: ${error.message}`);
    }

    if (!data || data.length === 0) {
        throw new Error(`Student with ID ${studentId} not found or no changes were made.`);
    }

    console.log(`Student ${studentId} 'has_paid' status updated to: ${paidStatus}.`);
    return data[0];
};

/**
 * Retrieves student details, including their gender, payment status, FCFS ID, and assigned room.
 * @param {string} studentId - The ID of the student.
 * @returns {Promise<object>} The student's details.
 * @throws {Error} If the student is not found or retrieval fails.
 */
export const getStudentDetails = async (studentId) => {
    const { data, error } = await supabase
        .from('students')
        .select(`
            id,
            gender,
            has_paid,
            fcfs_id,
            assigned_room_id,
            choice1_hostel_id,
            choice2_hostel_id,
            choice3_hostel_id
        `)
        .eq('id', studentId)
        .single();

    if (error) {
        console.error(`Error fetching student ${studentId}:`, error.message);
        throw new Error(`Failed to retrieve student details: ${error.message}`);
    }
    if (!data) {
        throw new Error(`Student with ID ${studentId} not found.`);
    }
    return data;
};


/**
 * Updates a student's chosen hostel preferences.
 * @param {string} studentId - The UUID of the student.
 * @param {string} choice1Id - UUID of the 1st preferred hostel.
 * @param {string} choice2Id - UUID of the 2nd preferred hostel.
 * @param {string} choice3Id - UUID of the 3rd preferred hostel.
 * @returns {Promise<object>} The updated student record with choices.
 * @throws {Error} If update fails.
 */
export const updateStudentHostelChoices = async (studentId, choice1Id, choice2Id, choice3Id) => {
    const { data, error } = await supabase
        .from('students')
        .update({
            choice1_hostel_id: choice1Id || null,
            choice2_hostel_id: choice2Id || null,
            choice3_hostel_id: choice3Id || null,
        })
        .eq('id', studentId)
        .select();

    if (error) {
        console.error(`Error updating choices for student ${studentId}:`, error.message);
        throw new Error(`Failed to save hostel choices: ${error.message}`);
    }
    if (!data || data.length === 0) {
        throw new Error(`Student with ID ${studentId} not found or no changes made to choices.`);
    }
    console.log(`Student ${studentId} choices updated.`);
    return data[0];
};

/**
 * Retrieves all students eligible for automated assignment, sorted by FCFS ID.
 * Eligible students: has_paid = true, fcfs_id is not null, assigned_room_id is null,
 * and has at least one hostel choice.
 * @returns {Promise<Array<object>>} A list of eligible unassigned students.
 * @throws {Error} If fetching students fails.
 */
export const getEligibleUnassignedStudents = async () => {
    const { data, error } = await supabase
        .from('students')
        .select(`
            id,
            gender,
            fcfs_id,
            choice1_hostel_id,
            choice2_hostel_id,
            choice3_hostel_id
        `)
        .eq('has_paid', true)
        .not('fcfs_id', 'is', null) // fcfs_id is not null
        .is('assigned_room_id', null) // not yet assigned a room
        .or('choice1_hostel_id.not.is.null,choice2_hostel_id.not.is.null,choice3_hostel_id.not.is.null') // Has at least one choice
        .order('fcfs_id', { ascending: true }); // Crucial: ORDER BY FCFS_ID

    if (error) {
        console.error("Error fetching eligible unassigned students:", error.message);
        throw new Error(`Failed to retrieve eligible students: ${error.message}`);
    }
    return data;
};


/**
 * Attempts to assign a single student to a room based on their choices.
 * This is a helper for the batch assignment process.
 * @param {object} student - The student object including choices and gender.
 * @returns {Promise<object|null>} The assigned room details if successful, null otherwise.
 */
const assignRoomForSingleStudent = async (student) => {
    const { id: studentId, gender, choice1_hostel_id, choice2_hostel_id, choice3_hostel_id } = student;
    const choices = [choice1_hostel_id, choice2_hostel_id, choice3_hostel_id].filter(id => id !== null);

    for (const hostelChoiceId of choices) {
        try {
            const availableRooms = await getAvailableRoomsInHostel(hostelChoiceId, gender);
            if (availableRooms.length > 0) {
                const roomToAssign = availableRooms[0]; // First available room (sorted by occupancy)

                // Attempt to update room occupancy (atomic operation)
                const newOccupancy = roomToAssign.current_occupancy + 1;
                const roomIsStillAvailable = newOccupancy < roomToAssign.max_capacity;

                const { data: updatedRoom, error: roomUpdateError } = await supabase
                    .from('hostel_room')
                    .update({
                        current_occupancy: newOccupancy,
                        is_available: roomIsStillAvailable
                    })
                    .eq('id', roomToAssign.id)
                    .select();

                if (roomUpdateError || !updatedRoom || updatedRoom.length === 0) {
                    console.warn(`Room ${roomToAssign.id} failed to update for student ${studentId} (possibly taken by another process). Trying next choice.`);
                    continue; // Try the next choice
                }

                // Create booking record
                const { data: booking, error: bookingError } = await supabase
                    .from('hostel_booking')
                    .insert({
                        student_id: studentId,
                        room_id: updatedRoom[0].id,
                        status: 'ASSIGNED_AUTO'
                    })
                    .select();

                if (bookingError || !booking || booking.length === 0) {
                    console.error(`Failed to create booking for student ${studentId} in room ${updatedRoom[0].id}. Rolling back room occupancy.`, bookingError.message);
                    // Rollback room occupancy if booking creation fails
                    await supabase.from('hostel_room')
                        .update({ current_occupancy: roomToAssign.current_occupancy, is_available: true })
                        .eq('id', updatedRoom[0].id);
                    continue; // Try next choice
                }

                // Update student's assigned_room_id
                const { error: studentUpdateError } = await supabase
                    .from('students')
                    .update({ assigned_room_id: updatedRoom[0].id })
                    .eq('id', studentId);

                if (studentUpdateError) {
                    console.error(`Failed to update student ${studentId} with assigned room ${updatedRoom[0].id} after successful booking.`, studentUpdateError.message);
                }

                console.log(`Student ${studentId} successfully assigned to room ${updatedRoom[0].room_number} in hostel ${hostelChoiceId}.`);
                return {
                    assignedRoom: updatedRoom[0],
                    booking: booking[0]
                };
            }
        } catch (error) {
            console.error(`Error processing choice ${hostelChoiceId} for student ${studentId}:`, error.message);
            // Continue to next choice if an error occurs for current one
        }
    }
    return null; // No room found for this student
};


/**
 * Initiates the batch automated hostel assignment process.
 * Fetches all eligible students sorted by FCFS ID and attempts to assign them.
 * @returns {Promise<object>} Summary of assignment results.
 */
export const runBatchAutomatedAssignment = async () => {
    const eligibleStudents = await getEligibleUnassignedStudents();
    console.log(`Found ${eligibleStudents.length} eligible students for batch assignment.`);

    let assignedCount = 0;
    let unassignedCount = 0;
    let assignmentResults = [];

    for (const student of eligibleStudents) {
        console.log(`Attempting assignment for student ${student.id} (FCFS: ${student.fcfs_id}).`);
        const result = await assignRoomForSingleStudent(student);

        if (result) {
            assignedCount++;
            assignmentResults.push({ studentId: student.id, status: 'assigned', room: result.assignedRoom.id });
        } else {
            unassignedCount++;
            assignmentResults.push({ studentId: student.id, status: 'unassigned', message: 'No suitable room found.' });
        }
    }

    console.log(`Batch assignment complete. Assigned: ${assignedCount}, Unassigned: ${unassignedCount}.`);
    return {
        totalEligible: eligibleStudents.length,
        assigned: assignedCount,
        unassigned: unassignedCount,
        details: assignmentResults
    };
};



// src/models/hostelModel.js
import supabase from '../config/supabase.js';

// ... (your existing hostel model functions) ...

/**
 * Retrieves available rooms within a specific hostel, matching gender.
 * Filters by current_occupancy < max_capacity and matches the hostel's gender.
 * Prioritizes rooms with fewer occupants.
 * @param {string} hostelId - The ID of the hostel.
 * @param {string} studentGender - The gender of the student ('MALE' or 'FEMALE').
 * @returns {Promise<Array>} A list of available room objects.
 * @throws {Error} If fetching rooms fails.
 */
export const getAvailableRoomsInHostel = async (hostelId, studentGender) => {
    // Join hostel_room with hostel to filter by gender and ensure room belongs to correct gender hostel
    const { data, error } = await supabase
        .from('hostel_room')
        .select(`
            id,
            room_number,
            max_capacity,
            current_occupancy,
            hostel_id,
            hostels!inner(id, name, gender) // Inner join to ensure hostel gender matches
        `)
        .eq('hostel_id', hostelId)
        .lt('current_occupancy', supabase.col('max_capacity')) // Room is not full
        .eq('hostels.gender', studentGender) // Match hostel gender to student gender
        .order('current_occupancy', { ascending: true }) // Prioritize rooms with fewer occupants
        .order('room_number', { ascending: true }); // Secondary sort for consistency

    if (error) {
        console.error(`Error fetching available rooms for hostel ${hostelId} (gender ${studentGender}):`, error.message);
        throw new Error(`Failed to retrieve available rooms: ${error.message}`);
    }
    // Return only the room details, without the nested 'hostels' object
    return data.map(row => ({
        id: row.id,
        room_number: row.room_number,
        max_capacity: row.max_capacity,
        current_occupancy: row.current_occupancy,
        hostel_id: row.hostel_id
    }));
};


// src/models/studentModel.js (or wherever this function is located)

// Ensure supabase and getAvailableRoomsInHostel are correctly imported
// import { supabase } from '../config/supabaseClient'; // Assuming your Supabase client is configured here
// import { getAvailableRoomsInHostel } from './hostelModel'; // Assuming this path

const assignRoomForSingleStudent = async (student) => {
    const { id: studentId, gender, choice1_hostel_id, choice2_hostel_id, choice3_hostel_id } = student;
    const choices = [choice1_hostel_id, choice2_hostel_id, choice3_hostel_id].filter(id => id !== null);

    for (const hostelChoiceId of choices) {
        try {
            // getAvailableRoomsInHostel now returns objects with 'id' (room_id) and 'room_name'
            const availableRooms = await getAvailableRoomsInHostel(hostelChoiceId, gender);
            console.log(`DEBUG: Available rooms for hostel ${hostelChoiceId} (${gender}):`, availableRooms); // Debugging

            if (availableRooms.length > 0) {
                const roomToAssign = availableRooms[0]; // First available room (sorted by occupancy)
                console.log(`DEBUG: Attempting to assign room:`, roomToAssign); // Debugging

                // Attempt to update room occupancy (atomic operation)
                const newOccupancy = roomToAssign.current_occupancy + 1;
                // roomIsStillAvailable correctly checks if the room will be full after this assignment
                const roomIsStillAvailable = newOccupancy < roomToAssign.max_capacity;

                // Update the hostel_block_room record
                const { data: updatedRoom, error: roomUpdateError } = await supabase
                    .from('hostel_block_room') // Table name is hostel_block_room
                    .update({
                        current_occupancy: newOccupancy,
                        // Set is_available flag based on new occupancy
                        is_available: roomIsStillAvailable
                    })
                    .eq('id', roomToAssign.id) // Update by the room's actual ID (hostel_block_room.id)
                    .select(); // Select the updated row to get its latest state

                if (roomUpdateError || !updatedRoom || updatedRoom.length === 0) {
                    console.warn(`Room ${roomToAssign.id} failed to update for student ${studentId} (possibly taken by another process). Trying next choice. Error:`, roomUpdateError?.message);
                    continue; // Try the next choice
                }
                console.log(`DEBUG: Room ${updatedRoom[0].id} occupancy updated to ${updatedRoom[0].current_occupancy}.`); // Debugging

                // Create booking record in hostel_booking table
                const { data: booking, error: bookingError } = await supabase
                    .from('hostel_booking')
                    .insert({
                        student_id: studentId,
                        room_id: updatedRoom[0].id, // Use the updated room's ID
                        status: 'ASSIGNED_AUTO'
                    })
                    .select();

                if (bookingError || !booking || booking.length === 0) {
                    console.error(`Failed to create booking for student ${studentId} in room ${updatedRoom[0].id}. Rolling back room occupancy. Error:`, bookingError.message);
                    // Rollback room occupancy if booking creation fails
                    await supabase.from('hostel_block_room') // Rollback on hostel_block_room
                        .update({ current_occupancy: roomToAssign.current_occupancy, is_available: true }) // Revert to original occupancy, set available
                        .eq('id', updatedRoom[0].id);
                    continue; // Try next choice
                }
                console.log(`DEBUG: Booking created for student ${studentId} in room ${updatedRoom[0].id}.`); // Debugging

                // Update student's assigned_room_id
                // Assuming 'students' table has 'assigned_room_id' pointing to 'hostel_block_room.id'
                const { error: studentUpdateError } = await supabase
                    .from('students')
                    .update({ assigned_room_id: updatedRoom[0].id, is_assigned: true }) // Also set is_assigned to true
                    .eq('id', studentId);

                if (studentUpdateError) {
                    console.error(`Failed to update student ${studentId} with assigned room ${updatedRoom[0].id} after successful booking. Error:`, studentUpdateError.message);
                    // Decide whether to rollback (complex) or flag for manual intervention.
                    // For now, it's a warning but allows the assignment to complete.
                }
                console.log(`DEBUG: Student ${studentId} updated with assigned room ${updatedRoom[0].id}.`); // Debugging

                console.log(`Student ${studentId} successfully assigned to room ${updatedRoom[0].name} (ID: ${updatedRoom[0].id}) in hostel ${roomToAssign.hostel_name} (ID: ${hostelChoiceId}).`);
                return {
                    assignedRoom: updatedRoom[0], // Return the updated room object
                    booking: booking[0] // Return the created booking object
                };
            }
        } catch (error) {
            console.error(`Error processing choice ${hostelChoiceId} for student ${studentId}:`, error.message);
            // Continue to next choice if an error occurs for current one
        }
    }
    return null; // No room found for this student
};