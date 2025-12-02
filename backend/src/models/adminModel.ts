// src/models/adminModel.ts
import pool from "../config/db"; // ✅ remove .js

export async function findAdminByEmail(email: string) {
  const res = await pool.query(
    "SELECT id, name, email, password, role FROM users WHERE email = $1 AND role = 'admin' LIMIT 1",
    [email]
  );
  return res.rows.length > 0 ? res.rows[0] : null;
}

export async function findAdminById(id: string) {
  const res = await pool.query(
    "SELECT id, name, email, role FROM users WHERE id = $1 AND role = 'admin' LIMIT 1",
    [id]
  );
  return res.rows.length > 0 ? res.rows[0] : null;
}

export async function isAdmin(id: string) {
  const res = await pool.query(
    "SELECT role FROM users WHERE id = $1 LIMIT 1",
    [id]
  );
  if (res.rows.length === 0) return false;
  return res.rows[0].role === "admin";
}
