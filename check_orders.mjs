import pg from 'pg';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const envVars = {};
for (const line of envContent.split('\n')) {
  if (line.includes('=')) {
    const [key, ...rest] = line.split('=');
    envVars[key.trim()] = rest.join('=').trim();
  }
}

const client = new pg.Client({ connectionString: envVars['DATABASE_URL'] });

async function run() {
  try {
    await client.connect();
    const colRes = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'orders'
    `);
    console.log("Orders columns:", colRes.rows);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
