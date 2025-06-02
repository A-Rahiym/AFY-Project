import supabase from "../config/supabase.js";

export const getHostelDetailsModel = async (hostelName) => {
  const { data, error } = await supabase
    .from('hostel')
    .select(`
      id,
      name,
      gender,
      hostel_block (
        id,
        name,
        hostel_block_room (
          id,
          name,
          max_capacity
        )
      )
    `)
    .eq('name', hostelName) // Filter by hostel name
    .single(); // Expecting a single hostel record

  if (error) {
    console.error("Error fetching hostel details:", error.message);
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error('Hostel not found');
  }
  return data;
};

const assignRoomToStudent = async (studentId, roomId) => {
  const { data, error } = await supabase
    .from('students')
    .update({ assigned_room_id: roomId }) // <--- This line performs the update
    .eq('id', studentId)
    .select(); // Returns the updated row

  if (error) {
    console.error(`Error assigning room ${roomId} to student ${studentId}:`, error.message);
    throw new Error(`Failed to assign room to student: ${error.message}`);
  }
  return data[0]; // Return the updated student record
};


export const createHostelBooking = async (roomId, studentId) => {
  // 1. Pre-check: Does the student already have an assigned room?
  // We query the 'students' table to get their current assigned_room_id.
  const { data: student, error: studentCheckError } = await supabase
    .from('students')
    .select('assigned_room_id')
    .eq('id', studentId)
    .single(); // Expect a single student record

  if (studentCheckError) {
    console.error('Error checking student assigned room:', studentCheckError.message);
    throw new Error('Failed to check student booking status.');
  }

  if (student && student.assigned_room_id) {
    // If the student object exists and assigned_room_id is not null,
    // it means they already have an accommodation. Throw an error.
    throw new Error('Student already has an accommodation booked.');
  }

  // 2. Proceed with booking if no existing accommodation was found.
  // Insert the new booking record into the 'hostel_booking' table.
  const { data, error } = await supabase
    .from('hostel_booking')
    .insert([
      {
        room_id: roomId,
        student_id: studentId, // Link the booking to the student
        status: 'PENDING'    // Default status for a new booking
      }
    ])
    .select(); // Return the inserted data
  if (error) {
    console.error('Error creating hostel booking:', error.message);
    throw new Error(error.message);
  }
  const newBooking = data[0]; // Get the newly created booking record
  // 3. Post-booking: Assign the room to the student in the 'students' table.
  // This is the crucial step that updates the student's record to reflect their new room.
  try {
    await assignRoomToStudent(studentId, roomId); // Call the helper function
    console.log(`Room ${roomId} successfully assigned to student ${studentId}.`);
  } catch (assignError) {
    // Log any errors during the assignment step.
    // In a production application, you might consider more robust error handling here,
    // like rolling back the 'hostel_booking' insertion or setting up a retry mechanism,
    // to ensure data consistency if the room assignment fails after booking.
    console.error(`Warning: Could not update student's assigned_room_id after booking: ${assignError.message}`);
  }

  return newBooking; // Return the newly created booking record
};





export const checkExistingBooking = async (studentId) => {
  const { data: student, error } = await supabase
    .from('students')
    .select('assigned_room_id,has_paid')
    .eq('id', studentId)
    .single(); // Expect a single student record
  if (error) {
    console.error(`Error fetching student accommodation status for ${studentId}:`, error.message);
    throw new Error(`Failed to retrieve student accommodation status: ${error.message}`);
  }
  // Determine if the student is booked based on whether assigned_room_id is not null
  const isBooked = student && student.assigned_room_id !== null;
  const hasPaid = student ? student.has_paid : false;
  const assignedRoomId = student ? student.assigned_room_id : null;
  return { isBooked, assignedRoomId  , hasPaid};
};



export const isRoomFull = async (roomId) => {
  // Count current bookings
  const { count, error: countError } = await supabase
    .from('hostel_booking')
    .select('*', { count: 'exact', head: true })
    .eq('room_id', roomId)
    .neq('status', 'CANCELLED');

  if (countError) {
    console.error('Error counting bookings:', countError.message);
    throw new Error('Could not verify room capacity.');
  }

  // Get max capacity
  const { data: roomData, error: roomError } = await supabase
    .from('hostel_block_room')
    .select('max_capacity')
    .eq('id', roomId)
    .maybeSingle();

  if (roomError || !roomData) {
    console.error('Error fetching room capacity:', roomError?.message);
    throw new Error('Room not found.');
  }

  return count >= roomData.max_capacity;
};


export const getStudentBooking = async (studentId) => {
  const { data, error } = await supabase
    .from('hostel_booking')
    .select('id, status, room_id, created_at') // Adjust fields as needed
    .eq('student_id', studentId)
    .neq('status', 'CANCELLED') // Only show active bookings
    .maybeSingle();

  if (error) {
    console.error('Error fetching booking status:', error.message);
    throw new Error('Failed to retrieve booking.');
  }

  return data; // could be null if not found
};


export const getAllHostels = async (gender, campus) => {
    // Since parameters are always provided, we can directly apply the filters.
    const { data, error } = await supabase
        .from('hostel')
        .select('id, name, gender, campus') // Select relevant columns
        .eq('gender', gender)               // Filter directly by required gender
        .eq('campus', campus)               // Filter directly by required campus
    if (error) {
        console.error("Error fetching all hostels:", error.message);
        throw new Error(`Failed to retrieve all hostels: ${error.message}`);
    }
    return data || [];
};



export const getAvailableRoomsInHostel = async (hostelId) => {
    try {
        const { data, error } = await supabase
            .from('hostel_block_room')
            .select(`
                id,
                name,            
                max_capacity,
                hostel_block_id,
                hostel_block!inner( 
                    id,
                    name,         
                    hostel!inner( 
                        id,
                        name,    
                        gender    
                    )
                )
            `)
            .eq('hostel_block.hostel.id', hostelId)
            .order('name', { ascending: true }); // Secondary sort by room name/number

        if (error) {
            console.error(`Error fetching available rooms for hostel ${hostelId} (gender ${studentGender}):`, error.message);
            throw new Error(`Failed to retrieve available rooms: ${error.message}`);
        }

        // Map the data to a flatter structure for easier consumption in the frontend
        // This removes the nested 'hostel_block' and 'hostel' objects,
        // but keeps relevant IDs/names if you need them in the final list.
        return data.map(row => ({
            id: row.id,
            room_name: row.name, // The name of the room itself (e.g., "101")
            capacity: row.max_capacity,
            block_id: row.hostel_block.id,
            block_name: row.hostel_block.name,
            hostel_id: row.hostel_block.hostel.id, // This will match your input hostelId
            hostel_name: row.hostel_block.hostel.name,
            hostel_gender: row.hostel_block.hostel.gender
        }));

    } catch (error) {
        // Re-throw the error so the calling controller can catch and respond
        throw error;
    }
};