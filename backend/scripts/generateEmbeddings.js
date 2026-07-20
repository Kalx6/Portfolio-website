import { GoogleGenAI } from '@google/genai';
import { pool } from '../src/config/db.js';
import { KNOWLEDGE_BASE } from '../src/data/knowledgeBase.js';
import 'dotenv/config';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateEmbeddings() {
  console.log(`Generating embeddings for ${KNOWLEDGE_BASE.length} chunks...`);

  for (const chunk of KNOWLEDGE_BASE) {
    const response = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: chunk.content,
    });

    const embedding = response.embeddings[0].values;

    // Upsert: if this chunk id already exists (re-running after an edit),
    // update it in place instead of erroring on a duplicate primary key.
    await pool.query(
      `INSERT INTO knowledge_chunks (id, category, content, embedding)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE
       SET category = EXCLUDED.category,
           content = EXCLUDED.content,
           embedding = EXCLUDED.embedding`,
      [chunk.id, chunk.category, chunk.content, embedding]
    );

    console.log(`✅ Embedded & saved: ${chunk.id}`);
  }

  console.log(`\n✅ Done. ${KNOWLEDGE_BASE.length} chunks stored in knowledge_chunks table.`);
  process.exit(0);
}

generateEmbeddings().catch((err) => {
  console.error('Failed to generate embeddings:', err);
  process.exit(1);
});