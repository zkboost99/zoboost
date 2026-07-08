import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, sender, message } = body;

    if (!orderId || !sender || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    if (sender !== 'admin' && sender !== 'customer') {
      return NextResponse.json({ success: false, error: 'Invalid sender' }, { status: 400 });
    }

    // Insert message into database using admin key to bypass RLS
    const { data, error } = await supabaseAdmin
      .from('order_chats')
      .insert([
        {
          order_id: orderId,
          sender: sender,
          message: message
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database Error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: data });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
