// // scripts/seedAdmin.ts
// import dotenv from "dotenv";
// dotenv.config();
// import bcrypt from "bcryptjs";
// import { pool } from "../src/config/db.js";

// (async () => {
//   try {
//     const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@udaan.com";
//     const adminName = process.env.SEED_ADMIN_NAME || "Admin";
//     const adminPassword = process.env.SEED_ADMIN_PASS || "AdminPass123";

//     const hashed = await bcrypt.hash(adminPassword, 10);
//     const q = `INSERT INTO users (name, email, password, role, status) 
//                VALUES ($1,$2,$3,$4,$5)
//                ON CONFLICT (email) DO UPDATE SET role=EXCLUDED.role, status=EXCLUDED.status RETURNING *`;
//     const r = await pool.query(q, [adminName, adminEmail, hashed, "admin", "approved"]);
//     console.log("Seed admin created/updated:", r.rows[0]);
//     process.exit(0);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// })();
import pool from "../src/config/db.js";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  const email = "admin@santvani.com";
  const password = "Admin@123"; // change later
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    await pool.query(
      `INSERT INTO users (name, email, password, role, status)
       VALUES ($1, $2, $3, 'admin', 'approved')`,
      ["SantVani Admin", email, hashedPassword]
    );

    console.log("✅ Admin user seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
  } finally {
    pool.end();
  }
}

seedAdmin();
