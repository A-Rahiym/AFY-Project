// models/studentModel.js
import supabase from "../config/supabase.js";
import bcrypt from "bcryptjs";
import {ulid} from "ulid";


export const createStudent = async (studentData) => {
  const {
    name,
    reg_number,
    department,
    faculty,
    level,
    campus,
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
        campus,
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


export const checkStudentEligibilityModel = async (studentId) => {
  const { data, error } = await supabase
    .rpc('check_student_eligibility', { student_id: studentId });

  if (error) {
    throw new Error(`Supabase RPC failed: ${error.message}`);
  }

  return data[0] // return the first row since it's a `returns table`
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


// --- Function to generate a new FCFS ID using ULID ---
// This replaces the previous getNextFcfsId() which was prone to race conditions
// and was a simple integer.
function generateFcfsId() {
    return ulid(); // Generates a new ULID string
}

export const updateStudentPayment = async (studentId, paidStatus) => {
    if (typeof paidStatus !== 'boolean') {
        throw new Error('paidStatus must be a boolean (true or false).');
    }

    let updateData = { has_paid: paidStatus };

    // Conditionally assign FCFS ID if paidStatus is true
    if (paidStatus) {
        // Check if student already has an FCFS ID to prevent re-assignment
        // and unnecessary ULID generation/DB update if already present.
        const { data: currentStudent, error: fetchError } = await supabase
            .from('students')
            .select('fcfs_id')
            .eq('id', studentId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means 'No rows found' (expected if new student)
            console.error(`Error fetching student ${studentId} for FCFS check:`, fetchError.message);
            throw new Error(`Failed to retrieve student for FCFS check: ${fetchError.message}`);
        }

        if (currentStudent && currentStudent.fcfs_id !== null) {
            // Student already has an FCFS ID, log and proceed without generating a new one
            console.log(`Student ${studentId} already has FCFS ID: ${currentStudent.fcfs_id}. Not assigning a new one.`);
        } else {
            // Student does not have an FCFS ID, generate and assign a new one
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
        .select(); // Select the updated row to confirm the update

    if (error) {
        console.error(`Error updating payment status for student ${studentId}:`, error.message);
        throw new Error(`Failed to update student payment status: ${error.message}`);
    }

    // Check if any row was actually updated
    if (!data || data.length === 0) {
        throw new Error(`Student with ID ${studentId} not found or no changes were made.`);
    }

    console.log(`Student ${studentId} 'has_paid' status updated to: ${paidStatus}.`);
    // If a new FCFS ID was assigned, it's now in the database.
    // The `data` object returned will contain the updated `fcfs_id`.
    return data[0]; // Return the updated student record
};



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
