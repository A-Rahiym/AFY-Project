import { createClient } from '@supabase/supabase-js';

// --- Supabase Configuration ---
// IMPORTANT: Replace with your actual Supabase project URL and Anon Key
const supabaseUrl = 'https://magdmkbnufgmbdbpffsv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZ2Rta2JudWZnbWJkYnBmZnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MjI5MTQsImV4cCI6MjA2Mjk5ODkxNH0.e2DTjFRAZav5xC6YaUpmfWV-whhn_a6bbv3qySSiigU';

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Dummy Data ---
// This structure mirrors your desired relational schema,
// updated with specific ABU Zaria hostel names and their gender allocations.
const dummyHostelData = [
  // --- Main Campus Hostels (10) ---
  {
    name: 'Amina Hall',
    gender: 'Female',
    blocks: [
      { name: 'Block A', rooms: [{ name: 'A101', max_capacity: 4 }, { name: 'A102', max_capacity: 4 }] },
      { name: 'Block B', rooms: [{ name: 'A201', max_capacity: 4 }, { name: 'A202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'Suleiman Hall',
    gender: 'Female', // Confirmed Female
    blocks: [
      { name: 'Annex 1', rooms: [{ name: 'S101', max_capacity: 5 }, { name: 'S102', max_capacity: 5 }] },
      { name: 'Annex 2', rooms: [{ name: 'S201', max_capacity: 4 }, { name: 'S202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'Alexander Hall',
    gender: 'Female',
    blocks: [
      { name: 'Main', rooms: [{ name: 'AL101', max_capacity: 4 }, { name: 'AL102', max_capacity: 4 }] },
      { name: 'Extension', rooms: [{ name: 'AL201', max_capacity: 3 }, { name: 'AL202', max_capacity: 3 }] }
    ]
  },
  {
    name: 'Ribadu Hall',
    gender: 'Female',
    blocks: [
      { name: 'North Wing', rooms: [{ name: 'R101', max_capacity: 4 }, { name: 'R102', max_capacity: 4 }] },
      { name: 'South Wing', rooms: [{ name: 'R201', max_capacity: 4 }, { name: 'R202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'Danfodio Hall',
    gender: 'Male', // Commonly Male
    blocks: [
      { name: 'Block 1', rooms: [{ name: 'D101', max_capacity: 6 }, { name: 'D102', max_capacity: 6 }] },
      { name: 'Block 2', rooms: [{ name: 'D201', max_capacity: 6 }, { name: 'D202', max_capacity: 6 }] }
    ]
  },
  {
    name: 'Dangote Hall',
    gender: 'Male', // Commonly Male
    blocks: [
      { name: 'A-Wing', rooms: [{ name: 'DG101', max_capacity: 5 }, { name: 'DG102', max_capacity: 5 }] },
      { name: 'B-Wing', rooms: [{ name: 'DG201', max_capacity: 5 }, { name: 'DG202', max_capacity: 5 }] }
    ]
  },
  {
    name: 'Akenzua Hall',
    gender: 'Male', // Assuming Male, often mixed or male in ABU context
    blocks: [
      { name: 'Ground', rooms: [{ name: 'AK101', max_capacity: 6 }, { name: 'AK102', max_capacity: 6 }] },
      { name: 'First Floor', rooms: [{ name: 'AK201', max_capacity: 6 }, { name: 'AK202', max_capacity: 6 }] }
    ]
  },
  {
    name: 'ICSA Hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'East', rooms: [{ name: 'IC101', max_capacity: 5 }, { name: 'IC102', max_capacity: 5 }] },
      { name: 'West', rooms: [{ name: 'IC201', max_capacity: 5 }, { name: 'IC202', max_capacity: 5 }] }
    ]
  },
  {
    name: 'Ramat Hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'Block X', rooms: [{ name: 'RM101', max_capacity: 6 }, { name: 'RM102', max_capacity: 6 }] },
      { name: 'Block Y', rooms: [{ name: 'RM201', max_capacity: 6 }, { name: 'RM202', max_capacity: 6 }] }
    ]
  },
  {
    name: 'Shehu Idris Hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'Section A', rooms: [{ name: 'SI101', max_capacity: 5 }, { name: 'SI102', max_capacity: 5 }] },
      { name: 'Section B', rooms: [{ name: 'SI201', max_capacity: 5 }, { name: 'SI202', max_capacity: 5 }] }
    ]
  },

  // --- Shika Campus Hostels (2) ---
  {
    name: 'Asma\'u Mustapha Hall',
    gender: 'Female', // For Medical and Nursing Students
    blocks: [
      { name: 'Clinical A', rooms: [{ name: 'SMA1', max_capacity: 3 }, { name: 'SMA2', max_capacity: 3 }] },
      { name: 'Clinical B', rooms: [{ name: 'SMB1', max_capacity: 3 }, { name: 'SMB2', max_capacity: 3 }] }
    ]
  },
  {
    name: 'Aliyu Mustapha Hall',
    gender: 'Male', // For Medical and Nursing Students
    blocks: [
      { name: 'Clinical C', rooms: [{ name: 'SMC1', max_capacity: 3 }, { name: 'SMC2', max_capacity: 3 }] },
      { name: 'Clinical D', rooms: [{ name: 'SMD1', max_capacity: 3 }, { name: 'SMD2', max_capacity: 3 }] }
    ]
  },

  // --- Kongo Campus Hostels (6) ---
  {
    name: 'Ali Akilu Hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'Kongo A', rooms: [{ name: 'KA101', max_capacity: 5 }, { name: 'KA102', max_capacity: 5 }] },
      { name: 'Kongo B', rooms: [{ name: 'KA201', max_capacity: 5 }, { name: 'KA202', max_capacity: 5 }] }
    ]
  },
  {
    name: 'Tafawa Balewa Hall',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'Kongo C', rooms: [{ name: 'KB101', max_capacity: 5 }, { name: 'KB102', max_capacity: 5 }] },
      { name: 'Kongo D', rooms: [{ name: 'KB201', max_capacity: 5 }, { name: 'KB202', max_capacity: 5 }] }
    ]
  },
  {
    name: 'Hostel 1 (Kongo)',
    gender: 'Female',
    blocks: [
      { name: 'Kongo E', rooms: [{ name: 'KH101', max_capacity: 4 }, { name: 'KH102', max_capacity: 4 }] },
      { name: 'Kongo F', rooms: [{ name: 'KH201', max_capacity: 4 }, { name: 'KH202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'Hostel 2 (Kongo)',
    gender: 'Female',
    blocks: [
      { name: 'Kongo G', rooms: [{ name: 'KH301', max_capacity: 4 }, { name: 'KH302', max_capacity: 4 }] },
      { name: 'Kongo H', rooms: [{ name: 'KH401', max_capacity: 4 }, { name: 'KH402', max_capacity: 4 }] }
    ]
  },
  {
    name: 'Hostel 3 (Kongo)',
    gender: 'Male', // Assuming Male
    blocks: [
      { name: 'Kongo I', rooms: [{ name: 'KH501', max_capacity: 5 }, { name: 'KH502', max_capacity: 5 }] },
      { name: 'Kongo J', rooms: [{ name: 'KH601', max_capacity: 5 }, { name: 'KH602', max_capacity: 5 }] }
    ]
  },
  {
    name: 'Bedde Hall',
    gender: 'Female',
    blocks: [
      { name: 'Kongo K', rooms: [{ name: 'BH101', max_capacity: 4 }, { name: 'BH102', max_capacity: 4 }] },
      { name: 'Kongo L', rooms: [{ name: 'BH201', max_capacity: 4 }, { name: 'BH202', max_capacity: 4 }] }
    ]
  },
  {
    name: 'Sardauna Hall',
    gender: 'Female',
    blocks: [
      { name: 'Kongo M', rooms: [{ name: 'SH101', max_capacity: 4 }, { name: 'SH102', max_capacity: 4 }] },
      { name: 'Kongo N', rooms: [{ name: 'SH201', max_capacity: 4 }, { name: 'SH202', max_capacity: 4 }] }
    ]
  },
  // --- Postgraduate Hall (often separate from general undergraduate hostels) ---
  {
    name: 'Postgraduate Hall',
    gender: 'Mixed', // Assuming mixed for postgraduate
    blocks: [
      { name: 'PG-North', rooms: [{ name: 'PGN101', max_capacity: 1 }, { name: 'PGN102', max_capacity: 1 }] },
      { name: 'PG-South', rooms: [{ name: 'PGS101', max_capacity: 2 }, { name: 'PGS102', max_capacity: 1 }] }
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
