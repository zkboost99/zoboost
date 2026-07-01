import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupAdmin() {
  console.log("Setting up Admin User...");

  // 1. Check if user already exists
  const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    console.error("Failed to list users:", listError);
    return;
  }

  const existingAdmin = usersData.users.find(u => u.email === 'admin@zoroboost.com');

  if (existingAdmin) {
    console.log("Admin user already exists. Updating credentials and metadata...");
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      existingAdmin.id,
      {
        password: '$$ZoroBoost1',
        app_metadata: { role: 'admin' },
        user_metadata: { security_question: 'Im_Zoro' }
      }
    );

    if (error) {
      console.error("Error updating admin:", error.message);
    } else {
      console.log("Admin user successfully updated!", data.user.id);
    }
  } else {
    console.log("Creating new Admin user...");
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@zoroboost.com',
      password: '$$ZoroBoost1',
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { security_question: 'Im_Zoro' }
    });

    if (error) {
      console.error("Error creating admin:", error.message);
    } else {
      console.log("Admin user successfully created!", data.user.id);
    }
  }
}

setupAdmin();
