// src/models/postModel.ts
import pool from "../config/db"; // ✅ Remove .js

export interface PostRow {
  id: string;
  title: string;
  category: string;
  content?: string;
  pdf_url?: string;
  status: string;
  author_id?: string;
  created_at: string;
}

/**
 * Create a new post (status defaults to 'pending')
 */
export const createPost = async (
  title: string,
  category: string,
  content: string | null,
  pdf_url: string | null,
  author_id: string | null
) => {
  const res = await pool.query(
    `INSERT INTO articles (title, category, content, pdf_url, author_id, status)
     VALUES ($1, $2, $3, $4, $5, 'pending')
     RETURNING *`,
    [title, category, content, pdf_url, author_id]
  );

  return res.rows[0] as PostRow;
};

/**
 * Get all pending posts
 */
export const getPendingPosts = async () => {
  const res = await pool.query(
    `SELECT * FROM articles WHERE status = 'pending' ORDER BY created_at DESC`
  );
  return res.rows as PostRow[];
};

/**
 * Approve post (returns updated post)
 */
export const approvePostById = async (id: string) => {
  const res = await pool.query(
    `UPDATE articles SET status = 'approved' WHERE id = $1 RETURNING *`,
    [id]
  );
  return res.rows[0] as PostRow;
};

/**
 * Reject post (returns updated post)
 */
export const rejectPostById = async (id: string) => {
  const res = await pool.query(
    `UPDATE articles SET status = 'rejected' WHERE id = $1 RETURNING *`,
    [id]
  );
  return res.rows[0] as PostRow;
};

/**
 * Get all approved posts
 */
export const getApprovedPosts = async () => {
  const res = await pool.query(
    `SELECT * FROM articles WHERE status = 'approved' ORDER BY created_at DESC`
  );
  return res.rows as PostRow[];
};

/**
 * Get post by ID
 */
export const getPostById = async (id: string) => {
  const res = await pool.query(
    `SELECT * FROM articles WHERE id = $1`,
    [id]
  );
  return res.rows[0] as PostRow | undefined;
};
