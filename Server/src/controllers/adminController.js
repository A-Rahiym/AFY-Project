// src/controllers/adminController.js
import { assignRoomToStudentByChoices , batchAssignRoomsToStudents } from '../services/adminAssignmentService.js'; // Make sure this path is correct
import { fetchRequestedStudents } from '../models/adminModel.js';


/**
 * Controller for an administrator to assign a room to a student based on their choices.
 * Expects { studentId: string } in req.body.
 * This function orchestrates the call to assignRoomToStudentByChoices service.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const assignRoomToStudentController = async (req, res) => {
    const { studentId } = req.body;
    
    // --- Input Validation ---
    if (!studentId) {
        return res.status(400).json({ success: false, error: 'Student ID is required in the request body.' });
    }
    // --- Authentication and Authorization (Highly Recommended for Admin Endpoints) ---
    // You would typically have middleware here to ensure only authenticated
    // administrators can call this endpoint. Example:
    /*
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'Forbidden: Only administrators can assign rooms.' });
    }
    // Assume req.user is populated by your authentication middleware
    */
    try {
        // Call the service function to perform the assignment logic
        const assignmentResult = await assignRoomToStudentByChoices(studentId);
        if (assignmentResult) {
            // If assignmentResult is not null, a room was successfully assigned
            return res.status(200).json({
                success: true,
                message: assignmentResult.message || `Room assigned successfully to student ${studentId}.`,
                data: assignmentResult // Contains assignedRoomId, assignedRoomName, bookingId, etc.
            });
        } else {
            // If assignmentResult is null, no room could be assigned after trying all choices
            return res.status(404).json({
                success: false,
                error: `Could not find an available room for student ${studentId} based on their choices, or student is already assigned.`
            });
        }
    } catch (error) {
        console.error('Error in assignRoomToStudentController:', error.message);
        // --- Error Handling for specific scenarios ---
        if (error.message.includes('Student with ID') && error.message.includes('not found')) {
            return res.status(404).json({ success: false, error: error.message });
        }
        if (error.message.includes('already assigned')) {
            return res.status(409).json({ success: false, error: error.message });
        }
        if (error.message.includes('no hostel choices')) {
            return res.status(400).json({ success: false, error: error.message });
        }
        // Generic server error
        return res.status(500).json({ success: false, error: 'Failed to assign room due to a server error.' });
    }
};


export const assignRoomToStudentsBatchController = async (req, res) => {
    const { studentIds } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
        return res.status(400).json({ success: false, error: 'An array of student IDs is required in the request body.' });
    }

    try {
        const batchResults = await batchAssignRoomsToStudents(studentIds);

        const successfulAssignments = batchResults.filter(r => r.status === 'success');
        const failedAssignments = batchResults.filter(r => r.status === 'failed'); // Catch explicitly 'failed'
        const errorAssignments = batchResults.filter(r => r.status === 'error'); // Catch explicitly 'error'

        return res.status(200).json({
            success: true,
            message: `Batch assignment completed. ${successfulAssignments.length} successful, ${failedAssignments.length} failed, ${errorAssignments.length} errors.`,
            results: batchResults,
            summary: {
                totalProcessed: batchResults.length,
                successful: successfulAssignments.length,
                failed: failedAssignments.length,
                errors: errorAssignments.length,
                successfulStudents: successfulAssignments.map(r => r.studentId),
                failedStudents: failedAssignments.map(r => ({ id: r.studentId, message: r.message })),
                errorStudents: errorAssignments.map(r => ({ id: r.studentId, message: r.message }))
            }
        });

    } catch (error) {
        console.error('Error in assignRoomToStudentsBatchController (outer catch):', error.message);
        return res.status(500).json({ success: false, error: 'Failed to complete batch assignment due to a server error.' });
    }
};

export const getRequestedStudents = async (req, res) => {
    try {
        const { data: students, error } = await fetchRequestedStudents();

        if (error) {
            console.error('Error fetching requested students:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch requested students.',
                error: error.message
            });
        }

        res.status(200).json({ success: true, students });
    } catch (error) {
        console.error('Unhandled error in getRequestedStudents:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message
        });
    }
};