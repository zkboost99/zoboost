import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET all contacts or single contact by ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id);

      if (error) throw error;

      if (!data || data.length === 0) {
        return NextResponse.json({ success: false, error: 'Contact not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, contact: data[0] });
    }

    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, contacts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST create contact
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, status } = body;

    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    const { data: contact, error } = await supabase
      .from('contacts')
      .insert([{ 
        name: name || null, 
        email: email || null, 
        message, 
        status: status || 'Unread' 
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, contact });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH update status or message
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, message } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const updateFields: any = {};
    if (status !== undefined) updateFields.status = status;
    if (message !== undefined) updateFields.message = message;

    const { data: contact, error } = await supabase
      .from('contacts')
      .update(updateFields)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, contact });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE contact
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
