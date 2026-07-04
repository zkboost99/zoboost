import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ProductDetailsClient from './ProductDetailsClient';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  let finalProduct: any = null;
  let categoryName = '';
  
  // 1. Check products table
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (product) {
    finalProduct = product;
    categoryName = product.category;
  } else {
    // 2. Check netflix_products
    const { data: netflixProduct } = await supabase
      .from('netflix_products')
      .select('*')
      .eq('id', id)
      .single();
      
    if (netflixProduct) {
      finalProduct = {
        id: netflixProduct.id,
        title: `Netflix (${netflixProduct.account_type})`,
        category: 'Netflix Premium',
        price: netflixProduct.price,
        media_url: netflixProduct.media_url,
        description: netflixProduct.description || 'Premium Netflix Account',
        delivery_method: 'Automatic',
        delivery_time: 'Instant',
        status: 'Active'
      };
      categoryName = 'Netflix Premium';
    } else {
      // 3. Check money_exchange
      const { data: exchangeProduct } = await supabase
        .from('money_exchange')
        .select('*')
        .eq('id', id)
        .single();
        
      if (exchangeProduct) {
        finalProduct = {
          id: exchangeProduct.id,
          title: `${exchangeProduct.giving_currency} ➔ ${exchangeProduct.getting_currency}`,
          category: `Rate: ${exchangeProduct.exchange_rate}`,
          price: parseFloat(String(exchangeProduct.reserve_stock).replace(/[^0-9.]/g, '')) || 0,
          media_url: exchangeProduct.media_url,
          description: `Exchange ${exchangeProduct.giving_currency} to ${exchangeProduct.getting_currency}`,
          delivery_method: 'Manual',
          delivery_time: 'Fast',
          status: 'Active'
        };
        categoryName = `Rate: ${exchangeProduct.exchange_rate}`;
      }
    }
  }

  if (!finalProduct) {
    notFound();
  }

  // Fetch related products based on category name
  let relatedProducts: any[] = [];
  
  if (categoryName) {
    const { data: related } = await supabase
      .from('products')
      .select('*')
      .eq('category', categoryName)
      .neq('id', id)
      .limit(4);
      
    if (related && related.length > 0) {
      relatedProducts = related;
    } else if (categoryName === 'Netflix Premium') {
      const { data: netflixRelated } = await supabase
        .from('netflix_products')
        .select('*')
        .neq('id', id)
        .limit(4);
      if (netflixRelated) {
        relatedProducts = netflixRelated.map((n: any) => ({
          id: n.id,
          title: `Netflix (${n.account_type})`,
          category: 'Netflix Premium',
          price: n.price,
          media_url: n.media_url,
          description: n.description || 'Premium Netflix Account',
          delivery_method: 'Automatic',
          delivery_time: 'Instant',
          status: 'Active'
        }));
      }
    } else if (categoryName.startsWith('Rate:')) {
      const { data: exchangeRelated } = await supabase
        .from('money_exchange')
        .select('*')
        .neq('id', id)
        .limit(4);
      if (exchangeRelated) {
        relatedProducts = exchangeRelated.map((ex: any) => ({
          id: ex.id,
          title: `${ex.giving_currency} ➔ ${ex.getting_currency}`,
          category: `Rate: ${ex.exchange_rate}`,
          price: parseFloat(String(ex.reserve_stock).replace(/[^0-9.]/g, '')) || 0,
          media_url: ex.media_url,
          description: `Exchange ${ex.giving_currency} to ${ex.getting_currency}`,
          delivery_method: 'Manual',
          delivery_time: 'Fast',
          status: 'Active'
        }));
      }
    }
  }

  return (
    <ProductDetailsClient 
      product={finalProduct} 
      relatedProducts={relatedProducts} 
    />
  );
}
