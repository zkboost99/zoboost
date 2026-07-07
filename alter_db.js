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
    const query = `
      ALTER TABLE public.orders 
      ADD COLUMN IF NOT EXISTS phone_number TEXT,
      ADD COLUMN IF NOT EXISTS discord_username TEXT,
      ADD COLUMN IF NOT EXISTS payment_method TEXT,
      ADD COLUMN IF NOT EXISTS product_name TEXT,
      ADD COLUMN IF NOT EXISTS product_url TEXT;
    `;
    return client.query(query);
  })
  .then((res) => {
    console.log('Table altered successfully');
  })
  .catch(err => console.error('Error:', err))
  .finally(() => client.end());
