import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import pool from "../src/config/db.ts";

const isBcryptHash = (password: string) =>
  password.startsWith("$2a$") ||
  password.startsWith("$2b$") ||
  password.startsWith("$2y$");

(async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "hello@gmail.com";
    const adminName = process.env.ADMIN_NAME || "Admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "hello@123";

    const existing = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [adminEmail]
    );

    let finalPassword: string;

    if (existing.rowCount === 0) {
      finalPassword = await bcrypt.hash(adminPassword, 10);
      console.log("🔐 Admin created with hashed password");
    } else {
      const dbPassword = existing.rows[0].password;

      if (isBcryptHash(dbPassword)) {
        finalPassword = dbPassword;
        console.log("♻️ Existing bcrypt password preserved");
      } else {
        finalPassword = await bcrypt.hash(dbPassword, 10);
        console.log("🔁 Plain password detected → rehashed");
      }
    }

    const q = `
      INSERT INTO users (name, email, password, role, status)
      VALUES ($1,$2,$3,'admin','approved')
      ON CONFLICT (email)
      DO UPDATE SET
        name = EXCLUDED.name,
        password = $3,
        role = 'admin',
        status = 'approved'
      RETURNING id, name, email, role, status
    `;

    const r = await pool.query(q, [
      adminName,
      adminEmail,
      finalPassword,
    ]);

    process.exit(0);

  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
})();
