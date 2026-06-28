import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')

    if (!query || query.trim() === '') {
      return NextResponse.json({ products: [] })
    }

    const supabase = await createClient()
    const { data: products, error } = await supabase
      .from('products')
      .select('id, title, price, category, media_url')
      .ilike('title', `%${query}%`)
      .eq('status', 'Active')
      .limit(8)

    if (error) throw error
    return NextResponse.json({ products })
  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
