import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('money_exchange')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, offers: data });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.giving_currency || !data.getting_currency || !data.exchange_rate || !data.reserve_stock || !data.price_text) {
      return NextResponse.json({ error: 'All fields (giving_currency, getting_currency, exchange_rate, reserve_stock, price_text) are required' }, { status: 400 });
    }

    // Determine next order_index
    const { data: currentOffers } = await supabaseAdmin
      .from('money_exchange')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1);

    const nextOrderIndex = currentOffers && currentOffers.length > 0 ? (currentOffers[0].order_index || 0) + 1 : 1;

    const { data: insertedData, error } = await supabaseAdmin
      .from('money_exchange')
      .insert([
        {
          giving_currency: data.giving_currency,
          getting_currency: data.getting_currency,
          exchange_rate: data.exchange_rate,
          reserve_stock: data.reserve_stock,
          price_text: data.price_text,
          media_url: data.media_url || null,
          order_index: data.order_index !== undefined ? parseInt(data.order_index) : nextOrderIndex
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, offer: insertedData });
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
      return NextResponse.json({ error: 'Offer ID is required for update' }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {
      giving_currency: data.giving_currency,
      getting_currency: data.getting_currency,
      exchange_rate: data.exchange_rate,
      reserve_stock: data.reserve_stock,
      price_text: data.price_text,
      media_url: data.media_url,
      order_index: data.order_index !== undefined ? parseInt(data.order_index) : undefined
    };

    // Remove undefined values
    Object.keys(updatePayload).forEach(key => updatePayload[key] === undefined && delete updatePayload[key]);

    const { data: updatedData, error } = await supabaseAdmin
      .from('money_exchange')
      .update(updatePayload)
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, offer: updatedData });
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
      return NextResponse.json({ error: 'Offer ID is required for deletion' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('money_exchange')
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
