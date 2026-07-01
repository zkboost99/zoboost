'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, Bell, MessageSquare, ArrowLeftRight, HelpCircle, Globe, Sun, Moon, Gamepad2, X,
  ShieldCheck, Star, Tv, Rocket, Users, BadgeCheck, Palette, Crown, Gift, Percent, Zap, Wallet
} from 'lucide-react';

const navItems = [
  { 
    label: 'Accounts',
    href: '/discord-accounts',
    items: [
      { label: 'Discord Accounts', desc: 'Get game accounts instantly', href: '/discord-accounts', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { label: 'Netflix Premium', desc: '4K Ultra HD private profiles', href: '/netflix', icon: Tv, color: 'text-red-500', bg: 'bg-red-500/10' },
      { label: 'Game Keys', desc: 'Game deals for every platform', href: '/promo', icon: Gamepad2, color: 'text-purple-400', bg: 'bg-purple-400/10' },
      { label: 'Gift Cards', desc: 'Codes for all games and platforms', href: '/promo', icon: Gift, color: 'text-pink-400', bg: 'bg-pink-400/10' }
    ]
  },
  { 
    label: 'Boosting',
    href: '/server-boosts',
    items: [
      { label: 'Server Boosting', desc: 'Rank up fast with pro boosting', href: '/server-boosts', icon: Rocket, color: 'text-amber-400', bg: 'bg-amber-400/10' },
      { label: 'Top Ups', desc: 'Top-up in-game balance instantly', href: '/promo', icon: Wallet, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
      { label: 'Promo Deals', desc: 'Exclusive bundles & flash sales', href: '/promo', icon: Percent, color: 'text-orange-400', bg: 'bg-orange-400/10' }
    ]
  },
  { 
    label: 'Members',
    href: '/server-members',
    items: [
      { label: 'Offline Members', desc: 'High quality offline server members', href: '/server-members', icon: Users, color: 'text-zinc-400', bg: 'bg-zinc-400/10' },
      { label: 'Online Members', desc: 'Active online members for your server', href: '/server-members', icon: Globe, color: 'text-green-400', bg: 'bg-green-400/10' },
      { label: 'Community Growth', desc: 'Massive organic community growth', href: '/server-members', icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
    ]
  },
  { 
    label: 'Nitro',
    href: '/discord-nitro',
    items: [
      { label: 'Discord Nitro (1 Year)', desc: 'Premium 1 year subscription', href: '/discord-nitro', icon: Star, color: 'text-pink-500', bg: 'bg-pink-500/10' },
      { label: 'Discord Nitro (1 Month)', desc: 'Monthly premium subscription', href: '/discord-nitro', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
      { label: 'Nitro Basic', desc: 'Essential discord upgrades', href: '/discord-nitro', icon: BadgeCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' }
    ]
  },
  { 
    label: 'Decorations',
    href: '/decorations',
    items: [
      { label: 'Profile Effects', desc: 'Stand out with animated profile effects', href: '/decorations', icon: Palette, color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10' },
      { label: 'Avatar Decorations', desc: 'Custom borders for your avatar', href: '/decorations', icon: Sun, color: 'text-amber-500', bg: 'bg-amber-500/10' },
      { label: 'Custom Badges', desc: 'Rare and exclusive profile badges', href: '/decorations', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
    ]
  },
];

export default function Header() {
  const [currencyText, setCurrencyText] = useState('English | USD - $');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [tempCurrencyCode, setTempCurrencyCode] = useState('USD');
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { createClient } = await import('@/utils/supabase/client');
        const supabase = createClient();
        const { data } = await supabase.from('products').select('*').limit(50);
        if (data) setDbProducts(data);
      } catch (err) {}
    };
    fetchProducts();
  }, []);

  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD - $', rate: 1 },
    { code: 'EUR', symbol: '€', label: 'EUR - €', rate: 0.92 },
    { code: 'GBP', symbol: '£', label: 'GBP - £', rate: 0.79 },
    { code: 'PKR', symbol: '₨', label: 'PKR - ₨', rate: 278.50 },
    { code: 'AED', symbol: 'د.إ', label: 'AED - د.إ', rate: 3.67 },
    { code: 'SAR', symbol: '﷼', label: 'SAR - ﷼', rate: 3.75 },
  ];

  useEffect(() => {
    const activeTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    setTheme(activeTheme);

    const handleThemeChange = () => {
      setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    window.dispatchEvent(new Event('themeChange'));
  };

  useEffect(() => {
    const stored = localStorage.getItem('selected_currency');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrencyText(`English | ${parsed.code} - ${parsed.symbol}`);
      } catch (e) {}
    }

    const handler = (e: CustomEvent) => {
      const { code, symbol } = e.detail;
      setCurrencyText(`English | ${code} - ${symbol}`);
    };

    window.addEventListener('currencyChanged' as any, handler);
    return () => window.removeEventListener('currencyChanged' as any, handler);
  }, []);

  const openCurrencyModal = () => {
    const stored = localStorage.getItem('selected_currency');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.code) {
          setTempCurrencyCode(parsed.code);
        }
      } catch (e) {}
    }
    setIsCurrencyModalOpen(true);
  };

  const handleCurrencySelect = (curr: any) => {
    localStorage.setItem('selected_currency', JSON.stringify(curr));
    setCurrencyText(`English | ${curr.code} - ${curr.symbol}`);
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: curr }));
    setIsCurrencyModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border-subtle">
      {/* Top Bar */}
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2" style={{ textDecoration: 'none' }}>
          <div className="grid h-9 w-9 place-items-center rounded-md bg-amber-400 text-neutral-900">
            <Gamepad2 className="h-5 w-5" strokeWidth={2.75} />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">ZoroBoost</span>
        </Link>

        {/* Central Search Box removed as per user request */}

        {/* Right Nav Controls */}
        <div className="ml-auto flex items-center gap-4 text-muted-foreground">
          <button 
            aria-label="Swap" 
            className="relative hover:text-foreground cursor-pointer bg-transparent border-none"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'suggestion', rect: e.currentTarget.getBoundingClientRect() } })); }}
          >
            <ArrowLeftRight className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber-400" />
          </button>
          
          <button 
            aria-label="Messages" 
            className="relative hover:text-foreground cursor-pointer bg-transparent border-none"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'report', rect: e.currentTarget.getBoundingClientRect() } })); }}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-neutral-900">
              1
            </span>
          </button>
          
          <button aria-label="Notifications" className="relative hover:text-foreground cursor-pointer bg-transparent border-none">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-neutral-900">
              2
            </span>
          </button>
          
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-rose-400 to-amber-500 ring-2 ring-border-subtle" />
        </div>
      </div>

      {/* Category Navigation Sub-bar */}
      <div className="bg-header-sub-bg border-t border-border-subtle">
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex h-full items-center gap-1">
            {navItems.map((nav) => {
              let itemsToRender = [...nav.items];
              if (dbProducts.length > 0) {
                const matching = dbProducts.filter(p => {
                  const c = (p.category || '').toLowerCase();
                  const t = (p.title || '').toLowerCase();
                  const n = nav.label.toLowerCase();
                  if (n === 'accounts') return c.includes('account') || t.includes('account');
                  if (n === 'boosting') return c.includes('boost') || t.includes('boost');
                  if (n === 'members') return c.includes('member') || t.includes('member');
                  if (n === 'nitro') return c.includes('nitro') || t.includes('nitro');
                  if (n === 'decorations') return c.includes('decoration') || t.includes('decoration');
                  return false;
                });
                if (matching.length > 0) {
                  itemsToRender = matching.map((p, i) => ({
                    label: p.title,
                    desc: p.description?.substring(0, 45) + (p.description?.length > 45 ? '...' : '') || `Premium ${p.category} service`,
                    href: `/product/${p.id}`,
                    icon: nav.items[i % nav.items.length].icon,
                    color: nav.items[i % nav.items.length].color,
                    bg: nav.items[i % nav.items.length].bg
                  }));
                }
              }

              return (
                <div key={nav.label} className="group relative flex h-full items-center">
                  <Link
                    href={nav.href}
                    className="flex h-full shrink-0 items-center gap-1.5 px-3 text-sm font-semibold text-foreground/95 hover:text-amber-400 border-none bg-transparent cursor-pointer transition-colors"
                    style={{ textDecoration: 'none' }}
                  >
                    {nav.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  
                  {/* Mega Dropdown Menu */}
                  <div className="absolute left-0 top-full hidden w-[650px] pt-4 group-hover:block z-50">
                    <div className="rounded-[4px] border border-border-subtle bg-card shadow-2xl overflow-hidden">
                      <div className="grid grid-cols-2 gap-2 p-4">
                        {itemsToRender.map((item, idx) => (
                          <Link 
                            key={idx}
                            href={item.href}
                            className="flex items-center gap-4 rounded-[4px] p-3 hover:bg-foreground/5 transition-colors no-underline group/item"
                          >
                            <div className={`w-10 h-10 rounded-[4px] flex shrink-0 items-center justify-center ${item.bg}`}>
                              <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-foreground mb-0.5 group-hover/item:text-amber-400 transition-colors">
                                {item.label}
                              </h4>
                              <p className="text-[11px] text-muted-foreground leading-snug m-0">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {/* Bottom Bar Guarantees */}
                      <div className="bg-bg-secondary border-t border-border-subtle p-3 flex items-center justify-between px-6">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                          <Zap className="w-3.5 h-3.5 text-blue-400" /> Instant Delivery
                        </div>
                        <div className="w-1 h-1 rounded-full bg-border-subtle" />
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                          <HelpCircle className="w-3.5 h-3.5 text-blue-400" /> 24/7 Support
                        </div>
                        <div className="w-1 h-1 rounded-full bg-border-subtle" />
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Free Warranty
                        </div>
                        <div className="w-1 h-1 rounded-full bg-border-subtle" />
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                          <Star className="w-3.5 h-3.5 text-blue-400" fill="currentColor" /> +1.3M Reviews
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          
          <div className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openLiveChat'))}
              className="flex items-center gap-2 hover:text-foreground border-none bg-transparent cursor-pointer"
            >
              <HelpCircle className="h-4 w-4" />
              24/7 Live Support
            </button>
            <button 
              onClick={openCurrencyModal}
              className="flex items-center gap-2 hover:text-foreground border-none bg-transparent cursor-pointer"
            >
              <Globe className="h-4 w-4" />
              {currencyText}
            </button>
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center p-1.5 rounded-md hover:bg-black/5 text-muted-foreground transition-all cursor-pointer border-none bg-transparent"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-300 hover:text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-neutral-600 hover:text-neutral-800" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Currency Modal */}
      {isCurrencyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setIsCurrencyModalOpen(false)}>
          <div className="bg-[#1b202c] border border-white/5 rounded-[4px] p-6 w-full max-w-[440px] shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-5 right-5 text-muted-foreground hover:text-white transition-colors cursor-pointer bg-transparent border-none" 
              onClick={() => setIsCurrencyModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white m-0">Choose your language and currency</h3>
            </div>

            <div className="space-y-5">
              {/* Language Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Language</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-[#242b3d] border border-white/5 rounded-[4px] px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                    disabled
                  >
                    <option>English (EN)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Currency Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Currency</label>
                <div className="relative">
                  <select 
                    value={tempCurrencyCode}
                    onChange={(e) => setTempCurrencyCode(e.target.value)}
                    className="w-full appearance-none bg-[#242b3d] border border-white/5 rounded-[4px] px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                  >
                    {currencies.map(c => (
                      <option key={c.code} value={c.code}>{c.code} - {c.symbol}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={() => {
                  const selected = currencies.find(c => c.code === tempCurrencyCode) || currencies[0];
                  handleCurrencySelect(selected);
                }}
                className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold py-3 rounded-[4px] transition-colors cursor-pointer border-none"
              >
                Save
              </button>
              <button 
                onClick={() => setIsCurrencyModalOpen(false)}
                className="w-full bg-[#242b3d] hover:bg-[#2d364d] text-white font-bold py-3 rounded-[4px] transition-colors cursor-pointer border border-transparent hover:border-white/5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}