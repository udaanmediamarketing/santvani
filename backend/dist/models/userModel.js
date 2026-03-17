// src/models/userModel.ts
import pool from "../config/db.js";
export const createUser = async (name, email, hashedPassword, role = "user") => {
    const result = await pool.query(`INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING *`, [name, email.toLowerCase(), hashedPassword, role]);
    return result.rows[0];
};
export const findUserByEmail = async (email) => {
    const result = await pool.query(`SELECT * FROM users
     WHERE LOWER(email) = LOWER($1)
     LIMIT 1`, [email]);
    return result.rows.length ? result.rows[0] : null;
};
export const findUserById = async (id) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [id]);
    return result.rows.length ? result.rows[0] : null;
};
export const listPendingUsers = async () => {
    const result = await pool.query(`SELECT id, name, email, role, status, created_at
     FROM users
     WHERE status = 'pending'
     ORDER BY created_at ASC`);
    return result.rows;
};
export const approveUserById = async (id) => {
    const result = await pool.query(`UPDATE users
     SET status = 'approved'
     WHERE id = $1
     RETURNING *`, [id]);
    return result.rows.length ? result.rows[0] : null;
};
export const rejectUserById = async (id) => {
    const result = await pool.query(`UPDATE users
     SET status = 'rejected'
     WHERE id = $1
     RETURNING *`, [id]);
    return result.rows.length ? result.rows[0] : null;
};
//# sourceMappingURL=userModel.js.map