// models/studentModel.js
import supabase from "../config/supabase.js";
/**
 * Fetch students who have requested a hostel (choice1 is not null and not assigned)
 * @returns {Promise<{ data: object[], error: any }>}
 */
export const fetchRequestedStudents = async () => {
    return await supabase
        .from('students')
        .select('id, name, gender, choice1_hostel_id, choice2_hostel_id, choice3_hostel_id, assigned_room_id')
        .not('choice1_hostel_id', 'is', null)
        .is('assigned_room_id', null);
};


export const findAdminByEmail = async (email) => {
    try {
        // Query the 'admin_users' table
        const { data, error } = await supabase
            .from('admin_users')
            .select('id, email, password_hash') // Select password_hash for login comparison
            .eq('email', email)
            .single(); // Expecting at most one user per email

        if (error) {
            // If error is 'PGRST116', it means no rows were found, which is not an actual error for this function.
            // Any other error code indicates a database issue.
            if (error.code === 'PGRST116') {
                return null; // Admin user not found
            }
            console.error('Error finding admin user by email:', error.message);
            throw new Error(`Database error: ${error.message}`);
        }
        return data; // Returns the admin user object or null if not found
    } catch (error) {
        // Re-throw any errors for the calling controller/service to handle
        throw error;
    }
};


export const createAdminUser = async (adminData) => {
    try {
        const { data, error } = await supabase
            .from('admin_users')
            .insert([adminData])
            .select('id, email')
            .single();

        if (error) {
            console.error('Error creating admin user:', error.message);
            throw new Error(`Database error: ${error.message}`);
        }
        return data;
    } catch (error) {
        throw error;
    }
};

