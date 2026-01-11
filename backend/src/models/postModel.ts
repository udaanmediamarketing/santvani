// src/models/postModel.ts
import pool from "../config/db.js";

export type PostStatus = "pending" | "approved" | "rejected";

export interface PostRow {
  id: string;
  title: string;
  category: string;
  content?: string | null;
  image_url?: string | null;
  status: PostStatus;
  author_id?: string | null;
  created_at: string;
}


export const createPost = async (
  title: string,
  category: string,
  content: string | null = null,
  image_url: string | null = null,
  author_id: string | null = null
): Promise<PostRow> => {
  const result = await pool.query(
    `INSERT INTO articles (title, category, content, image_url, author_id, status)
     VALUES ($1, $2, $3, $4, $5, 'pending')
     RETURNING *`,
    [title, category, content, image_url, author_id]
  );

  return result.rows[0] as PostRow;
};


export const getPendingPosts = async (): Promise<PostRow[]> => {
  const result = await pool.query(`
    SELECT
      p.id,
      p.title,
      p.status,
      p.created_at,
      u.name AS author_name
    FROM articles p
    JOIN users u ON p.author_id = u.id
    WHERE p.status = 'pending'
    ORDER BY p.created_at DESC
  `);

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


export const getPosts = async (id: string): Promise<PostRow[]> => {
  const result = await pool.query(
    `SELECT * FROM articles
     WHERE author_id = $1
     ORDER BY created_at DESC`,
     [id]
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

export const updatePostStatus = async (
  postId: string,
  status: "published" | "rejected"
) => {
  const query = `
    UPDATE articles
    SET status = $1,
        updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;

  const values = [status, postId];

  const result = await pool.query(query, values);

  return result.rows[0] || null;
};

export const getPostsBySantName = async (name: string): Promise<PostRow[]> => {
  const santname = decodeURIComponent(name);
  const result = await pool.query(
    `SELECT * FROM articles
     WHERE category = $1
     ORDER BY created_at DESC`,
     [santname]
  );
  console.log("result",result);
  return result.rows as PostRow[];
};