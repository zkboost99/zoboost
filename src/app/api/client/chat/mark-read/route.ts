import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { order_id } = body;

  if (!order_id) {
    return NextResponse.json({ error: 'order_id is required' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { createClient: createAdminClient } = await import('@supabase/supabase-js');
  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Get the order to find the customer's email
  const { data: order } = await adminSupabase.from('orders').select('*').eq('id', order_id).single();
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  // 2. Fetch contacts and find the chat thread
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

  if (orderContact) {
    const parsed = JSON.parse(orderContact.message);
    if (parsed.customerUnread) {
      parsed.customerUnread = false;
      const { error } = await adminSupabase.from('contacts').update({
        message: JSON.stringify(parsed)
      }).eq('id', orderContact.id);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
