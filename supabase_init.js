const { Client } = require('pg');

const connectionString = "postgresql://postgres:$$Sameer1266@db.zepfgxyuzblxebqutbvi.supabase.co:5432/postgres";

// Fix double dollar sign in password if needed, but pg should accept it as is if it's literal.
const client = new Client({
  connectionString: connectionString
});

async function main() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL database successfully.");

    // Create suggestions table
    console.log("Creating 'suggestions' table if not exists...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS suggestions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT,
        email TEXT,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    console.log("'suggestions' table verified/created.");

    // Create bug_reports table
    console.log("Creating 'bug_reports' table if not exists...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS bug_reports (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT,
        email TEXT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    console.log("'bug_reports' table verified/created.");

  } catch (error) {
    console.error("Database initialization error:", error);
  } finally {
    await client.end();
  }
}

main();
