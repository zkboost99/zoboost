import { createClient } from '@/utils/supabase/server';
import ProductDirectory from '@/components/ProductDirectory';

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch products and posts on server
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
    
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <ProductDirectory 
      products={products || []} 
      posts={posts || []} 
    />
  );
}
