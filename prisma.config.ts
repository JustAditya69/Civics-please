import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Get BOTH URLs from your .env
const directConnectionString = env("DIRECT_URL"); // Port 5432 for pushing tables
const poolConnectionString = env("DATABASE_URL"); // Port 6543 for fast app queries

// 2. Feed the pooler URL to the adapter
const pool = new Pool({ connectionString: poolConnectionString });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // 3. Explicitly use the DIRECT URL here so 'db push' doesn't freeze
    url: directConnectionString, 
  },
  adapter: new PrismaPg(pool),
});