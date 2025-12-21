// src/models/postModel.ts
import pool from "../config/db.js";


export type PostStatus = "pending" | "approved" | "rejected";

export interface PostRow {
  id: string;
  title: string;
  category: string;
  content?: string | null;
  pdf_url?: string | null;
  status: PostStatus;
  author_id?: string | null;
  created_at: string;
}


export const createPost = async (
  title: string,
  category: string,
  content: string | null = null,
  pdf_url: string | null = null,
  author_id: string | null = null
): Promise<PostRow> => {
  const result = await pool.query(
    `INSERT INTO articles (title, category, content, pdf_url, author_id, status)
     VALUES ($1, $2, $3, $4, $5, 'pending')
     RETURNING *`,
    [title, category, content, pdf_url, author_id]
  );

  return result.rows[0] as PostRow;
};


export const getPendingPosts = async (): Promise<PostRow[]> => {
  const result = await pool.query(
    `SELECT * FROM articles WHERE status = 'pending' ORDER BY created_at ASC`
  );
  return result.rows as PostRow[];
};


export const approvePostById = async (id: string): Promise<PostRow | null> => {
  const result = await pool.query(
    `UPDATE articles
     SET status = 'approved'
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows.length ? (result.rows[0] as PostRow) : null;
};


export const rejectPostById = async (id: string): Promise<PostRow | null> => {
  const result = await pool.query(
    `UPDATE articles
     SET status = 'rejected'
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows.length ? (result.rows[0] as PostRow) : null;
};


export const getApprovedPosts = async (): Promise<PostRow[]> => {
  const result = await pool.query(
    `SELECT * FROM articles
     WHERE status = 'approved'
     ORDER BY created_at DESC`
  );

  return result.rows as PostRow[];
};


export const getPostById = async (id: string): Promise<PostRow | null> => {
  const result = await pool.query(
    `SELECT * FROM articles WHERE id = $1 LIMIT 1`,
    [id]
  );

  return result.rows.length ? (result.rows[0] as PostRow) : null;
};