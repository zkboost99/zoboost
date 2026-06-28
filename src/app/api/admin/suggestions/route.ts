import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.message) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const { data: insertedData, error } = await supabaseAdmin
      .from('suggestions')
      .insert([
        {
          name: data.name || null,
          email: data.email || null,
          message: data.message,
          status: 'New'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, suggestion: insertedData });
  } catch (error: unknown) {
    console.error('API error:', error);
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data: suggestions, error } = await supabaseAdmin
      .from('suggestions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, suggestions });
  } catch (error: unknown) {
    console.error('API error:', error);
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.id || !data.status) {
      return NextResponse.json({ error: 'ID and Status are required' }, { status: 400 });
    }

    const allowedStatuses = ['New', 'Reviewed', 'Closed'];
    if (!allowedStatuses.includes(data.status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const { data: updatedData, error } = await supabaseAdmin
      .from('suggestions')
      .update({ status: data.status })
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, suggestion: updatedData });
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
      return NextResponse.json({ error: 'ID is required for deletion' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('suggestions')
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
