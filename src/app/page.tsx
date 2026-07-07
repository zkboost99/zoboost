import { createClient } from '@/utils/supabase/server';
import ProductDirectory from '@/components/ProductDirectory';

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch products, posts and homepage cards on server
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .neq('status', 'Inactive')
    .order('created_at', { ascending: false });
    
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: homepageCards } = await supabase
    .from('homepage_cards')
    .select('*')
    .order('order_index', { ascending: true });

  const { data: moneyExchange } = await supabase
    .from('money_exchange')
    .select('*')
    .neq('status', 'Inactive')
    .order('order_index', { ascending: true });

  const { data: netflixProducts } = await supabase
    .from('netflix_products')
    .select('*')
    .neq('status', 'Inactive')
    .order('order_index', { ascending: true });

  return (
    <ProductDirectory 
      products={products || []} 
      posts={posts || []}
      homepageCards={homepageCards || []}
      moneyExchange={moneyExchange || []}
      netflixProducts={netflixProducts || []}
    />
  );
}
