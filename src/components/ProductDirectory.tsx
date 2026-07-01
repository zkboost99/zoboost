'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import SearchBox from './SearchBox';
import AiServicesSection from '@/components/AiServicesSection';
import { 
  Sparkles, 
  Crown, 
  Coins, 
  Tv, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Star,
  Activity,
  Heart,
  User,
  Rocket,
  Users,
  Palette,
  ArrowLeftRight,
  Gamepad2
} from 'lucide-react';

interface Currency {
  code: string;
  symbol: string;
  label: string;
  rate: number;
}

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  delivery_method?: string;
  delivery_time?: string;
  status?: string;
  media_url?: string;
  discount_value?: number;
  discount_type?: string;
}

interface Post {
  id: string;
  title: string;
  created_at: string;
  media_url?: string;
  slug?: string;
}

interface ProductDirectoryProps {
  products: Product[];
  posts: Post[];
  homepageCards: any[];
  moneyExchange: any[];
  netflixProducts: any[];
}

export default function ProductDirectory({ 
  products, 
  posts, 
  homepageCards, 
  moneyExchange, 
  netflixProducts 
}: ProductDirectoryProps) {
  // Define 7 mockup category slots exactly matching mockup
  const categorySlots = [
    { id: 'discord-accounts', label: 'Accounts', icon: 'https://img.icons8.com/plumpy/24/people-skin-type-7.png' },
    { id: 'server-boosts', label: 'Boosting', icon: 'https://img.icons8.com/plumpy/24/launched-rocket.png' },
    { id: 'server-members', label: 'Members', icon: 'https://img.icons8.com/plumpy/24/crowd.png' },
    { id: 'discord-nitro', label: 'Nitro', icon: 'https://img.icons8.com/plumpy/24/gas.png' },
    { id: 'decorations', label: 'Decorations', icon: 'https://img.icons8.com/plumpy/24/christmas-bulb--v1.png' },
    { id: 'netflix', label: 'Netflix', icon: 'https://img.icons8.com/plumpy/24/netflix.png' },
    { id: 'money-exchange', label: 'Exchange', icon: 'https://img.icons8.com/plumpy/24/currency-exchange.png' },
  ];

  const [activeSlotId, setActiveSlotId] = useState<string>('discord-accounts');
  const [activeHomepageCardId, setActiveHomepageCardId] = useState<string | undefined>(undefined);
  const [currency, setCurrency] = useState<Currency>({ code: 'USD', symbol: '$', label: 'USD - $', rate: 1 });
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('selected_currency');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrency(parsed);
      } catch (e) {}
    }

    const openModalHandler = () => {
      setIsCurrencyModalOpen(true);
    };

    const currencyChangeHandler = (e: CustomEvent) => {
      setCurrency(e.detail);
    };

    const handleChatState = (e: any) => {
      if (e.detail) {
        setChatOpen(e.detail.isOpen);
      }
    };

    const handleHomepageCardIdChange = (e: any) => {
      setActiveHomepageCardId(e.detail);
    };

    window.addEventListener('openCurrencyModal', openModalHandler);
    window.addEventListener('currencyChanged' as any, currencyChangeHandler);
    window.addEventListener('liveChatStateChanged' as any, handleChatState);
    window.addEventListener('setHomepageCardId' as any, handleHomepageCardIdChange);

    return () => {
      window.removeEventListener('openCurrencyModal', openModalHandler);
      window.removeEventListener('currencyChanged' as any, currencyChangeHandler);
      window.removeEventListener('liveChatStateChanged' as any, handleChatState);
      window.removeEventListener('setHomepageCardId' as any, handleHomepageCardIdChange);
    };
  }, []);

  const formatPrice = (usdPrice: number) => {
    return `${currency.symbol}${(usdPrice * currency.rate).toFixed(2)}`;
  };


  // Filter products based on active category slot
  const getFilteredItems = () => {
    if (activeSlotId === 'netflix') {
      return netflixProducts.map(p => ({
        id: p.id,
        title: `Netflix (${p.account_type})`,
        category: 'Netflix Premium',
        price: p.price,
        media_url: p.media_url,
        linkUrl: '#'
      }));
    }
    if (activeSlotId === 'money-exchange') {
      return moneyExchange.map(offer => ({
        id: offer.id,
        title: `${offer.giving_currency} ➔ ${offer.getting_currency}`,
        category: `Rate: ${offer.exchange_rate}`,
        price: parseFloat(offer.reserve_stock.replace(/[^0-9.]/g, '')) || 0,
        media_url: offer.media_url,
        linkUrl: '#'
      }));
    }

    return products.filter(p => {
      const cat = p.category.toLowerCase();
      const title = p.title.toLowerCase();
      
      if (activeSlotId === 'discord-accounts') {
        return cat.includes('account') || cat.includes('acc') || title.includes('account');
      }
      if (activeSlotId === 'server-boosts') {
        return cat.includes('boost') || title.includes('boost');
      }
      if (activeSlotId === 'server-members') {
        return cat.includes('member') || title.includes('member');
      }
      if (activeSlotId === 'discord-nitro') {
        return cat.includes('nitro') || title.includes('nitro');
      }
      if (activeSlotId === 'decorations') {
        return cat.includes('decor') || cat.includes('avatar') || cat.includes('profile') || title.includes('decoration');
      }
      return false;
    }).map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      price: p.price,
      media_url: p.media_url,
      linkUrl: `/product/${p.id}`
    }));
  };

  const filteredListings = getFilteredItems();

  // Get Top Row (4 Vertical/Square Cards)
  const topRowListings = filteredListings.slice(0, 4);

  // If we have fewer than 4 items, backfill with default items so layout looks gorgeous
  const defaultAccounts = products.slice(0, 4).map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    media_url: p.media_url,
    linkUrl: `/product/${p.id}`
  }));

  const displayListings = topRowListings.length > 0 ? topRowListings : defaultAccounts;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />

      {/* Hero Section (Mockup 1 Style) */}
      <section className="relative pt-20 pb-16 px-4 z-10 max-w-[1200px] mx-auto text-center flex flex-col items-center">
        
        {/* Title */}
        <h1 
          className="text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight m-0 max-w-4xl drop-shadow-xl animate-fade-in-up animate-stagger-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          One Platform. Endless
          <br />
          Digital Services.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-[10px] sm:text-sm font-normal text-muted-foreground uppercase tracking-widest px-2 animate-fade-in-up animate-stagger-2">
          Premium Accounts • Digital Services • Secure Exchanges • Instant Delivery
        </p>

        {/* Centered Large Rounded Search Bar */}
        <div className="mt-8 w-full max-w-2xl px-2 relative z-20 mx-auto animate-fade-in-up animate-stagger-3">
          <SearchBox placeholder="Search for games, services or keys..." />
        </div>

        {/* Category Slots (Eldorado alignment style: rounded dark icon box with label underneath) */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-6 sm:gap-6 max-w-4xl px-2 z-10 mx-auto">
          {categorySlots.map((slot, index) => {
            const staggerDelayClass = `animate-stagger-${Math.min(index + 4, 8)}`;
            return (
              <Link
                key={slot.id}
                href={`/${slot.id}`}
                className={`flex flex-col items-center gap-2 group cursor-pointer w-[calc(25%-6px)] sm:w-auto animate-fade-in-up ${staggerDelayClass}`}
                style={{ textDecoration: 'none' }}
              >
                {/* Icon box container */}
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center border transition-all duration-300 shadow-md group-hover:scale-105 bg-card border-border-subtle group-hover:border-amber-400 group-hover:bg-amber-400/5"
                >
                  <img 
                    src={slot.icon} 
                    alt="" 
                    className="category-slot-icon w-6 h-6 object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity" 
                  />
                </div>
                {/* Label text underneath */}
                <span 
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors text-muted-foreground group-hover:text-foreground"
                >
                  {slot.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Content (2-Column Lists Style) */}
      <main className="relative z-10 mx-auto max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8">
        
        {/* Popular Items - Homepage Cards Tabs */}
        <div className="pt-8 mb-8 text-center animate-fade-in-up animate-stagger-4">
          <h2 
            className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight m-0 uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Browse Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left mb-8">
          {homepageCards && homepageCards.map((card, idx) => {
            const isActive = (typeof activeHomepageCardId !== 'undefined' ? activeHomepageCardId : homepageCards?.[0]?.id) === card.id;
            return (
              <div
                key={card.id}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('setHomepageCardId', { detail: card.id }));
                  }
                }}
                className={`relative rounded-md p-4 border transition-all cursor-pointer overflow-hidden animate-fade-in-up animate-stagger-${Math.min(idx + 4, 8)} ${
                  isActive 
                    ? 'border-amber-400 bg-amber-400/5 shadow-md shadow-amber-400/5' 
                    : 'bg-card border-border-subtle hover:border-neutral-400/50 hover:bg-black/5'
                }`}
              >
                {/* Background glow for active */}
                {isActive && <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 blur-2xl rounded-full pointer-events-none" />}
                
                <div className="flex items-start justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded flex items-center justify-center shadow-sm ${
                      card.icon_type === 'discord' ? 'bg-[#5865F2]' : 
                      card.icon_type === 'money' ? 'bg-emerald-500' : 
                      card.icon_type === 'netflix' ? 'bg-[#E50914]' : 
                      'bg-pink-500'
                    }`}>
                      <img 
                        src={
                          card.icon_type === 'discord' ? 'https://img.icons8.com/plumpy/24/discord-logo.png' : 
                          card.icon_type === 'netflix' ? 'https://img.icons8.com/plumpy/24/netflix.png' : 
                          card.icon_type === 'money' ? 'https://img.icons8.com/plumpy/24/currency-exchange.png' : 
                          'https://img.icons8.com/plumpy/24/coming-soon.png'
                        } 
                        onError={(e) => e.currentTarget.style.display='none'} 
                        alt="" 
                        className="w-5 h-5 brightness-0 invert" 
                      />
                    </div>
                    <span className="font-bold text-foreground text-sm">{card.brand_name}</span>
                  </div>
                  <span className="bg-secondary border border-border-subtle px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider text-foreground whitespace-nowrap">
                    {card.category_tag}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium truncate relative z-10">{card.title}</p>
                <div className="mt-3 flex items-end justify-between relative z-10">
                  <span className="font-bold text-sm text-foreground">{card.price_text}</span>
                  {isActive && <span className="bg-amber-400 text-neutral-900 px-2 py-0.5 rounded text-[9px] font-black uppercase">Active</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up animate-stagger-6">
          
          {/* Left Column */}
          <div className="bg-card border border-border-subtle rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-lg font-extrabold text-foreground tracking-tight m-0">
              {(() => {
                const currentId = typeof activeHomepageCardId !== 'undefined' ? activeHomepageCardId : homepageCards?.[0]?.id;
                const activeCard = homepageCards?.find(c => c.id === currentId);
                const type = activeCard?.icon_type || 'discord';
                if (type === 'discord') return 'Popular Boosting Services';
                if (type === 'money') return 'Live Exchange Rates';
                if (type === 'netflix') return 'Netflix Premium Accounts';
                return 'Popular Services';
              })()}
            </h2>
            <div className="flex flex-col gap-1">
              {(() => {
                const currentId = typeof activeHomepageCardId !== 'undefined' ? activeHomepageCardId : homepageCards?.[0]?.id;
                const activeCard = homepageCards?.find(c => c.id === currentId);
                const type = activeCard?.icon_type || 'discord';
                let items: any[] = [];
                
                if (type === 'discord') items = products.filter(p => p.category.toLowerCase().includes('boost')).slice(0, 4);
                else if (type === 'money') items = moneyExchange.slice(0, 4).map(ex => ({ id: ex.id, title: `${ex.giving_currency} ➔ ${ex.getting_currency}`, category: `Rate: ${ex.exchange_rate}`, price: parseFloat(ex.reserve_stock) || 0 }));
                else if (type === 'netflix') items = netflixProducts.slice(0, 4).map(n => ({ id: n.id, title: `Netflix (${n.account_type})`, category: 'Premium Streaming', price: n.price }));
                else items = products.slice(0, 4);

                return items.map((p) => (
                  <Link href={`/product/${p.id}`} key={p.id} className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5 text-decoration-none" style={{ textDecoration: 'none' }}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-bg-secondary flex-shrink-0 flex items-center justify-center p-1.5 border border-white/5">
                        <img src={p.media_url || '/assets/img/blog/1.jpg'} alt="" className="w-full h-full object-contain filter group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-foreground truncate group-hover:text-amber-400 transition-colors">{p.title}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground mt-0.5 truncate">{p.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0 pl-2">
                      <span className="text-sm font-black text-foreground">{formatPrice(p.price || 0)}</span>
                      {p.discount_value && p.discount_type && (
                        <span className="text-[10px] text-muted-foreground line-through">{formatPrice((p.price || 0) + p.discount_value)}</span>
                      )}
                    </div>
                  </Link>
                ));
              })()}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-card border border-border-subtle rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-lg font-extrabold text-foreground tracking-tight m-0">
              {(() => {
                const currentId = typeof activeHomepageCardId !== 'undefined' ? activeHomepageCardId : homepageCards?.[0]?.id;
                const activeCard = homepageCards?.find(c => c.id === currentId);
                const type = activeCard?.icon_type || 'discord';
                if (type === 'discord') return 'Popular Items';
                if (type === 'money') return 'Top Reserves';
                if (type === 'netflix') return 'Available Addons';
                return 'Featured Content';
              })()}
            </h2>
            <div className="flex flex-col gap-1">
              {(() => {
                const currentId = typeof activeHomepageCardId !== 'undefined' ? activeHomepageCardId : homepageCards?.[0]?.id;
                const activeCard = homepageCards?.find(c => c.id === currentId);
                const type = activeCard?.icon_type || 'discord';
                let items: any[] = [];
                
                if (type === 'discord') items = products.filter(p => !p.category.toLowerCase().includes('boost')).slice(0, 4);
                else if (type === 'money') items = moneyExchange.slice(4, 8).map(ex => ({ id: ex.id, title: `${ex.giving_currency} ➔ ${ex.getting_currency}`, category: `Rate: ${ex.exchange_rate}`, price: parseFloat(ex.reserve_stock) || 0 }));
                else if (type === 'netflix') items = [];
                else items = products.slice(4, 8);

                if (items.length === 0) return <div className="text-sm text-muted-foreground py-4 text-center">No items available.</div>;

                return items.map((p) => (
                  <Link href={`/product/${p.id}`} key={p.id} className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5 text-decoration-none" style={{ textDecoration: 'none' }}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-bg-secondary flex-shrink-0 flex items-center justify-center p-1.5 border border-white/5">
                        <img src={p.media_url || '/assets/img/blog/1.jpg'} alt="" className="w-full h-full object-contain filter group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-foreground truncate group-hover:text-amber-400 transition-colors">{p.title}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground mt-0.5 truncate">{p.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0 pl-2">
                      <span className="text-sm font-black text-foreground">{formatPrice(p.price || 0)}</span>
                      {p.discount_value && p.discount_type && (
                        <span className="text-[10px] text-muted-foreground line-through">{formatPrice((p.price || 0) + p.discount_value)}</span>
                      )}
                    </div>
                  </Link>
                ));
              })()}
            </div>
          </div>

        </div>

      </main>

      {/* Floating Chat Trigger */}
      <button
        aria-label="Toggle chat"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.dispatchEvent(new CustomEvent('toggleLiveChat')); }}
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full text-white shadow-lg border-none cursor-pointer hover:scale-105 transition-transform"
        style={{ background: 'linear-gradient(135deg,#d97706,#f59e0b)', boxShadow: '0 4px 18px rgba(217,119,6,0.45)' }}
      >
        {chatOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* AI Services Section */}
      <AiServicesSection />

      {/* Footer */}
      <Footer />

    </div>
  );
}
