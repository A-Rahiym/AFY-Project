// models/studentModel.js
import supabase from "../config/supabase.js";
import bcrypt from "bcryptjs";

export const createStudent = async (studentData) => {
  const {
    name,
    reg_number,
    department,
    faculty,
    level,
    gender,
    password,
    student_type,
    is_official,
    is_disabled,
  } = studentData;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if reg_number exists
  const { data: existing, error: findError } = await supabase
    .from("students")
    .select("*")
    .eq("reg_number", reg_number);

  if (findError) throw new Error(findError.message);
  if (existing.length > 0)
    throw new Error("Registration number already exists");

  // Insert new student
  const { data, error } = await supabase
    .from("students")
    .insert([
      {
        name,
        reg_number,
        department,
        faculty,
        level,
        gender,
        password: hashedPassword,
        has_paid: false, // default
        token: null, // no token yet
        assigned_room_id: null,
        student_type: student_type,
        is_official: is_official,
        is_disabled: is_disabled,
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const getStudentById = async (id) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new Error("Unauthorized: Invalid ID");
  }

  return data;
};

export const getStudentByRegNo = async (reg_number) => {
  try {
    const { data, error } = await supabase
      .from("students") // Table name in Supabase
      .select("*")
      .eq("reg_number", reg_number)
      .single(); // Fetch a single record
    if (error || !data) {
      throw new Error("Student not found");
    }
    return data;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching student data"
    );
  }
};

export const updateStudentToken = async (reg_number, token) => {
  const { error } = await supabase
    .from("students")
    .update({ token: token }) // update the `token` column
    .eq("reg_number", reg_number);

  if (error) {
    throw new Error(error.message);
  }
};

export const markStudentAsPaid = async (reg_number) => {
  const { data, error } = await supabase
    .from("students")
    .update({ has_paid: true })
    .eq("reg_number", reg_number);

  if (error) throw new Error(error.message);
  return data;
};



export const selectAccommodation = async (reg_number, hostel, block, room) => {
  const { data, error } = await supabase
    .from("student_accommodations")
    .insert([{ reg_number, hostel, block, room }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const updateStudentPayment = async (studentId, paidStatus) => {
  if (typeof paidStatus !== 'boolean') {
    throw new Error('paidStatus must be a boolean (true or false).');
  }
  const { data, error } = await supabase
    .from('students')
    .update({ has_paid: paidStatus })
    .eq('id', studentId)
    .select(); // Select the updated row to confirm the update

  if (error) {
    console.error(`Error updating payment status for student ${studentId}:`, error.message);
    throw new Error(`Failed to update student payment status: ${error.message}`);
  }

  // Check if any row was actually updated (meaning the student ID existed)
  if (!data || data.length === 0) {
    throw new Error(`Student with ID ${studentId} not found or no changes were made.`);
  }

  console.log(`Student ${studentId} 'has_paid' status updated to: ${paidStatus}`);
  return true; // Indicate success
};
