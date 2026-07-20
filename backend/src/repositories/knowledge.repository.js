// src/repositories/knowledge.repository.js

import { pool } from "../config/db.js";

export async function getAllKnowledgeChunks() {
  const result = await pool.query(
    "SELECT id, category, content, embedding FROM knowledge_chunks",
  );
  return result.rows;
}
