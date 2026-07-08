import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import OrderChatClient from './OrderChatClient';

export default async function OrderChatPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  // Verify it's a valid UUID
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(id)) {
    notFound();
  }
  
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (!order) {
    notFound();
  }

  // Fetch the actual product image from the correct table
  let media_url = null;
  const { data: p1 } = await supabase.from('products').select('media_url').eq('id', order.product_id).single();
  if (p1) media_url = p1.media_url;
  else {
    const { data: p2 } = await supabase.from('netflix_products').select('media_url').eq('id', order.product_id).single();
    if (p2) media_url = p2.media_url;
    else {
      const { data: p3 } = await supabase.from('money_exchange').select('media_url').eq('id', order.product_id).single();
      if (p3) media_url = p3.media_url;
    }
  }

  // Attach the correct media_url to the order object so the client can use it
  order.real_media_url = media_url;

  return (
    <OrderChatClient initialOrder={order} />
  );
}
