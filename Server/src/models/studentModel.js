// models/studentModel.js
import supabase from "../config/supabase.js";
import bcrypt from 'bcryptjs';



export const createStudent = async (studentData) => {
  const {
    name,
    reg_number,
    department,
    faculty,
    level,
    gender,
    password,
  } = studentData;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if reg_number exists
  const { data: existing, error: findError } = await supabase
    .from('students')
    .select('*')
    .eq('reg_number', reg_number);

  if (findError) throw new Error(findError.message);
  if (existing.length > 0) throw new Error('Registration number already exists');

  // Insert new student
  const { data, error } = await supabase
    .from('students')
    .insert([
      {
        name,
        reg_number,
        department,
        faculty,
        level,
        gender,
        password: hashedPassword,
        has_paid: false,    // default
        token: null         // no token yet
      }
    ])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};


export const getStudentByRegNo = async (reg_number) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("reg_number", reg_number)
    .single();

  if (error) throw error;
  return data;
};

export const updateStudentToken = async (reg_number, token) => {
  const { error } = await supabase
    .from('students')
    .update({ token: token })  // update the `token` column
    .eq('reg_number', reg_number);

  if (error) {
    throw new Error(error.message);
  }
};

export const markStudentAsPaid = async (reg_number) => {
  const { data, error } = await supabase
    .from('students')
    .update({ has_paid: true })
    .eq('reg_number', reg_number);

  if (error) throw new Error(error.message);
  return data;
};

export const selectAccommodation = async (reg_number, hostel, block, room) => {
  const { data, error } = await supabase
    .from('student_accommodations')
    .insert([{ reg_number, hostel, block, room }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

