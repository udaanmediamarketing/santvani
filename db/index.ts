import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Your Neon connection string (put in .env.local)
const sql = neon(process.env.DATABASE_URL!);
console.log("Database URL:", process.env.DATABASE_URL);
export const db = drizzle(sql);