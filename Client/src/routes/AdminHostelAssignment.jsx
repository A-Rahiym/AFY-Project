// src/components/AdminHostelAssignment.js
import React, { useState, useEffect, useCallback } from 'react';
// Import the new admin API functions
import { getRequestedStudents, assignRoomsToSelectedStudents } from '../api/adminApi';

const AdminHostelAssignment = () => {
    const [requestedStudents, setRequestedStudents] = useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [assignmentResults, setAssignmentResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // General component error
    const [message, setMessage] = useState(''); // Status message for the user

    // --- Fetch Requested Students ---
    const fetchRequestedStudentsList = useCallback(async () => {
        setLoading(true);
        setError(null); // Clear any previous errors
        setMessage('Loading students...');
        try {
            // Use the Axios API function
            const students = await getRequestedStudents();
            setRequestedStudents(students);
            setSelectedStudentIds([]); // Clear selections when new list is fetched
            setMessage(`Found ${students.length} students awaiting assignment.`);
        } catch (err) {
            console.error('Error fetching students:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Could not fetch requested students.';
            setError(errorMessage);
            setMessage(`❌ ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies, as it fetches data independent of props/state changes

    // Effect to initially load students when component mounts
    useEffect(() => {
        fetchRequestedStudentsList();
    }, [fetchRequestedStudentsList]); // Depend on the memoized fetch function

    // --- Handle Student Selection ---
    const handleCheckboxChange = (studentId) => {
        setSelectedStudentIds((prevSelected) =>
            prevSelected.includes(studentId)
                ? prevSelected.filter((id) => id !== studentId)
                : [...prevSelected, studentId]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudentIds(requestedStudents.map(student => student.id));
        } else {
            setSelectedStudentIds([]);
        }
    };

    // --- Handle Batch Assignment ---
    const handleAssignRooms = async () => {
        if (selectedStudentIds.length === 0) {
            setMessage('❌ Please select at least one student to assign rooms.');
            return;
        }

        setLoading(true);
        setError(null);
        setAssignmentResults(null); // Clear previous results
        setMessage('Assigning rooms. This may take a moment...');

        try {
            // Use the Axios API function for assignment
            const data = await assignRoomsToSelectedStudents(selectedStudentIds);
            setAssignmentResults(data.summary); // Assuming backend returns { success: true, summary: ..., results: ...}
            setMessage(`✅ Assignment completed: ${data.summary.successful} successful, ${data.summary.failed} failed, ${data.summary.errors} errors.`);
            // Re-fetch students to update their assigned status and remove them from the list
            fetchRequestedStudentsList();
        } catch (err) {
            console.error('Error during assignment:', err);
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred during batch assignment.';
            setError(errorMessage);
            setMessage(`❌ ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    // --- Render status message helper ---
    const renderStatusMessage = () => {
        if (!message) return null;
        const isSuccess = message.startsWith('✅');
        const isError = message.startsWith('❌');
        let bgColor = 'bg-blue-100';
        let textColor = 'text-blue-800';
        if (isSuccess) { bgColor = 'bg-green-100'; textColor = 'text-green-800'; }
        else if (isError) { bgColor = 'bg-red-100'; textColor = 'text-red-800'; }
        return (
            <div style={{ marginTop: '15px', padding: '10px', borderRadius: '5px' }} className={`${bgColor} ${textColor}`}>
                {message}
            </div>
        );
    };


    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Admin Hostel Assignment</h1>
            {renderStatusMessage()}

            <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
                <h2 style={{ color: '#34495e', marginBottom: '15px' }}>Students Awaiting Assignment ({requestedStudents.length})</h2>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <button
                        onClick={handleAssignRooms}
                        disabled={selectedStudentIds.length === 0 || loading}
                        style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Assign Rooms to Selected ({selectedStudentIds.length})
                    </button>
                    <button
                        onClick={fetchRequestedStudentsList}
                        disabled={loading}
                        style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Refresh List
                    </button>
                </div>

                {loading && !message.startsWith('Loading students') && <p>Processing assignment...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}


                {requestedStudents.length === 0 && !loading && !error ? (
                    <p>No students currently awaiting hostel assignment.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: '#f2f2f2' }}>
                                <th style={tableHeaderStyle}>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedStudentIds.length === requestedStudents.length && requestedStudents.length > 0}
                                        disabled={requestedStudents.length === 0 || loading}
                                    />
                                </th>
                                <th style={tableHeaderStyle}>Name</th>
                                <th style={tableHeaderStyle}>Gender</th>
                                <th style={tableHeaderStyle}>Choices</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestedStudents.map((student) => (
                                <tr key={student.id}>
                                    <td style={tableCellStyle}>
                                        <input
                                            type="checkbox"
                                            checked={selectedStudentIds.includes(student.id)}
                                            onChange={() => handleCheckboxChange(student.id)}
                                            disabled={loading}
                                        />
                                    </td>
                                    <td style={tableCellStyle}>{student.name || 'N/A'}</td>
                                    <td style={tableCellStyle}>{student.email || 'N/A'}</td>
                                    <td style={tableCellStyle}>{student.gender || 'N/A'}</td>
                                    <td style={tableCellStyle}>
                                        {[student.choice1_hostel_id, student.choice2_hostel_id, student.choice3_hostel_id]
                                            .filter(Boolean) // Remove null/undefined
                                            .map(choice => choice.substring(0, 8) + '...') // Show short UUID
                                            .join(', ') || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* --- Assignment Results Display --- */}
            {assignmentResults && (
                <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px', background: '#e9ecef', padding: '15px', borderRadius: '8px' }}>
                    <h2 style={{ color: '#34495e', marginBottom: '15px' }}>Assignment Summary</h2>
                    <p>Total Processed: <strong>{assignmentResults.totalProcessed}</strong></p>
                    <p style={{ color: 'green' }}>Successful: <strong>{assignmentResults.successful}</strong></p>
                    <p style={{ color: assignmentResults.failed > 0 ? 'orange' : 'inherit' }}>Failed: <strong>{assignmentResults.failed}</strong></p>
                    <p style={{ color: assignmentResults.errors > 0 ? 'red' : 'inherit' }}>Errors: <strong>{assignmentResults.errors}</strong></p>

                    {assignmentResults.successfulStudents.length > 0 && (
                        <div style={{ marginTop: '15px' }}>
                            <h3 style={{ color: '#28a745' }}>Successfully Assigned Students:</h3>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                                {assignmentResults.successfulStudents.map((s, index) => (
                                    <li key={index}>{s.studentId?.substring(0, 8)}... assigned to {s.assignedRoomName}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {(assignmentResults.failedStudents.length > 0 || assignmentResults.errorStudents.length > 0) && (
                        <div style={{ marginTop: '15px' }}>
                            <h3 style={{ color: 'red' }}>Failed/Errored Assignments:</h3>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                                {assignmentResults.failedStudents.map((f, index) => (
                                    <li key={index} style={{ color: 'orange' }}>{f.studentId ? `${f.studentId.substring(0, 8)}...:` : ''} {f.message}</li>
                                ))}
                                {assignmentResults.errorStudents.map((e, index) => (
                                    <li key={index} style={{ color: 'red' }}>{e.studentId ? `${e.studentId.substring(0, 8)}...:` : ''} {e.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Basic inline styles for the table - Consider moving to CSS module or Tailwind classes
const tableHeaderStyle = {
    padding: '12px',
    borderBottom: '2px solid #ccc',
    textAlign: 'left',
    background: '#e0e0e0',
};

const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
};

export default AdminHostelAssignment;