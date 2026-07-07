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
    const { data, error } = await supabase.from('products').select('*').neq('status', 'Inactive').order('created_at', { ascending: false });
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
    <div className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary pt-16 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center animate-fade-in-up">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider mb-6 transition-colors"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight m-0 drop-shadow-xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {mappedCategory.title}
          </h1>
          <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Explore our premium collection of {mappedCategory.title.toLowerCase()}. Instant delivery and secure transactions guaranteed.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 w-full">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product, idx) => (
              <Link 
                href={`/product/${product.id}`}
                key={product.id} 
                className={`group flex flex-col justify-between bg-card border border-border-subtle rounded-lg p-5 hover:border-amber-400/50 hover:bg-amber-400/5 transition-all cursor-pointer shadow-md shadow-black/20 hover:shadow-amber-400/10 animate-fade-in-up animate-stagger-${Math.min(idx + 1, 8)}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-sm font-bold text-foreground leading-snug pr-4 line-clamp-2 max-w-[75%] group-hover:text-amber-400 transition-colors">
                    {product.title}
                  </h3>
                  <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/5 flex-shrink-0 flex items-center justify-center p-2 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={product.media_url || '/lovable/discord-icon.png'} 
                      alt={product.title} 
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] text-muted-foreground font-semibold uppercase tracking-wider">ZoroBoost</span>
                      <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <span className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">${product.price?.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[11px] text-white font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded-sm">99.9% <span className="text-muted-foreground ml-0.5">(1k+)</span></span>
                    <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-emerald-400 transition-colors">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[12px] font-bold">{product.delivery_time || 'Instant'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border-subtle rounded-lg p-16 flex flex-col items-center justify-center text-center shadow-lg animate-fade-in-up">
            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5">
              <svg className="h-10 w-10 text-amber-400 opacity-50" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No Products Available</h3>
            <p className="text-muted-foreground max-w-md mb-8">
              We are currently out of stock or haven't added any items to this category yet. Please check back later.
            </p>
            <Link 
              href="/" 
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-neutral-900 text-sm font-black uppercase tracking-wider rounded-md shadow-md transition-all hover:-translate-y-0.5"
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
