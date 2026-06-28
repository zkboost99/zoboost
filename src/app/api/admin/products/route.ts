import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const ALLOWED_CATEGORIES = [
  "Server Boost", 
  "Discord Promo", 
  "Discord Decoration", 
  "Server Members", 
  "Nitro Boost", 
  "Nitro Basic", 
  "Nitro Account"
];

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.title || !data.price) {
      return NextResponse.json({ error: 'Title and Price are required' }, { status: 400 });
    }

    if (!ALLOWED_CATEGORIES.includes(data.category)) {
      return NextResponse.json({ error: 'Invalid category selected. Custom categories are not allowed.' }, { status: 400 });
    }

    const { data: insertedData, error } = await supabaseAdmin
      .from('products')
      .insert([
        {
          title: data.title,
          description: data.description || '',
          long_description: data.long_description || '',
          badge_text: data.badge_text || '',
          category: data.category || '',
          price: parseFloat(data.price),
          discount_type: data.discount_type || 'None',
          discount_value: parseFloat(data.discount_value) || 0,
          delivery_method: data.delivery_method || 'Login Method',
          delivery_time: data.delivery_time || 'Instant',
          media_url: data.media_url || null,
          status: data.status || 'Active'
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

    if (data.category && !ALLOWED_CATEGORIES.includes(data.category)) {
      return NextResponse.json({ error: 'Invalid category selected. Custom categories are not allowed.' }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {
      title: data.title,
      description: data.description,
      long_description: data.long_description,
      badge_text: data.badge_text,
      category: data.category,
      price: data.price !== undefined ? parseFloat(data.price) : undefined,
      discount_type: data.discount_type,
      discount_value: data.discount_value !== undefined ? parseFloat(data.discount_value) : undefined,
      delivery_method: data.delivery_method,
      delivery_time: data.delivery_time,
      status: data.status
    };

    if (data.media_url !== undefined) {
      updatePayload.media_url = data.media_url;
    }

    // Remove undefined values
    Object.keys(updatePayload).forEach(key => updatePayload[key] === undefined && delete updatePayload[key]);

    const { data: updatedData, error } = await supabaseAdmin
      .from('products')
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
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, products: data });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
