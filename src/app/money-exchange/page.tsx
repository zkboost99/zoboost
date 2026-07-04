import { createClient } from '@/utils/supabase/server';
import MarketplaceTemplate from '@/components/MarketplaceTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Money Exchange | Secure & Fast Transfers',
  description: 'Exchange money instantly between different currencies and platforms with the best rates.',
};

const CATEGORIES = [
  { id: 'all', label: 'All', iconName: 'Landmark' },
  { id: 'crypto', label: 'Crypto', iconName: 'Bitcoin', keywords: ['crypto', 'btc', 'usdt', 'eth'] },
  { id: 'fiat', label: 'Fiat', iconName: 'DollarSign', keywords: ['usd', 'eur', 'fiat', 'paypal', 'bank'] },
  { id: 'wallets', label: 'Wallets', iconName: 'Wallet', keywords: ['wallet', 'skrill', 'payeer', 'perfect money'] },
];

export default async function MoneyExchangePage() {
  const supabase = await createClient();
  
  // Fetch money exchange offers
  const { data: offers } = await supabase
    .from('money_exchange')
    .select('*')
    .order('order_index', { ascending: true });

  // Map to generic Product interface
  const products = (offers || []).map(offer => ({
    id: offer.id,
    title: `${offer.giving_currency} ➔ ${offer.getting_currency}`,
    price: parseFloat(offer.reserve_stock.replace(/[^0-9.]/g, '')) || 0,
    category: `Rate: ${offer.exchange_rate}`,
    media_url: offer.media_url,
  }));

  return (
    <MarketplaceTemplate
      title="Money Exchange"
      description="Exchange your funds instantly with the best market rates. Secure, automated, and reliable transfers between top payment platforms and cryptocurrencies."
      bgImageUrl="https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/uploads/ChatGPT%20Image%205%20%D8%AC%D9%88%D9%84%D8%A7%D8%A6%DB%8C%D8%8C%202026%D8%8C%2002_28_29%20AM.png"
      avatarIconUrl="https://img.icons8.com/color/96/currency-exchange.png"
      products={products}
      categories={CATEGORIES}
    />
  );
}
