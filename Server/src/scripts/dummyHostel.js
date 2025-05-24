// import supabase from "../config/supabase.js";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://magdmkbnufgmbdbpffsv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZ2Rta2JudWZnbWJkYnBmZnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MjI5MTQsImV4cCI6MjA2Mjk5ODkxNH0.e2DTjFRAZav5xC6YaUpmfWV-whhn_a6bbv3qySSiigU';

const supabase = createClient(supabaseUrl, supabaseKey);
const dummyData = [
  {
    name: 'Amina Hall',
    gender: 'Female',
    category: 'Undergraduate',
    blocks: [
      {
        block_name: 'Block A',
        rooms: [
          { room_number: 'A101', capacity: 4, occupancy: 3, floor_number: 1, status: 'available' },
          { room_number: 'A102', capacity: 4, occupancy: 4, floor_number: 1, status: 'full' },
          { room_number: 'A201', capacity: 2, occupancy: 1, floor_number: 2, status: 'available' },
          { room_number: 'A202', capacity: 2, occupancy: 2, floor_number: 2, status: 'full' }
        ]
      },
      {
        block_name: 'Block B',
        rooms: [
          { room_number: 'B101', capacity: 4, occupancy: 2, floor_number: 1, status: 'available' },
          { room_number: 'B201', capacity: 3, occupancy: 3, floor_number: 2, status: 'full' }
        ]
      }
    ]
  },
  {
    name: 'Danfodio Hall',
    gender: 'Male',
    category: 'Undergraduate',
    blocks: [
      {
        block_name: 'Main Wing',
        rooms: [
          { room_number: 'MW101', capacity: 6, occupancy: 5, floor_number: 1, status: 'available' },
          { room_number: 'MW102', capacity: 6, occupancy: 6, floor_number: 1, status: 'full' },
          { room_number: 'MW201', capacity: 4, occupancy: 4, floor_number: 2, status: 'full' },
          { room_number: 'MW202', capacity: 4, occupancy: 2, floor_number: 2, status: 'available' }
        ]
      }
    ]
  },
  {
    name: 'Postgraduate Hall',
    gender: 'Mixed',
    category: 'Postgraduate',
    blocks: [
      {
        block_name: 'PG-North',
        rooms: [
          { room_number: 'PGN101', capacity: 1, occupancy: 1, floor_number: 1, status: 'full' },
          { room_number: 'PGN102', capacity: 1, occupancy: 0, floor_number: 1, status: 'available' }
        ]
      }
    ]
  }
];

// --- Population Function ---
async function populateHostelData() {
  console.log('Starting data population...');

  for (const hostelData of dummyData) {
    // 1. Insert Hostel
    console.log(`Inserting hostel: ${hostelData.name}...`);
    const { data: insertedHostel, error: hostelError } = await supabase
      .from('hostels')
      .insert({
        name: hostelData.name,
        gender: hostelData.gender,
        category: hostelData.category
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
      console.log(`  Inserting block: ${blockData.block_name} for ${hostelData.name}...`);
      const { data: insertedBlock, error: blockError } = await supabase
        .from('hostel_blocks')
        .insert({
          hostel_id: hostelId, // Link to the parent hostel
          block_name: blockData.block_name
        })
        .select(); // Select the inserted row to get its ID

      if (blockError) {
        console.error(`  Error inserting block ${blockData.block_name}:`, blockError.message);
        continue; // Skip to the next block if insertion fails
      }
      const blockId = insertedBlock[0].id;
      console.log(`  Block '${blockData.block_name}' inserted with ID: ${blockId}`);

      // 3. Insert Rooms for this Block
      const roomsToInsert = blockData.rooms.map(room => ({
        block_id: blockId, // Link to the parent block
        room_number: room.room_number,
        capacity: room.capacity,
        occupancy: room.occupancy,
        floor_number: room.floor_number,
        status: room.status
      }));

      console.log(`    Inserting ${roomsToInsert.length} rooms for block ${blockData.block_name}...`);
      const { data: insertedRooms, error: roomsError } = await supabase
        .from('rooms')
        .insert(roomsToInsert)
        .select();

      if (roomsError) {
        console.error(`    Error inserting rooms for block ${blockData.block_name}:`, roomsError.message);
      } else {
        console.log(`    ${insertedRooms.length} rooms inserted for block ${blockData.block_name}.`);
      }
    }
  }
  console.log('Data population complete!');
}

// --- Run the population script ---
populateHostelData();