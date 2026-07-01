import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('homepage_cards')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, cards: data });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.brand_name || !data.title || !data.category_tag || !data.price_text || !data.icon_type) {
      return NextResponse.json({ error: 'All fields (brand_name, title, category_tag, price_text, icon_type) are required' }, { status: 400 });
    }

    // Determine next order_index
    const { data: currentCards } = await supabaseAdmin
      .from('homepage_cards')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1);

    const nextOrderIndex = currentCards && currentCards.length > 0 ? (currentCards[0].order_index || 0) + 1 : 1;

    const { data: insertedData, error } = await supabaseAdmin
      .from('homepage_cards')
      .insert([
        {
          brand_name: data.brand_name,
          icon_type: data.icon_type,
          category_tag: data.category_tag,
          title: data.title,
          price_text: data.price_text,
          link_url: data.link_url || '#',
          order_index: data.order_index !== undefined ? parseInt(data.order_index) : nextOrderIndex
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, card: insertedData });
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
      return NextResponse.json({ error: 'Card ID is required for update' }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {
      brand_name: data.brand_name,
      icon_type: data.icon_type,
      category_tag: data.category_tag,
      title: data.title,
      price_text: data.price_text,
      link_url: data.link_url,
      order_index: data.order_index !== undefined ? parseInt(data.order_index) : undefined
    };

    // Remove undefined values
    Object.keys(updatePayload).forEach(key => updatePayload[key] === undefined && delete updatePayload[key]);

    const { data: updatedData, error } = await supabaseAdmin
      .from('homepage_cards')
      .update(updatePayload)
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, card: updatedData });
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
      return NextResponse.json({ error: 'Card ID is required for deletion' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('homepage_cards')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
