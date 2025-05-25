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