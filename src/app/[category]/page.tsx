import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

const categorySlugMap: Record<string, { title: string; match: (cat: string, title: string) => boolean; table?: string }> = {
  'discord-accounts': {
    title: 'Discord Accounts',
    match: (c, t) => c.includes('account') || c.includes('acc') || t.includes('account')
  },
  'server-boosts': {
    title: 'Server Boosts',
    match: (c, t) => c.includes('boost') || t.includes('boost')
  },
  'server-members': {
    title: 'Server Members',
    match: (c, t) => c.includes('member') || t.includes('member')
  },
  'discord-nitro': {
    title: 'Discord Nitro',
    match: (c, t) => c.includes('nitro') || t.includes('nitro')
  },
  'decorations': {
    title: 'Decorations',
    match: (c, t) => c.includes('decor') || c.includes('avatar') || c.includes('profile') || t.includes('decoration')
  },
  'netflix': {
    title: 'Netflix',
    match: () => true,
    table: 'netflix_products'
  },
  'money-exchange': {
    title: 'Money Exchange',
    match: () => true,
    table: 'money_exchange'
  },
  // Legacy mappings for backwards compatibility
  'aged-accounts': {
    title: 'Aged Accounts',
    match: (c, t) => c.includes('aged') && c.includes('account')
  },
  'nitro-boost': {
    title: 'Nitro Boost',
    match: (c, t) => c.includes('nitro') && c.includes('boost')
  },
  'promo': {
    title: 'Promotions',
    match: (c, t) => c.includes('promo')
  },
  'nitro-accounts': {
    title: 'Nitro Accounts',
    match: (c, t) => c.includes('nitro') && c.includes('account')
  },
  'nitro-basic': {
    title: 'Nitro Basic',
    match: (c, t) => c.includes('nitro') && c.includes('basic')
  }
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const mappedCategory = categorySlugMap[category];

  if (!mappedCategory) {
    notFound();
  }

  const supabase = await createClient();
  let products: any[] = [];

  if (mappedCategory.table === 'netflix_products') {
    const { data } = await supabase.from('netflix_products').select('*').order('created_at', { ascending: false });
    if (data) {
      products = data.map((n: any) => ({
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
  } else if (mappedCategory.table === 'money_exchange') {
    const { data } = await supabase.from('money_exchange').select('*').order('created_at', { ascending: false });
    if (data) {
      products = data.map((ex: any) => ({
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
  } else {
    // Fetch all regular products
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching products:', error);
    }
    if (data) {
      products = data.filter((p: any) => {
        const cat = (p.category || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        return mappedCategory.match(cat, title);
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white antialiased font-sans flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-[#1d2736] bg-[#0f141d] pt-12 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider mb-6 transition-colors"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight m-0 drop-shadow-lg">
            {mappedCategory.title}
          </h1>
          <p className="mt-4 text-sm text-[#8a9bb4] max-w-2xl">
            Explore our premium collection of {mappedCategory.title.toLowerCase()}. Instant delivery and secure transactions guaranteed.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 w-full">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link 
                href={`/product/${product.id}`}
                key={product.id} 
                className="group flex flex-col justify-between bg-[#19202e] border border-[#222f44] rounded-sm p-4 hover:border-amber-400/50 transition-all cursor-pointer shadow-sm"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-sm font-medium text-[#dcdde1] leading-snug pr-4 line-clamp-2 max-w-[75%]">
                    {product.title}
                  </h3>
                  <div className="w-10 h-10 rounded-md bg-black flex-shrink-0 flex items-center justify-center p-1.5 shadow-inner">
                    <img 
                      src={product.media_url || '/lovable/discord-icon.png'} 
                      alt={product.title} 
                      className="w-full h-full object-contain filter group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[13px] text-[#a4b1cd] font-medium">ZoroBoost</span>
                      <svg className="w-3.5 h-3.5 text-[#00c853]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <span className="text-[17px] font-extrabold text-white">${product.price?.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[13px] text-white font-medium tracking-wide">99.9% <span className="text-[#a4b1cd]">(1k+)</span></span>
                    <div className="flex items-center gap-1.5 text-[#a4b1cd]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-[12px]">{product.delivery_time || 'Instant'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#19202e] border border-[#222f44] rounded-sm p-16 flex flex-col items-center justify-center text-center shadow-lg">
            <div className="w-20 h-20 bg-[#131924] rounded-full flex items-center justify-center mb-6">
              <svg className="h-10 w-10 text-amber-400 opacity-50" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Products Available</h3>
            <p className="text-[#8a9bb4] max-w-md mb-8">
              We are currently out of stock or haven't added any items to this category yet. Please check back later.
            </p>
            <Link 
              href="/" 
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-neutral-900 text-sm font-bold rounded shadow-md transition-colors"
              style={{ textDecoration: 'none' }}
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
