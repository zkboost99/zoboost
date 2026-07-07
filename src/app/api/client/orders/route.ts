import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      productId, 
      productName, 
      productUrl, 
      productPrice, 
      customerName, 
      email, 
      phoneNumber, 
      discordUsername, 
      paymentMethod 
    } = body;

    // Basic Validation
    if (!productId || !productPrice || !paymentMethod) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Insert into orders table
    // (Assuming the database migration has been run to add these new columns)
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          customer_name: 'Guest',
          email: 'guest@discord.shop',
          product_id: productId,
          amount: productPrice,
          status: 'Pending',
          phone_number: null,
          discord_username: null,
          payment_method: paymentMethod,
          product_name: productName,
          product_url: productUrl,
          // Generate a fake transaction ID just for UI purposes until real payment is integrated
          transaction_id: 'TXN-' + Math.floor(Math.random() * 1000000)
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database Error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
