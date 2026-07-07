import { createClient } from '@/utils/supabase/server';
import MarketplaceTemplate from '@/components/MarketplaceTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Ups | Game Credits & Subscriptions',
  description: 'Fast and secure top-ups for your favorite games and digital services.',
};

const CATEGORIES = [
  { id: 'all', label: 'All', iconName: 'Gamepad2' },
  { id: 'games', label: 'Games', iconName: 'Swords', keywords: ['game', 'uc', 'diamonds', 'vp'] },
  { id: 'apps', label: 'Apps', iconName: 'Smartphone', keywords: ['app', 'subscription'] },
  { id: 'gift-cards', label: 'Gift Cards', iconName: 'Gift', keywords: ['gift card', 'code', 'voucher'] },
];

export default async function TopUpsPage() {
  const supabase = await createClient();
  
  // Fetch products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .neq('status', 'Inactive')
    .order('created_at', { ascending: false });

  // Filter top-up specific products
  const topUpProducts = (products || []).filter(p => {
    const title = p.title.toLowerCase();
    const cat = p.category.toLowerCase();
    return title.includes('top up') || cat.includes('top up') || 
           title.includes('uc') || cat.includes('diamonds') || 
           title.includes('gift card') || title.includes('game');
  });

  return (
    <MarketplaceTemplate
      title="Top Ups & Gift Cards"
      description="Get instant top-ups for your favorite games, apps, and services. Secure transactions with immediate automated delivery."
      bgImageUrl="https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/uploads/ChatGPT%20Image%205%20%D8%AC%D9%88%D9%84%D8%A7%D8%A6%DB%8C%D8%8C%202026%D8%8C%2002_28_29%20AM.png"
      avatarIconUrl="https://img.icons8.com/color/96/controller.png"
      products={topUpProducts}
      categories={CATEGORIES}
    />
  );
}
