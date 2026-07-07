import { createClient } from '@/utils/supabase/server';
import MarketplaceTemplate from '@/components/MarketplaceTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Netflix Premium | Affordable Subscriptions',
  description: 'Get Netflix premium accounts at the best prices with instant delivery.',
};

const CATEGORIES = [
  { id: 'all', label: 'All', iconName: 'Tv' },
  { id: '1-month', label: '1 Month', iconName: 'Calendar1', keywords: ['1 month', '30 days'] },
  { id: '3-months', label: '3 Months', iconName: 'CalendarDays', keywords: ['3 months', '90 days'] },
  { id: '6-months', label: '6 Months', iconName: 'CalendarRange', keywords: ['6 months'] },
  { id: '1-year', label: '1 Year', iconName: 'Calendar', keywords: ['1 year', '12 months', 'yearly'] },
  { id: 'shared', label: 'Shared', iconName: 'Users', keywords: ['shared', 'profile'] },
  { id: 'private', label: 'Private', iconName: 'Lock', keywords: ['private', 'personal'] },
];

export default async function NetflixPage() {
  const supabase = await createClient();
  
  const { data: netflixData } = await supabase
    .from('netflix_products')
    .select('*')
    .neq('status', 'Inactive')
    .order('order_index', { ascending: true });

  // Map to generic Product interface
  const products = (netflixData || []).map(p => ({
    id: p.id,
    title: `Netflix (${p.account_type})`,
    price: p.price,
    category: 'Netflix Premium',
    media_url: p.media_url,
  }));

  return (
    <MarketplaceTemplate
      title="Netflix Marketplace"
      description="Enjoy endless entertainment with our affordable Netflix Premium subscriptions. Instant delivery, private profiles, and guaranteed uptime."
      bgImageUrl="https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/uploads/ChatGPT%20Image%205%20%D8%AC%D9%88%D9%84%D8%A7%D8%A6%DB%8C%D8%8C%202026%D8%8C%2002_28_29%20AM.png"
      avatarIconUrl="https://img.icons8.com/color/96/netflix-desktop-app.png"
      products={products}
      categories={CATEGORIES}
    />
  );
}
