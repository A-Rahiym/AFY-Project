import { createClient } from '@supabase/supabase-js';

// --- Supabase Configuration ---
// IMPORTANT: Replace with your actual Supabase project URL and Anon Key
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Dummy Data ---
// This structure mirrors your desired relational schema,
// updated with specific ABU Zaria hostel names and their gender allocations.
// All 'name' fields are now lowercase with underscores instead of spaces.
const dummyHostelData = [
  // --- Main Campus Hostels (10) ---
  {
    name: 'amina_hall',
    gender: 'Female',
    blocks: [
      { name: 'block_a', rooms: [{ name: 'a101', max_capacity: 4 }, { name: 'a102', max_capacity: 4 }] },
      { name: 'block_b', rooms: [{ name: 'a201', max_capacity: 4 }, { name: 'a202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'suleiman_hall',
    gender: 'Female', // Confirmed Female
    blocks: [
      { name: 'annex_1', rooms: [{ name: 's101', max_capacity: 5 }, { name: 's102', max_capacity: 5 }] },
      { name: 'annex_2', rooms: [{ name: 's201', max_capacity: 4 }, { name: 's202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'alexander_hall',
    gender: 'Female',
    blocks: [
      { name: 'main', rooms: [{ name: 'al101', max_capacity: 4 }, { name: 'al102', max_capacity: 4 }] },
      { name: 'extension', rooms: [{ name: 'al201', max_capacity: 3 }, { name: 'al202', max_capacity: 3 }] }
    ]
  },
  {
    name: 'ribadu_hall',
    gender: 'Female',
    blocks: [
      { name: 'north_wing', rooms: [{ name: 'r101', max_capacity: 4 }, { name: 'r102', max_capacity: 4 }] },
      { name: 'south_wing', rooms: [{ name: 'r201', max_capacity: 4 }, { name: 'r202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'danfodio_hall',
    gender: 'Male', // Commonly Male
    blocks: [
      { name: 'block_1', rooms: [{ name: 'd101', max_capacity: 6 }, { name: 'd102', max_capacity: 6 }] },
      { name: 'block_2', rooms: [{ name: 'd201', max_capacity: 6 }, { name: 'd202', max_capacity: 6 }] }
    ]
  },
  {
    name: 'dangote_hall',
    gender: 'Male', // Commonly Male
    blocks: [
      { name: 'a_wing', rooms: [{ name: 'dg101', max_capacity: 5 }, { name: 'dg102', max_capacity: 5 }] },
      { name: 'b_wing', rooms: [{ name: 'dg201', max_capacity: 5 }, { name: 'dg202', max_capacity: 5 }] }
    ]
  },
  {
    name: 'akenzua_hall',
    gender: 'Male', // Assuming Male, often mixed or male in ABU context
    blocks: [
      { name: 'ground', rooms: [{ name: 'ak101', max_capacity: 6 }, { name: 'ak102', max_capacity: 6 }] },
      { name: 'first_floor', rooms: [{ name: 'ak201', max_capacity: 6 }, { name: 'ak202', max_capacity: 6 }] }
    ]
  },
  {
    name: 'icsa_hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'east', rooms: [{ name: 'ic101', max_capacity: 5 }, { name: 'ic102', max_capacity: 5 }] },
      { name: 'west', rooms: [{ name: 'ic201', max_capacity: 5 }, { name: 'ic202', max_capacity: 5 }] }
    ]
  },
  {
    name: 'ramat_hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'block_x', rooms: [{ name: 'rm101', max_capacity: 6 }, { name: 'rm102', max_capacity: 6 }] },
      { name: 'block_y', rooms: [{ name: 'rm201', max_capacity: 6 }, { name: 'rm202', max_capacity: 6 }] }
    ]
  },
  {
    name: 'shehu_idris_hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'section_a', rooms: [{ name: 'si101', max_capacity: 5 }, { name: 'si102', max_capacity: 5 }] },
      { name: 'section_b', rooms: [{ name: 'si201', max_capacity: 5 }, { name: 'si202', max_capacity: 5 }] }
    ]
  },

  // --- Shika Campus Hostels (2) ---
  {
    name: 'asma_u_mustapha_hall',
    gender: 'Female', // For Medical and Nursing Students
    blocks: [
      { name: 'clinical_a', rooms: [{ name: 'sma1', max_capacity: 3 }, { name: 'sma2', max_capacity: 3 }] },
      { name: 'clinical_b', rooms: [{ name: 'smb1', max_capacity: 3 }, { name: 'smb2', max_capacity: 3 }] }
    ]
  },
  {
    name: 'aliyu_mustapha_hall',
    gender: 'Male', // For Medical and Nursing Students
    blocks: [
      { name: 'clinical_c', rooms: [{ name: 'smc1', max_capacity: 3 }, { name: 'smc2', max_capacity: 3 }] },
      { name: 'clinical_d', rooms: [{ name: 'smd1', max_capacity: 3 }, { name: 'smd2', max_capacity: 3 }] }
    ]
  },

  // --- Kongo Campus Hostels (6) ---
  {
    name: 'ali_akilu_hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'kongo_a', rooms: [{ name: 'ka101', max_capacity: 5 }, { name: 'ka102', max_capacity: 5 }] },
      { name: 'kongo_b', rooms: [{ name: 'ka201', max_capacity: 5 }, { name: 'ka202', max_capacity: 5 }] }
    ]
  },
  {
    name: 'tafawa_balewa_hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'kongo_c', rooms: [{ name: 'kb101', max_capacity: 5 }, { name: 'kb102', max_capacity: 5 }] },
      { name: 'kongo_d', rooms: [{ name: 'kb201', max_capacity: 5 }, { name: 'kb202', max_capacity: 5 }] }
    ]
  },
  {
    name: 'hostel_1_kongo',
    gender: 'Female',
    blocks: [
      { name: 'kongo_e', rooms: [{ name: 'kh101', max_capacity: 4 }, { name: 'kh102', max_capacity: 4 }] },
      { name: 'kongo_f', rooms: [{ name: 'kh201', max_capacity: 4 }, { name: 'kh202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'hostel_2_kongo',
    gender: 'Female',
    blocks: [
      { name: 'kongo_g', rooms: [{ name: 'kh301', max_capacity: 4 }, { name: 'kh302', max_capacity: 4 }] },
      { name: 'kongo_h', rooms: [{ name: 'kh401', max_capacity: 4 }, { name: 'kh402', max_capacity: 4 }] }
    ]
  },
  {
    name: 'hostel_3_kongo',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'kongo_i', rooms: [{ name: 'kh501', max_capacity: 5 }, { name: 'kh502', max_capacity: 5 }] },
      { name: 'kongo_j', rooms: [{ name: 'kh601', max_capacity: 5 }, { name: 'kh602', max_capacity: 5 }] }
    ]
  },
  {
    name: 'bedde_hall',
    gender: 'Female',
    blocks: [
      { name: 'kongo_k', rooms: [{ name: 'bh101', max_capacity: 4 }, { name: 'bh102', max_capacity: 4 }] },
      { name: 'kongo_l', rooms: [{ name: 'bh201', max_capacity: 4 }, { name: 'bh202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'sardauna_hall',
    gender: 'Female',
    blocks: [
      { name: 'kongo_m', rooms: [{ name: 'sh101', max_capacity: 4 }, { name: 'sh102', max_capacity: 4 }] },
      { name: 'kongo_n', rooms: [{ name: 'sh201', max_capacity: 4 }, { name: 'sh202', max_capacity: 4 }] }
    ]
  },
  // --- Postgraduate Hall (often separate from general undergraduate hostels) ---
  {
    name: 'postgraduate_hall',
    gender: 'Mixed', // Assuming mixed for postgraduate
    blocks: [
      { name: 'pg_north', rooms: [{ name: 'pgn101', max_capacity: 1 }, { name: 'pgn102', max_capacity: 1 }] },
      { name: 'pg_south', rooms: [{ name: 'pgs101', max_capacity: 2 }, { name: 'pgs102', max_capacity: 1 }] }
    ]
  }
];

// --- Population Function ---
async function populateHostelData() {
  console.log('Starting data population...');

  for (const hostelData of dummyHostelData) {
    // 1. Insert Hostel
    console.log(`Inserting hostel: ${hostelData.name} (${hostelData.gender})...`);
    const { data: insertedHostel, error: hostelError } = await supabase
      .from('hostel') // Table name is 'hostel'
      .insert({
        name: hostelData.name,
        gender: hostelData.gender
      })
      .select(); // Select the inserted row to get its ID

    if (hostelError) {
      console.error(`Error inserting hostel ${hostelData.name}:`, hostelError.message);
      continue; // Skip to the next hostel if insertion fails
    }
    const hostelId = insertedHostel[0].id;
    console.log(`Hostel '${hostelData.name}' inserted with ID: ${hostelId}`);

    // 2. Insert Blocks for this Hostel
    for (const blockData of hostelData.blocks) {
      console.log(`  Inserting block: ${blockData.name} for ${hostelData.name}...`);
      const { data: insertedBlock, error: blockError } = await supabase
        .from('hostel_block') // Table name is 'hostel_block'
        .insert({
          hostel_id: hostelId, // Link to the parent hostel
          name: blockData.name
        })
        .select(); // Select the inserted row to get its ID

      if (blockError) {
        console.error(`  Error inserting block ${blockData.name}:`, blockError.message);
        continue; // Skip to the next block if insertion fails
      }
      const blockId = insertedBlock[0].id;
      console.log(`  Block '${blockData.name}' inserted with ID: ${blockId}`);

      // 3. Insert Rooms for this Block
      const roomsToInsert = blockData.rooms.map(room => ({
        hostel_block_id: blockId, // Link to the parent block
        name: room.name,
        max_capacity: room.max_capacity
      }));

      console.log(`    Inserting ${roomsToInsert.length} rooms for block ${blockData.name}...`);
      const { data: insertedRooms, error: roomsError } = await supabase
        .from('hostel_block_room') // Table name is 'hostel_block_room'
        .insert(roomsToInsert)
        .select();

      if (roomsError) {
        console.error(`    Error inserting rooms for block ${blockData.name}:`, roomsError.message);
      } else {
        console.log(`    ${insertedRooms.length} rooms inserted for block ${blockData.name}.`);
      }
    }
  }
  console.log('Data population complete!');
}

// --- Run the population script ---
populateHostelData();
