// src/models/userModel.ts
import pool from "../config/db"; // ✅ Remove .js

export interface UserRow {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  created_at: string;
}

/**
 * Create user → status 'pending'
 */
export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string,
  role = "user"
) => {
  const res = await pool.query(
    `INSERT INTO users (name, email, password, role, status)
     VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
    [name, email, hashedPassword, role]
  );
  return res.rows[0] as UserRow;
};

/** Find by email */
export const findUserByEmail = async (email: string) => {
  const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return res.rows[0] as UserRow | undefined;
};

/** Find by id */
export const findUserById = async (id: string) => {
  const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return res.rows[0] as UserRow | undefined;
};

/** List all users with pending status */
export const listPendingUsers = async () => {
  const res = await pool.query(
    `SELECT id, name, email, role, status, created_at
     FROM users
     WHERE status = 'pending'
     ORDER BY created_at DESC`
  );
  return res.rows as Partial<UserRow>[];
};

/** Approve user */
export const approveUserById = async (id: string) => {
  return await setUserStatus(id, "approved");
};

/** Reject user */
export const rejectUserById = async (id: string) => {
  return await setUserStatus(id, "rejected");
};

/**
 * Generic status change helper
 * Now RETURNS updated user directly
 */
export const setUserStatus = async (id: string, status: string) => {
  const res = await pool.query(
    `UPDATE users SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return res.rows[0] as UserRow;
};
