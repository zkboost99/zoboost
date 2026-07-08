import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { order_id, message } = body;

  if (!order_id || !message) {
    return NextResponse.json({ error: 'order_id and message are required' }, { status: 400 });
  }

  // We are using the admin route, so we can use the service role key to bypass RLS
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Get the order to find the customer's email
  const { data: order } = await adminSupabase.from('orders').select('*').eq('id', order_id).single();
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  // 2. Fetch all contacts for this email to find the existing chat thread for this order
  const { data: contacts } = await adminSupabase.from('contacts').select('*').eq('email', order.email);
  let orderContact = null;
  if (contacts) {
    for (const c of contacts) {
      try {
        const parsed = JSON.parse(c.message);
        if (parsed.type === 'chat' && parsed.orderId === order_id) {
          orderContact = c;
          break;
        }
      } catch (e) {}
    }
  }

  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const newMessageObj = { sender: 'admin', text: message.trim(), time: timeStr };

  if (orderContact) {
    // Append to existing thread
    const parsed = JSON.parse(orderContact.message);
    parsed.messages.push(newMessageObj);
    const { error } = await adminSupabase.from('contacts').update({
      message: JSON.stringify(parsed),
      status: 'Unread'
    }).eq('id', orderContact.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    // Create new thread
    const newParsed = {
      type: 'chat',
      isBuyer: true,
      orderId: order_id,
      messages: [newMessageObj]
    };
    const { error } = await adminSupabase.from('contacts').insert({
      name: order.username || order.email.split('@')[0],
      email: order.email,
      message: JSON.stringify(newParsed),
      status: 'Unread'
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
