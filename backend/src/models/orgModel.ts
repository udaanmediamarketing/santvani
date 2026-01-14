import pool from "../config/db.js";

export interface OrganizationRow {
  id: string;
  org_type: string | null;
  org_name: string;
  address: string | null;
  city: string;
  state: string;
  pincode: string | null;
  head_name: string;
  email: string;
  image_url: string | null;
  status: string;
  author_id: string;
  created_at: Date;
}

export const createOrganization = async (
  orgType: string | null,
  orgName: string,
  address: string | null,
  city: string,
  state: string,
  pincode: string | null,
  headName: string,
  email: string,
  imageUrl: string | null,
  author_id: string
): Promise<OrganizationRow> => {
  const result = await pool.query(
    `
    INSERT INTO organizations (
      org_type,
      org_name,
      address,
      city,
      state,
      pincode,
      head_name,
      email,
      image_url,
      status,
      author_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'pending', $10)
    RETURNING *
    `,
    [
      orgType,
      orgName,
      address,
      city,
      state,
      pincode,
      headName,
      email,
      imageUrl,
      author_id
    ]
  );

  return result.rows[0] as OrganizationRow;
};

export const getOrgsByUserId = async (id: string): Promise<OrganizationRow[]> => {
  const result = await pool.query(
    `SELECT * FROM organizations
     WHERE author_id = $1
     ORDER BY created_at DESC`,
     [id]
  );
  return result.rows as OrganizationRow[];
};

export const getAllOrgs = async (): Promise<OrganizationRow[]> => {
  const result = await pool.query(
    `SELECT * FROM organizations
     WHERE status = 'published'
     ORDER BY created_at DESC`,
  );
  return result.rows as OrganizationRow[];
};

export const updateOrgStatus = async (
  postId: string,
  status: "published" | "rejected"
) => {
  const query = `
    UPDATE organizations
    SET status = $1,
        updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;

  const values = [status, postId];

  const result = await pool.query(query, values);

  return result.rows[0] || null;
};

export const getPendingOrgs = async (): Promise<OrganizationRow[]> => {
  const result = await pool.query(`
    SELECT
      o.id,
      o.org_name,
      o.org_type,
      o.head_name,
      o.status,
      o.created_at,
      u.name AS created_by_name
    FROM organizations o
    JOIN users u ON o.author_id = u.id
    WHERE o.status = 'pending'
    ORDER BY o.created_at DESC
  `);

  return result.rows as OrganizationRow[];
};