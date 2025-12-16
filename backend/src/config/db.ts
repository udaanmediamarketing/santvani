import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("DEBUG DATABASE_URL:", JSON.stringify(process.env.DATABASE_URL));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL Database");
});

export default pool;

