import { pool } from "../config/db.js";

export async function saveContactMessage({ name, email, message, ipAddress }) {
  const query = `
    INSERT INTO contact_messages (name, email, message, ip_address)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, message, created_at;
  `;
  const values = [name, email, message, ipAddress];

  const result = await pool.query(query, values);
  return result.rows[0];
}
