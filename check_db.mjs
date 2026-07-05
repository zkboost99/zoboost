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
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(res.rows.map(r => r.table_name));
    
    // Check if notifications table exists and get its columns
    const hasNotifications = res.rows.some(r => r.table_name === 'notifications');
    if (hasNotifications) {
      const colRes = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'notifications'
      `);
      console.log("Notifications columns:", colRes.rows);
    } else {
      console.log("No notifications table found.");
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
