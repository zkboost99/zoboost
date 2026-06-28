import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { data: insertedData, error } = await supabaseAdmin
      .from('posts')
      .insert([
        {
          title: data.title,
          category: data.category || '',
          author: data.author || 'Admin',
          status: data.status || 'Draft',
          publish_date: data.publish_date || null,
          excerpt: data.excerpt || '',
          content: data.content || '',
          media_url: data.media_url || null,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, post: insertedData });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.id) {
      return NextResponse.json({ error: 'Post ID is required for update' }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {
      title: data.title,
      category: data.category,
      author: data.author,
      status: data.status,
      publish_date: data.publish_date,
      excerpt: data.excerpt,
      content: data.content
    };

    if (data.media_url !== undefined) {
      updatePayload.media_url = data.media_url;
    }

    // Remove undefined values
    Object.keys(updatePayload).forEach(key => updatePayload[key] === undefined && delete updatePayload[key]);

    const { data: updatedData, error } = await supabaseAdmin
      .from('posts')
      .update(updatePayload)
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, post: updatedData });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required for deletion' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('posts')
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
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, posts: data });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
