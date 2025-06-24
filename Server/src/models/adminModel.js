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

