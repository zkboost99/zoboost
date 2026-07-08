const { Client } = require('pg');
const regions = ['aws-0-eu-central-1', 'aws-0-us-east-1', 'aws-0-us-west-1', 'aws-0-eu-west-1', 'aws-0-ap-southeast-1', 'aws-0-ap-south-1', 'aws-0-sa-east-1', 'aws-0-ap-southeast-2'];

async function test() {
  for (const r of regions) {
    const url = `postgresql://postgres.zepfgxyuzblxebqutbvi:$$Sameer1266@${r}.pooler.supabase.com:6543/postgres`;
    const c = new Client({ connectionString: url });
    try {
      await c.connect();
      console.log('Connected to', r);
      await c.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);');
      console.log('Column user_id added successfully.');
      await c.end();
      return;
    } catch (e) {
      // console.log(`Failed for ${r}: ${e.message}`);
    }
  }
  console.log('None worked');
}
test();
