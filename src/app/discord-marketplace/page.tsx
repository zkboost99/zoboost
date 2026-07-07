import { createClient } from '@/utils/supabase/server';
import MarketplaceTemplate from '@/components/MarketplaceTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discord Marketplace | Premium Accounts, Nitro & Boosts',
  description: 'Discover premium Discord accounts, Nitro subscriptions, server boosts, and exclusive decorations. All in one place, instantly delivered.',
};

const CATEGORIES = [
  { id: 'all', label: 'All', iconName: 'Gamepad2' },
  { id: 'discord-accounts', label: 'Accounts', iconName: 'Users', keywords: ['account', 'acc'] },
  { id: 'discord-nitro', label: 'Nitro', iconName: 'Crown', keywords: ['nitro', 'premium'] },
  { id: 'discord-nitro-basic', label: 'Nitro Basic', iconName: 'Gem', keywords: ['basic'] },
  { id: 'discord-server-boosts', label: 'Server Boosts', iconName: 'Zap', keywords: ['boost', 'server boost'] },
  { id: 'discord-members', label: 'Members', iconName: 'Users', keywords: ['member', 'members'] },
  { id: 'discord-decorations', label: 'Decorations', iconName: 'Sparkles', keywords: ['decor', 'decoration', 'avatar'] },
  { id: 'discord-promo', label: 'Promo', iconName: 'Gift', keywords: ['promo', 'promotion'] },
];

export default async function DiscordMarketplacePage() {
  const supabase = await createClient();
  
  // Fetch products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .neq('status', 'Inactive')
    .order('created_at', { ascending: false });

  // Filter Discord specific products
  const discordProducts = (products || []).filter(p => {
    const title = p.title.toLowerCase();
    const cat = p.category.toLowerCase();
    return title.includes('discord') || cat.includes('discord') || 
           title.includes('nitro') || cat.includes('nitro') ||
           title.includes('server boost') || cat.includes('boost') ||
           title.includes('decorations');
  });

  return (
    <MarketplaceTemplate
      title="Discord Marketplace"
      description="Discover premium Discord accounts, Nitro subscriptions, server boosts, and exclusive decorations. All your Discord needs in one place with instant automated delivery."
      bgImageUrl="https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/uploads/ChatGPT%20Image%205%20%D8%AC%D9%88%D9%84%D8%A7%D8%A6%DB%8C%D8%8C%202026%D8%8C%2002_28_29%20AM.png"
      avatarIconUrl="https://img.icons8.com/color/96/discord-logo.png"
      products={discordProducts}
      categories={CATEGORIES}
    />
  );
}
