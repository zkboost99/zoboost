import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('netflix_products')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, products: data });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.account_type || !data.duration || data.price === undefined || data.stock_quantity === undefined || !data.delivery_method) {
      return NextResponse.json({ error: 'All fields (account_type, duration, price, stock_quantity, delivery_method) are required' }, { status: 400 });
    }

    // Determine next order_index
    const { data: currentProducts } = await supabaseAdmin
      .from('netflix_products')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1);

    const nextOrderIndex = currentProducts && currentProducts.length > 0 ? (currentProducts[0].order_index || 0) + 1 : 1;

    const { data: insertedData, error } = await supabaseAdmin
      .from('netflix_products')
      .insert([
        {
          account_type: data.account_type,
          duration: data.duration,
          price: parseFloat(data.price),
          stock_quantity: parseInt(data.stock_quantity),
          delivery_method: data.delivery_method,
          badge_text: data.badge_text || null,
          media_url: data.media_url || null,
          order_index: data.order_index !== undefined ? parseInt(data.order_index) : nextOrderIndex
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, product: insertedData });
  } catch (error: unknown) {
    console.error('API error:', error);
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    if (!data.id) {
      return NextResponse.json({ error: 'Product ID is required for update' }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {
      account_type: data.account_type,
      duration: data.duration,
      price: data.price !== undefined ? parseFloat(data.price) : undefined,
      stock_quantity: data.stock_quantity !== undefined ? parseInt(data.stock_quantity) : undefined,
      delivery_method: data.delivery_method,
      badge_text: data.badge_text,
      media_url: data.media_url,
      order_index: data.order_index !== undefined ? parseInt(data.order_index) : undefined
    };

    // Remove undefined values
    Object.keys(updatePayload).forEach(key => updatePayload[key] === undefined && delete updatePayload[key]);

    const { data: updatedData, error } = await supabaseAdmin
      .from('netflix_products')
      .update(updatePayload)
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, product: updatedData });
  } catch (error: unknown) {
    console.error('API error:', error);
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required for deletion' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('netflix_products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('API error:', error);
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
