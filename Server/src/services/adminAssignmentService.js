// src/services/adminAssignmentService.js
// This file contains the core logic for administrative room assignment based on student choices.

import supabase from '../config/supabase.js'; // Ensure this path is correct for your Supabase client
import { getAvailableRoomsInHostel ,  getAvailableRoomsInHostelRpc } from '../models/hostelModel.js'; // Import the model function that calls get_available_rooms_with_occupancy RPC

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
// export const assignRoomToStudentByChoices = async (studentId) => {
//     // 1. Fetch student details to get their gender and submitted choices
//     const student = await getStudentDetailsForAssignment(studentId);
//     if (!student) {
//         // Throw a specific error if the student is not found
//         throw new Error(`Student with ID ${studentId} not found.`);
//     }
//     // Check if the student is already assigned a room
//     if (student.assigned_room_id) {
//         // Throw an error if the student already has an assignment
//         throw new Error(`Student ${studentId} is already assigned to a room.`);
//     }
//     // Filter out any null or undefined choices and create a clean array of hostel IDs
//     // Assumes student profile columns for choices are `choice1_host`, `choice2_host`, `choice3_host`
//     const choices = [student.choice1_hostel_id, student.choice2_hostel_id, student.choice3_hostel_id].filter(id => id !== null);
//     if (choices.length === 0) {
//         // Throw an error if the student has no submitted choices
//         throw new Error(`Student ${studentId} has no hostel choices submitted.`);
//     }
//     console.log(`Attempting to assign room for student ${studentId} (Gender: ${student.gender}) with choices:`, choices);
//     // 2. Iterate through the student's choices in order of preference
//     for (const hostelChoiceId of choices) {
//         try {
//             // Get available rooms for the current hostel choice, filtered by student's gender.
//             // This calls the Supabase RPC function `get_available_rooms_with_occupancy.
//             // const availableRooms = await getAvailableRoomsInHostel(hostelChoiceId, student.gender);
//             const availableRooms = await getAvailableRoomsInHostelRpc(hostelChoiceId, student.gender);
//             console.log(`Found ${availableRooms.length} available rooms in hostel ${hostelChoiceId} for gender ${student.gender}.`);
//             if (availableRooms.length > 0) {
//                 // Take the first available room, as they are already sorted by current_occupancy.
//                 const roomToAttemptAssign = availableRooms[0];
//                 console.log(`Attempting atomic assignment for student ${studentId} to room ${roomToAttemptAssign.room_name} (ID: ${roomToAttemptAssign.id}).`);
//                 // 3. Perform the atomic assignment using the Supabase RPC function.
//                 // This RPC handles all critical checks (capacity, gender match, student not already assigned)
//                 // and updates the database (inserts booking, updates student) in a single transaction.
//                 const { data: rpcResult, error: rpcError } = await supabase.rpc('assign_student_to_room_atomically', {
//                     p_student_id: studentId,
//                     p_room_id: roomToAttemptAssign.id,
//                     p_assignment_status: 'ACTIVE' // Use 'ACTIVE' or 'ASSIGNED_AUTO' as per your booking_status_enum
//                 });
//                 if (rpcError) {
//                     // This means the RPC *call itself* failed (e.g., network issue, malformed RPC call)
//                     console.error(`RPC call 'assign_student_to_room_atomically' failed for student ${studentId} to room ${roomToAttemptAssign.id}:`, rpcError.message);
//                     // Continue to the next choice, as this room might be problematic, or it's a transient error.
//                     continue;
//                 }
//                 if (rpcResult && rpcResult.success) {
//                     // If the RPC returns `success: true`, the assignment was fully successful at the DB level.
//                     console.log(`Successfully assigned student ${studentId} to room ${rpcResult.assignedRoomName} (ID: ${rpcResult.assignedRoomId}). Booking ID: ${rpcResult.bookingId}`);
//                     // Return the assignment details to the caller
//                     return {
//                         studentId: studentId,
//                         assignedRoomId: rpcResult.assignedRoomId,
//                         assignedRoomName: rpcResult.assignedRoomName,
//                         bookingId: rpcResult.bookingId,
//                         message: rpcResult.message
//                     };
//                 } else if (rpcResult && !rpcResult.success) {
//                     // If the RPC returned `success: false`, it means a business rule was violated (e.g., room just became full).
//                     console.warn(`Atomic assignment failed for student ${studentId} to room ${roomToAttemptAssign.id}: ${rpcResult.message}. Trying next choice if applicable.`);
//                     // If the failure reason indicates the student is already assigned (a redundant check but good safety),
//                     // then we should stop trying other choices for this student.
//                     if (rpcResult.message.includes('already assigned')) {
//                         throw new Error(`Student ${studentId} is already assigned (detected during atomic assignment).`);
//                     }
//                     // Otherwise, if it's a room-specific failure (like 'room full'), try the next choice.
//                     continue;
//                 }
//             }
//         } catch (error) {
//             // Catch any unexpected errors during the processing of a specific choice
//             console.error(`Error processing hostel choice ${hostelChoiceId} for student ${studentId}:`, error.message);
//             // Continue to the next choice, as this specific choice might be problematic.
//         }
//     }

//     // If the loop completes without successfully assigning a room after trying all choices
//     console.log(`Could not assign a room for student ${studentId} after checking all choices.`);
//     return null; // Indicate that no room could be assigned
// };


// export const assignRoomToStudentByChoices = async (studentId) => {
//     console.log(`[ASSIGN_DEBUG] Starting assignment attempt for student: ${studentId}`);

//     // 1. Fetch student details to get their gender and submitted choices
//     const student = await getStudentDetailsForAssignment(studentId);

//     if (!student) {
//         console.log(`[ASSIGN_DEBUG] Student ${studentId} not found.`);
//         throw new Error(`Student with ID ${studentId} not found.`);
//     }

//     if (!student.gender) {
//         console.log(`[ASSIGN_DEBUG] Student ${studentId} has no gender.`);
//         throw new new Error(`Student ${studentId} has no gender specified in their profile. Cannot proceed with room assignment.`);
//     }

//     if (student.assigned_room_id) {
//         console.log(`[ASSIGN_DEBUG] Student ${studentId} is already assigned to room: ${student.assigned_room_id}.`);
//         throw new Error(`Student ${studentId} is already assigned to a room.`);
//     }

//     // Filter out any null or undefined choices and create a clean array of hostel IDs
//     // *** Using choice1_hostel_id, choice2_hostel_id, choice3_hostel_id as confirmed by you ***
//     const choices = [student.choice1_hostel_id, student.choice2_hostel_id, student.choice3_hostel_id].filter(id => id !== null);

//     if (choices.length === 0) {
//         console.log(`[ASSIGN_DEBUG] Student ${studentId} has no hostel choices submitted.`);
//         throw new Error(`Student ${studentId} has no hostel choices submitted.`);
//     }

//     console.log(`[ASSIGN_DEBUG] Student ${studentId} choices:`, choices);

//     // --- NEW OPTIMIZATION: Concurrently fetch available rooms for all choices ---
//     // Create an array of promises, one for each choice's availability check
//     const availabilityPromises = choices.map(async (hostelChoiceId) => {
//         try {
//             // Call the getAvailableRoomsInHostel function (which uses the get_available_rooms_with_occupancy RPC)
//             const rooms = await getAvailableRoomsInHostel(hostelChoiceId, student.gender);
//             console.log(`[ASSIGN_DEBUG] Fetched ${rooms.length} available rooms for choice ${hostelChoiceId}.`);
//             return { hostelChoiceId, rooms }; // Return the hostel ID and its available rooms
//         } catch (error) {
//             console.error(`[ASSIGN_DEBUG] ERROR_AVAIL_FETCH: Hostel ${hostelChoiceId} for student ${studentId}:`, error.message);
//             // If fetching availability fails for a choice, return an object indicating error
//             return { hostelChoiceId, rooms: [], error: error.message, status: 'error' };
//         }
//     });

//     // Wait for all these concurrent availability checks to complete
//     const availabilityResults = await Promise.allSettled(availabilityPromises);
//     console.log(`[ASSIGN_DEBUG] Student ${studentId}: All availability checks settled. Raw results:`, availabilityResults);


//     // 2. Iterate through the results in the original student preference order
//     // This loop ensures we attempt assignment based on the student's first choice first, then second, etc.
//     for (let i = 0; i < choices.length; i++) {
//         const hostelChoiceId = choices[i]; // The original choice ID
//         const result = availabilityResults[i]; // The corresponding result from the concurrent fetch

//         // Check if the availability check for this specific choice was successful and rooms were found
//         if (result.status === 'fulfilled' && result.value.rooms && result.value.rooms.length > 0) {
//             const roomToAttemptAssign = result.value.rooms[0]; // Take the first available room (RPC ensures it's best sorted)
//             console.log(`[ASSIGN_DEBUG] Student ${studentId}: Found available room ${roomToAttemptAssign.room_name} (ID: ${roomToAttemptAssign.id}) from choice ${hostelChoiceId}. Attempting atomic assignment.`);

//             try {
//                 // 3. Perform the atomic assignment using the Supabase RPC function.
//                 // This is the critical, transactional step in your DB.
//                 const { data: rpcResult, error: rpcError } = await supabase.rpc('assign_student_to_room_atomically', {
//                     p_student_id: studentId,
//                     p_room_id: roomToAttemptAssign.id,
//                     p_assignment_status: 'ACTIVE' // Use 'ACTIVE' or 'ASSIGNED_AUTO' as per your booking_status_enum
//                 });

//                 console.log(`[ASSIGN_DEBUG] Student ${studentId} RPC Call Results for room ${roomToAttemptAssign.id}:`);
//                 console.log(`[ASSIGN_DEBUG]   rpcError:`, rpcError);
//                 console.log(`[ASSIGN_DEBUG]   rpcResult:`, rpcResult);

//                 if (rpcError) {
//                     console.warn(`[ASSIGN_DEBUG] RPC_CALL_ERROR: Student ${studentId} to room ${roomToAttemptAssign.id}: ${rpcError.message}. Continuing to next choice.`);
//                     continue; // Continue to next choice if the RPC call itself failed (e.g., network, malformed RPC)
//                 }

//                 if (rpcResult && rpcResult.success) {
//                     // If the RPC returns `success: true`, the assignment was fully successful at the DB level.
//                     console.log(`[ASSIGN_DEBUG] SUCCESS: Student ${studentId} assigned to room ${rpcResult.assignedRoomName} (ID: ${rpcResult.assignedRoomId}). Booking ID: ${rpcResult.bookingId}`);
//                     // Return the assignment details. This will be caught by Promise.allSettled in batchAssignRoomsToStudents.
//                     return {
//                         studentId: studentId,
//                         assignedRoomId: rpcResult.assignedRoomId,
//                         assignedRoomName: rpcResult.assignedRoomName,
//                         bookingId: rpcResult.bookingId,
//                         message: rpcResult.message
//                         // Note: The 'status: success' will be added by batchAssignRoomsToStudents when it processes this return
//                     };
//                 } else if (rpcResult && !rpcResult.success) {
//                     // If the RPC returned `success: false`, it means a business rule was violated (e.g., room just became full).
//                     console.warn(`[ASSIGN_DEBUG] RPC_BUSINESS_FAIL: Student ${studentId} to room ${roomToAttemptAssign.id}: ${rpcResult.message}.`);
//                     if (rpcResult.message.includes('already assigned')) {
//                         // If the RPC explicitly says the student is already assigned, this is a final state for this student.
//                         console.log(`[ASSIGN_DEBUG] Student ${studentId} detected as already assigned by RPC. Throwing error to stop further choices.`);
//                         throw new Error(`Student ${studentId} is already assigned (detected during atomic assignment).`);
//                     }
//                     // For other business failures (like 'room full' due to race condition), try the next choice.
//                     console.log(`[ASSIGN_DEBUG] Continuing to next choice for student ${studentId}.`);
//                     continue;
//                 } else {
//                     // Unexpected RPC result format
//                     console.warn(`[ASSIGN_DEBUG] RPC_UNKNOWN_FAIL: Student ${studentId} to room ${roomToAttemptAssign.id}: RPC returned an unexpected result. Continuing.`);
//                     continue;
//                 }
//             } catch (rpcAssignmentError) {
//                 // Catch any unexpected errors from the assignment attempt (e.g., the 'already assigned' error thrown above)
//                 console.error(`[ASSIGN_DEBUG] CATCH_RPC_ASSIGN_ERROR: Student ${studentId} with choice ${hostelChoiceId}:`, rpcAssignmentError.message);
//                 throw rpcAssignmentError; // Re-throw critical errors to be caught by the outer batch function
//             }
//         } else if (result.status === 'rejected') {
//             // This means the availability promise itself was rejected (e.g., a network error during getAvailableRoomsInHostelRpc)
//             console.warn(`[ASSIGN_DEBUG] AVAIL_PROMISE_REJECTED: Hostel choice ${hostelChoiceId} for student ${studentId}: ${result.reason}. Skipping this choice.`);
//         } else { // result.status === 'fulfilled' but result.value.rooms.length === 0 or result.value.error
//             console.log(`[ASSIGN_DEBUG] Student ${studentId}: No available rooms found in hostel choice ${hostelChoiceId}. Trying next choice.`);
//         }
//     }

//     // If the loop completes without successfully assigning a room after trying all choices
//     console.log(`[ASSIGN_DEBUG] FINAL_FAIL: Could not assign a room for student ${studentId} after checking all choices.`);
//     // Throw an error here. This will be caught by the Promise.allSettled in batchAssignRoomsToStudents
//     // and correctly marked as a 'rejected' promise with this message.
//     throw new Error('No suitable room found after checking all choices.');
// };


export const assignRoomToStudentByChoices = async (studentId) => {
    console.log(`[ASSIGN_DEBUG] Starting assignment attempt for student: ${studentId}`);

    const student = await getStudentDetailsForAssignment(studentId);
    if (!student) {
        console.log(`[ASSIGN_DEBUG] Student ${studentId} not found.`);
        throw new Error(`Student with ID ${studentId} not found.`);
    }
    if (!student.gender) {
        console.log(`[ASSIGN_DEBUG] Student ${studentId} has no gender.`);
        throw new Error(`Student ${studentId} has no gender specified in their profile. Cannot proceed with room assignment.`);
    }
    if (student.assigned_room_id) {
        console.log(`[ASSIGN_DEBUG] Student ${studentId} is already assigned to room: ${student.assigned_room_id}.`);
        throw new Error(`Student ${studentId} is already assigned to a room.`);
    }

    const choices = [student.choice1_hostel_id, student.choice2_hostel_id, student.choice3_hostel_id].filter(id => id !== null);
    if (choices.length === 0) {
        console.log(`[ASSIGN_DEBUG] Student ${studentId} has no hostel choices submitted.`);
        throw new Error(`Student ${studentId} has no hostel choices submitted.`);
    }

    console.log(`[ASSIGN_DEBUG] Student ${studentId} choices:`, choices);

    const availabilityPromises = choices.map(async (hostelChoiceId) => {
        try {
            const rooms = await getAvailableRoomsInHostel(hostelChoiceId, student.gender);
            console.log(`[ASSIGN_DEBUG] Fetched ${rooms.length} available rooms for choice ${hostelChoiceId}.`);
            return { hostelChoiceId, rooms };
        } catch (error) {
            console.error(`[ASSIGN_DEBUG] ERROR_AVAIL_FETCH: Hostel ${hostelChoiceId} for student ${studentId}:`, error.message);
            return { hostelChoiceId, rooms: [], error: error.message, status: 'error' };
        }
    });

    const availabilityResults = await Promise.allSettled(availabilityPromises);
    console.log(`[ASSIGN_DEBUG] Student ${studentId}: All availability checks settled. Raw results:`, availabilityResults.map(r => ({ status: r.status, hostelId: r.value?.hostelChoiceId || 'N/A', roomsFound: r.value?.rooms?.length || 0, reason: r.reason })));


    for (let i = 0; i < choices.length; i++) {
        const hostelChoiceId = choices[i];
        const result = availabilityResults[i];

        if (result.status === 'fulfilled' && result.value.rooms && result.value.rooms.length > 0) {
            const roomToAttemptAssign = result.value.rooms[0];
            console.log(`[ASSIGN_DEBUG] Student ${studentId}: Found available room ${roomToAttemptAssign.room_name} (ID: ${roomToAttemptAssign.id}) from choice ${hostelChoiceId}. Attempting atomic assignment.`);

            try {
                const { data: rpcResult, error: rpcError } = await supabase.rpc('assign_student_to_room_atomically', {
                    p_student_id: studentId,
                    p_room_id: roomToAttemptAssign.id,
                    p_assignment_status: 'ACTIVE'
                });

                console.log(`[ASSIGN_DEBUG] Student ${studentId} RPC Call Results for room ${roomToAttemptAssign.id}:`);
                console.log(`[ASSIGN_DEBUG]   rpcError:`, rpcError);
                console.log(`[ASSIGN_DEBUG]   rpcResult:`, rpcResult);

                if (rpcError) {
                    console.warn(`[ASSIGN_DEBUG] RPC_CALL_ERROR: Student ${studentId} to room ${roomToAttemptAssign.id}: ${rpcError.message}. Continuing to next choice.`);
                    continue;
                }

                if (rpcResult && rpcResult.success) {
                    console.log(`[ASSIGN_DEBUG] SUCCESS: Student ${studentId} assigned to room ${rpcResult.assignedRoomName} (ID: ${rpcResult.assignedRoomId}). Booking ID: ${rpcResult.bookingId}`);
                    return { // This is the successful return point
                        studentId: studentId,
                        assignedRoomId: rpcResult.assignedRoomId,
                        assignedRoomName: rpcResult.assignedRoomName,
                        bookingId: rpcResult.bookingId,
                        message: rpcResult.message
                        // The 'status: success' is added by batchAssignRoomsToStudents when it processes this fulfilled promise
                    };
                } else if (rpcResult && !rpcResult.success) {
                    console.warn(`[ASSIGN_DEBUG] RPC_BUSINESS_FAIL: Student ${studentId} to room ${roomToAttemptAssign.id}: ${rpcResult.message}.`);
                    if (rpcResult.message.includes('already assigned')) {
                        console.log(`[ASSIGN_DEBUG] Student ${studentId} detected as already assigned by RPC. Throwing.`);
                        throw new Error(`Student ${studentId} is already assigned (detected during atomic assignment).`);
                    }
                    console.log(`[ASSIGN_DEBUG] Continuing to next choice for student ${studentId}.`);
                    continue;
                } else {
                    console.warn(`[ASSIGN_DEBUG] RPC_UNKNOWN_FAIL: Student ${studentId} to room ${roomToAttemptAssign.id}: RPC returned an unexpected result. Continuing.`);
                    continue;
                }
            } catch (rpcAssignmentError) {
                console.error(`[ASSIGN_DEBUG] CATCH_RPC_ASSIGN_ERROR: Student ${studentId} with choice ${hostelChoiceId}:`, rpcAssignmentError.message);
                throw rpcAssignmentError; // Re-throw critical errors
            }
        } else if (result.status === 'rejected') {
            console.warn(`[ASSIGN_DEBUG] AVAIL_PROMISE_REJECTED: Hostel choice ${hostelChoiceId} for student ${studentId}: ${result.reason}. Skipping this choice.`);
        } else { // status === 'fulfilled' but result.value.rooms.length === 0
            console.log(`[ASSIGN_DEBUG] Student ${studentId}: No available rooms found in hostel choice ${hostelChoiceId}. Trying next choice.`);
        }
    }

    console.log(`[ASSIGN_DEBUG] FINAL_FAIL: Could not assign a room for student ${studentId} after checking all choices.`);
    // *** CRITICAL CHANGE: Throw an error instead of returning null ***
    throw new Error('No suitable room found after checking all choices.');
};

// ... (The batchAssignRoomsToStudents function remains unchanged, as it handles the Promise.allSettled
//      and the fulfillment/rejection of assignRoomToStudentByChoices) ...

/**
 * Orchestrates the concurrent assignment of rooms for an array of students.
 * Processes students in parallel and collects all results.
 *
 * @param {Array<string>} studentIds An array of student UUIDs to process.
 * @returns {Promise<Array<object>>} An array of results for each student,
 * indicating success or failure.
 */

// export const batchAssignRoomsToStudents = async (studentIds) => {
//     console.log(`Starting concurrent batch assignment for ${studentIds.length} students.`);

//     // Create an array of Promises, one for each student's assignment attempt
//     const assignmentPromises = studentIds.map(async (studentId) => {
//         try {
//             const assignmentResult = await assignRoomToStudentByChoices(studentId);
//             return {
//                 studentId: studentId,
//                 status: 'fulfilled', // For Promise.allSettled, this is the status if the promise resolves
//                 value: assignmentResult // The successful assignment object
//             };
//         } catch (error) {
//             // For Promise.allSettled, if assignRoomToStudentByChoices throws, it's a 'rejected' promise.
//             return {
//                 studentId: studentId,
//                 status: 'rejected', // For Promise.allSettled
//                 reason: error.message || 'An unknown error occurred.' // The error message
//             };
//         }
//     });

//     // Wait for all promises to settle (either fulfilled or rejected)
//     const results = await Promise.allSettled(assignmentPromises);

//     // Process the results to create a clean summary
//     const formattedResults = results.map(result => {
//         if (result.status === 'fulfilled') {
//             // Check if the actual assignment within the promise was successful or returned null/error
//             if (result.value && result.value.status === 'success') {
//                 return {
//                     studentId: result.value.studentId,
//                     status: 'success',
//                     message: result.value.message,
//                     data: result.value // Contains assignedRoomId, assignedRoomName, etc.
//                 };
//             } else if (result.value && result.value.status === 'failed') {
//                 // This means assignRoomToStudentByChoices returned a 'failed' object, not threw an error
//                 return {
//                     studentId: result.value.studentId,
//                     status: 'failed',
//                     message: result.value.message
//                 };
//             } else {
//                 // This case handles where assignRoomToStudentByChoices returns null
//                 return {
//                     studentId: result.studentId, // Use studentId from original promise mapping
//                     status: 'failed',
//                     message: 'No room could be assigned after checking all choices.'
//                 };
//             }
//         } else { // result.status === 'rejected'
//             return {
//                 studentId: result.reason.includes('Student with ID') ? result.reason.match(/Student with ID ([\w-]+)/)[1] : null, // Try to extract ID if error message contains it
//                 status: 'error',
//                 message: result.reason
//             };
//         }
//     });

//     console.log("Concurrent batch assignment complete. Results:", formattedResults);
//     return formattedResults;
// };

export const batchAssignRoomsToStudents = async (studentIds) => {
    console.log(`Starting concurrent batch assignment for ${studentIds.length} students.`);

    // Create an array of Promises, one for each student's assignment attempt
    const assignmentPromises = studentIds.map(async (currentStudentId) => { // Use a distinct variable name for clarity
        try {
            const assignmentResult = await assignRoomToStudentByChoices(currentStudentId);
            return {
                studentId: currentStudentId, // <--- Ensure studentId is always here
                status: 'fulfilled',
                value: assignmentResult
            };
        } catch (error) {
            // When assignRoomToStudentByChoices throws, this catch block is hit.
            // IMPORTANT: Explicitly include currentStudentId here for rejected promises.
            return {
                studentId: currentStudentId, // <--- CRITICAL FIX: Include studentId for rejected cases
                status: 'rejected',
                reason: error.message || 'An unknown error occurred during assignment.'
            };
        }
    });

    // Wait for all promises to settle (either fulfilled or rejected)
    const results = await Promise.allSettled(assignmentPromises);

    // Process the results to create a clean summary
    const formattedResults = results.map(result => {
        // Access studentId directly from the object returned by the map callback
        const studentId = result.studentId; // Now available for both fulfilled and rejected cases

        if (result.status === 'fulfilled') {
            if (result.value && result.value.studentId) { // Check for successful assignment object structure
                return {
                    studentId: result.value.studentId, // This is the ID from the successful assignment result
                    status: 'success',
                    message: result.value.message,
                    data: result.value // Contains assignedRoomId, assignedRoomName, etc.
                };
            } else {
                // This else block handles cases where assignRoomToStudentByChoices fulfilled but returned something unexpected or null.
                // Given the current implementation of assignRoomToStudentByChoices, it should always throw or return a structured success.
                // This path might indicate an unexpected return from assignRoomToStudentByChoices.
                console.warn(`[BATCH_DEBUG] Unexpected fulfilled result structure for student ${studentId}:`, result.value);
                return {
                    studentId: studentId, // Use the studentId from the map scope
                    status: 'failed',
                    message: result.value?.message || 'Assignment process completed without success details.'
                };
            }
        } else { // result.status === 'rejected'
            return {
                studentId: studentId, // <--- Directly use the studentId that was passed from the map
                status: 'error',
                message: result.reason // The error message thrown by assignRoomToStudentByChoices
            };
        }
    });

    console.log("Concurrent batch assignment complete. Results:", formattedResults);
    return formattedResults;
};