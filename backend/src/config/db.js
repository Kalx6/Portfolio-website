import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exit(1);
});

export async function checkDbConnection() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
    console.log("✅ Database connection established");
  } finally {
    client.release();
  }
}
