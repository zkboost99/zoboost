const fs = require('fs');
const dotenv = fs.readFileSync('.env.local', 'utf8');
const match = dotenv.match(/DATABASE_URL="?(.*?)"?(?:\r|\n|$)/);
const dbUrl = match ? match[1] : null;

if (!dbUrl) {
  console.error('DATABASE_URL not found');
  process.exit(1);
}

const { Client } = require('pg');
const client = new Client({ connectionString: dbUrl });

client.connect()
  .then(() => {
    console.log('Connected to DB');
    const query = `ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);`;
    return client.query(query);
  })
  .then((res) => {
    console.log('Column added successfully');
  })
  .catch(err => console.error('Error:', err))
  .finally(() => client.end());
