import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Attempt to update is_read column. If it fails (e.g. column doesn't exist), we catch it
    const { data: updatedData, error } = await supabaseAdmin
      .from('orders')
      .update({ is_read: true })
      .eq('id', data.id)
      .select()
      .single();

    if (error) {
      console.warn("Could not update is_read. Ensure column exists:", error);
      // We don't throw to prevent crashing the frontend, just log it.
      return NextResponse.json({ success: false, error: 'Could not update database. Ensure is_read column exists.' });
    }
    
    return NextResponse.json({ success: true, order: updatedData });
  } catch (error: unknown) {
    console.error('API error:', error);
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
