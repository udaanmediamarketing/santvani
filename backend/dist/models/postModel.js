// src/models/postModel.ts
import pool from "../config/db.js";
export const createPost = async (title, category, santname, content = null, image_url = null, youtube_url = null, slug, author_id) => {
    const result = await pool.query(`INSERT INTO articles (title, category, santname, content, image_url, youtube_url, slug, author_id, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
     RETURNING *`, [title, category, santname, content, image_url, youtube_url, slug, author_id]);
    return result.rows[0];
};
export const getPendingPosts = async () => {
    const result = await pool.query(`
    SELECT
      p.id,
      p.title,
      p.category,
      p.santname,
      p.status,
      p.created_at,
      u.name AS author_name
    FROM articles p
    JOIN users u ON p.author_id = u.id
    WHERE p.status = 'pending'
    ORDER BY p.created_at DESC
  `);
    return result.rows;
};
export const approvePostById = async (id) => {
    const result = await pool.query(`UPDATE articles
     SET status = 'approved'
     WHERE id = $1
     RETURNING *`, [id]);
    return result.rows.length ? result.rows[0] : null;
};
export const rejectPostById = async (id) => {
    const result = await pool.query(`UPDATE articles
     SET status = 'rejected'
     WHERE id = $1
     RETURNING *`, [id]);
    return result.rows.length ? result.rows[0] : null;
};
export const getPosts = async (id) => {
    const result = await pool.query(`SELECT * FROM articles
     WHERE author_id = $1
     ORDER BY created_at DESC`, [id]);
    return result.rows;
};
export const getAllPosts = async ({ limit = 50 } = {}) => {
    const result = await pool.query(`SELECT * FROM articles
     WHERE status = 'published'
     ORDER BY created_at DESC
     LIMIT $1`, [limit]);
    return result.rows;
};
export const getPostById = async (id) => {
    const result = await pool.query(`SELECT * FROM articles WHERE id = $1 LIMIT 1`, [id]);
    return result.rows.length ? result.rows[0] : null;
};
export const updatePost = async (id, fields) => {
    const result = await pool.query(`UPDATE articles
     SET title = $1, category = $2, santname = $3, content = $4,
         image_url = $5, youtube_url = $6, slug = $7, updated_at = NOW()
     WHERE id = $8
     RETURNING *`, [fields.title, fields.category, fields.santname, fields.content,
        fields.image_url, fields.youtube_url, fields.slug, id]);
    return result.rows[0] || null;
};
export const updatePostStatus = async (postId, status) => {
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
export const getPostsBySantName = async (name) => {
    const santname = decodeURIComponent(name);
    const result = await pool.query(`SELECT * FROM articles
     WHERE santname = $1 AND status = 'published'
     ORDER BY created_at DESC`, [santname]);
    console.log("result", result);
    return result.rows;
};
export const getPostsByCategory = async (category, { limit = 10 } = {}) => {
    const decodedCat = decodeURIComponent(category);
    const result = await pool.query(`SELECT *
     FROM articles
     WHERE status = 'published'
       AND category = $1
     ORDER BY created_at DESC
      LIMIT $2`, [decodedCat, limit]);
    return result.rows;
};
export const getPostBySlug = async (slug) => {
    const decodedSlug = decodeURIComponent(slug);
    const result = await pool.query(`
    SELECT *
    FROM articles
    WHERE slug = $1
      AND status = 'published'
    LIMIT 1
    `, [decodedSlug]);
    return result.rows[0] || null;
};
export const getListByCategory = async () => {
    const result = await pool.query(`
    SELECT
      category,
      COUNT(*)::int AS count,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', id,
            'title', title,
            'slug', slug,
            'created_at', created_at
          )
          ORDER BY created_at DESC
        ),
        '[]'::json
      ) AS posts
    FROM articles
    WHERE status = 'published'
    GROUP BY category
    ORDER BY category
  `);
    return result.rows;
};
// gallery items - photo and video
export const getGalleryPosts = async () => {
    const result = await pool.query(`
    SELECT
      id,
      title,
      image_url,
      youtube_url,
      created_at
    FROM articles
    WHERE status = 'published'
      AND (image_url IS NOT NULL OR youtube_url IS NOT NULL)
    ORDER BY created_at DESC
  `);
    return result.rows;
};
//# sourceMappingURL=postModel.js.map