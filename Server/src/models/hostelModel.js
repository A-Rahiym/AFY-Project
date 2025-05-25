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

export const createHostelBooking = async (roomId, studentId) => { // Changed parameter name to studentId
  const { data, error } = await supabase
    .from('hostel_booking')
    .insert([
      {
        room_id: roomId,
        student_id: studentId, // Changed column name to student_id
        status: 'PENDING' // Default status, can be updated later
      }
    ])
    .select(); // Return the inserted data

  if (error) {
    console.error('Error creating hostel booking:', error.message);
    throw new Error(error.message);
  }
  return data[0];
};


export const checkExistingBooking = async (studentId) => {
  const { data, error } = await supabase
    .from('hostel_booking')
    .select('id')
    .eq('student_id', studentId)
    .neq('status', 'CANCELLED') // Optional: ignore cancelled bookings
    .maybeSingle(); // Returns null if not found
  if (error) {
    console.error("Error checking existing booking:", error.message);
    throw new Error('Could not check existing booking.');
  }
  return data; // If data is null, no booking exists
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
