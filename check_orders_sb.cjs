const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const envVars = {};
for (const line of envContent.split('\n')) {
  if (line.includes('=')) {
    const [key, ...rest] = line.split('=');
    envVars[key.trim()] = rest.join('=').trim();
  }
}

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    const { data, error } = await supabase.from('orders').insert([{}]).select();
    if (error) console.error("Insert error:", error);
    else console.log("Order structure:", data[0]);

    // Clean up
    if (data && data[0] && data[0].id) {
        await supabase.from('orders').delete().eq('id', data[0].id);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
