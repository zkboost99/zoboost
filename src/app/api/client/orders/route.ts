import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // Get user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Please login to create an order.' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      productId, 
      productName, 
      productUrl, 
      productPrice, 
      paymentMethod 
    } = body;

    // Basic Validation
    if (!productId || !productPrice || !paymentMethod) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Determine name/email
    const customerEmail = user.email || 'guest@discord.shop';
    const customerName = user.user_metadata?.full_name || user.user_metadata?.custom_full_name || 'Customer';

    // Insert into orders table
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerName,
          email: customerEmail,
          product_id: productId,
          amount: productPrice,
          status: 'Pending',
          payment_method: paymentMethod,
          product_name: productName,
          product_url: productUrl,
          transaction_id: 'TXN-' + Math.floor(Math.random() * 1000000)
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database Error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Automatically create a "Order Created" system message or first chat entry if needed
    // The Customer Chat UI already shows "Order Created" natively based on order properties, 
    // but if we want to kickstart the chat in the DB:
    // (Optional, doing nothing here as chat can just start when someone sends a message)

    return NextResponse.json({ success: true, order: data, orderId: data.id });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
