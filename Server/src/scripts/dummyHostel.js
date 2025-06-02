// import supabase from "../config/supabase.js";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://magdmkbnufgmbdbpffsv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZ2Rta2JudWZnbWJkYnBmZnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MjI5MTQsImV4cCI6MjA2Mjk5ODkxNH0.e2DTjFRAZav5xC6YaUpmfWV-whhn_a6bbv3qySSiigU";

const supabase = createClient(supabaseUrl, supabaseKey);
const dummyData = [
  {
    name: "Amina Hall",
    gender: "Female",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Suleiman Hall",
    gender: "Female",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Alexander Hall",
    gender: "Female",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Ribadu Hall",
    gender: "Female",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Akenzua Hall",
    gender: "Male",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Danfodio Hall",
    gender: "Male",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "ICSA Hall",
    gender: "Male",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Ramat Hall",
    gender: "Male",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Dangote Hall",
    gender: "Male",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Shehu Idris Hall",
    gender: "Male",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Ali Akilu Hall",
    gender: "Male",
    campus: "kongo",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Tafawa Balewa Hall",
    gender: "Male",
    campus: "kongo",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 6,
            occupancy: 5,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 6,
            occupancy: 4,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 6,
            occupancy: 6,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Hostel 3",
    gender: "Male",
    campus: "kongo",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Hostel 1",
    gender: "Female",
    campus: "kongo",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Hostel 2",
    gender: "Female",
    campus: "kongo",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Bedde Hall",
    gender: "Female",
    campus: "kongo",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 3,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 3,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 3,
            occupancy: 3,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Sardauna Hall",
    gender: "Female",
    campus: "kongo",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 4,
            occupancy: 3,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 4,
            occupancy: 2,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 4,
            occupancy: 4,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Asma'u Mustapha Hall",
    gender: "Female",
    campus: "shika",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
        ],
      },
    ],
  },
  {
    name: "Aliyu Mustapha Hall",
    gender: "Male",
    campus: "shika",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A02",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A03",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A04",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B02",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B03",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B04",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C02",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C03",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C04",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D02",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D03",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D04",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E02",
            capacity: 2,
            occupancy: 2,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E03",
            capacity: 2,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E04",
            capacity: 2,
            occupancy: 1,
            floor_number: 1,
            status: "available",
          },
        ],
      },
    ],
  },
  {
    name: "Postgraduate Hall",
    gender: "Mixed",
    campus: "samaru",
    blocks: [
      {
        block_name: "Block A",
        rooms: [
          {
            room_number: "A01",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A02",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "A03",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "A04",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
        ],
      },
      {
        block_name: "Block B",
        rooms: [
          {
            room_number: "B01",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B02",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "B03",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "B04",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
        ],
      },
      {
        block_name: "Block C",
        rooms: [
          {
            room_number: "C01",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C02",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "C03",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "C04",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
        ],
      },
      {
        block_name: "Block D",
        rooms: [
          {
            room_number: "D01",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D02",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "D03",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "D04",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
        ],
      },
      {
        block_name: "Block E",
        rooms: [
          {
            room_number: "E01",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E02",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
          {
            room_number: "E03",
            capacity: 1,
            occupancy: 1,
            floor_number: 1,
            status: "full",
          },
          {
            room_number: "E04",
            capacity: 1,
            occupancy: 0,
            floor_number: 1,
            status: "available",
          },
        ],
      },
    ],
  },
];

// --- Population Function ---
async function populateHostelData() {
  console.log("Starting data population...");

  for (const hostelData of dummyData) {
    // 1. Insert Hostel
    console.log(`Inserting hostel: ${hostelData.name}...`);
    const { data: insertedHostel, error: hostelError } = await supabase
      .from("hostel")
      .insert({
        name: hostelData.name,
        gender: hostelData.gender,
        category: hostelData.category,
        campus: hostelData.campus,
      })
      .select(); // Select the inserted row to get its ID

    if (hostelError) {
      console.error(
        `Error inserting hostel ${hostelData.name}:`,
        hostelError.message
      );
      continue; // Skip to the next hostel if insertion fails
    }
    const hostelId = insertedHostel[0].id;
    console.log(`Hostel '${hostelData.name}' inserted with ID: ${hostelId}`);

    // 2. Insert Blocks for this Hostel
    for (const blockData of hostelData.blocks) {
      console.log(
        `  Inserting block: ${blockData.block_name} for ${hostelData.name}...`
      );
      const { data: insertedBlock, error: blockError } = await supabase
        .from("hostel_block")
        .insert({
          hostel_id: hostelId, // Link to the parent hostel
          name: blockData.block_name,
        })
        .select(); // Select the inserted row to get its ID

      if (blockError) {
        console.error(
          `  Error inserting block ${blockData.block_name}:`,
          blockError.message
        );
        continue; // Skip to the next block if insertion fails
      }
      const blockId = insertedBlock[0].id;
      console.log(
        `  Block '${blockData.block_name}' inserted with ID: ${blockId}`
      );

    // 3. Insert Rooms into `hostel_block_room`
    const roomsToInsert = blockData.rooms.map((room) => ({
      hostel_block_id: blockId,
      name: room.room_number, // or room.room_name depending on your data
      max_capacity: room.capacity,
    }));

    console.log(
      `    Inserting ${roomsToInsert.length} rooms for block ${blockData.block_name}...`
    );
    const { data: insertedRooms, error: roomsError } = await supabase
      .from("hostel_block_room")
      .insert(roomsToInsert)
      .select();

    if (roomsError) {
      console.error(
        `    Error inserting rooms for block ${blockData.block_name}:`,
        roomsError.message
      );
    } else {
      console.log(
        `    ${insertedRooms.length} rooms inserted for block ${blockData.block_name}.`
      );
    } 
    }
  }
  console.log("Data population complete!");
}

// --- Run the population script ---
populateHostelData();
