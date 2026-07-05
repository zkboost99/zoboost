'use client';

import Image from 'next/image';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ChevronDown, Bell, MessageSquare, ArrowLeftRight, HelpCircle, Globe, Sun, Moon, Gamepad2, X,
  ShieldCheck, Star, Tv, Rocket, Users, BadgeCheck, Palette, Crown, Gift, Percent, Zap, Wallet, LogOut, User, Menu, Package, Shield, Settings, Activity
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const markAllAsRead = async () => {
    if (!user) return;
    try {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('is_read', false)
        .eq('user_id', user.id);
      
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {}
  };

  const [currencyText, setCurrencyText] = useState('English | USD - $');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [tempCurrencyCode, setTempCurrencyCode] = useState('USD');
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileNav, setExpandedMobileNav] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/profile') {
      const pendingTab = sessionStorage.getItem('pendingProfileTab');
      if (pendingTab) {
        setTimeout(() => {
          const buttons = Array.from(document.querySelectorAll('aside nav button'));
          const targetBtn = buttons.find(b => b.textContent?.includes(pendingTab));
          if (targetBtn) {
             (targetBtn as HTMLButtonElement).click();
          }
          sessionStorage.removeItem('pendingProfileTab');
        }, 100);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { createClient } = await import('@/utils/supabase/client');
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null);
        });
        return () => subscription.unsubscribe();
      } catch (e) {}
    };
    initAuth();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { createClient } = await import('@/utils/supabase/client');
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        let query = supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (session?.user) {
          query = query.or(`user_id.eq.${session.user.id},user_id.is.null`);
        } else {
          query = query.is('user_id', null);
        }

        const { data } = await query;
        if (data) setNotifications(data);
      } catch (err) {}
    };

    fetchNotifications();

    const setupRealtime = async () => {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      const channel = supabase
        .channel('public:notifications')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () => {
          fetchNotifications();
        })
        .subscribe();
      return () => supabase.removeChannel(channel);
    };
    
    let cleanup: any;
    setupRealtime().then(c => cleanup = c);
    return () => { if (cleanup) cleanup(); };
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      await supabase.auth.signOut();
      setIsDropdownOpen(false);
      router.refresh();
    } catch (e) {}
  };

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
        
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground hover:text-amber-400 border-none bg-transparent p-1 cursor-pointer flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/" className="flex shrink-0 items-center" style={{ textDecoration: 'none' }}>
            <Image 
              src="/ZoroBoost Logo.png" 
              alt="ZoroBoost Logo" 
              width={180} 
              height={45} 
              className="h-9 w-auto object-contain transition-colors"
              priority
            />
          </Link>
        </div>

        {/* Central Search Box removed as per user request */}

        {/* Right Nav Controls */}
        <div className="ml-auto flex items-center gap-4 text-muted-foreground">
          
          <button 
            aria-label="Messages" 
            className="relative hover:text-foreground cursor-pointer bg-transparent border-none hidden sm:block"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              if (user) {
                window.dispatchEvent(new Event('toggleLiveChat')); 
              } else {
                setShowLoginModal(true);
              }
            }}
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          
          <div className="relative hidden sm:block" ref={notifRef}>
            <button 
              aria-label="Notifications" 
              className="relative hover:text-foreground cursor-pointer bg-transparent border-none"
              onClick={() => {
                if (user) {
                  setIsNotifOpen(!isNotifOpen);
                } else {
                  setShowLoginModal(true);
                }
              }}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-background">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#1c1c1e] shadow-2xl ring-1 ring-white/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                  <h3 className="text-sm font-bold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors border-none bg-transparent cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-neutral-400">
                      No new notifications.
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!notif.is_read ? 'bg-amber-400/5' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-sm font-bold ${!notif.is_read ? 'text-white' : 'text-neutral-300'}`}>{notif.title}</span>
                            <span className="text-[10px] text-neutral-500 whitespace-nowrap ml-2">{formatTimeAgo(notif.created_at)}</span>
                          </div>
                          <p className={`text-xs ${!notif.is_read ? 'text-neutral-300' : 'text-neutral-400'} line-clamp-2`}>{notif.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-2 border-t border-white/5 bg-white/5">
                  <Link 
                    href="/notifications" 
                    onClick={() => setIsNotifOpen(false)}
                    className="block w-full py-2 text-center text-xs font-bold text-white hover:text-amber-400 transition-colors no-underline"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-border-subtle cursor-pointer p-0 border-none bg-transparent"
              >
                {user.user_metadata?.custom_avatar_url || user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.custom_avatar_url || user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-400 to-amber-500" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-border-subtle overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-border-subtle">
                      <p className="text-sm font-medium text-foreground truncate">{user.user_metadata?.custom_full_name || user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    {[
                      { id: 'overview', label: 'Overview', icon: User },
                      { id: 'orders', label: 'My Orders', icon: Package },
                      { id: 'support', label: 'Support & Chat', icon: MessageSquare },
                      { id: 'notifications', label: 'Notifications', icon: Bell },
                      { id: 'security', label: 'Security', icon: Shield },
                      { id: 'settings', label: 'Account Settings', icon: Settings },
                      { id: 'activity', label: 'Recent Activity', icon: Activity },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          if (pathname === '/profile') {
                            const buttons = Array.from(document.querySelectorAll('aside nav button'));
                            const targetBtn = buttons.find(b => b.textContent?.includes(tab.label));
                            if (targetBtn) {
                               (targetBtn as HTMLButtonElement).click();
                            }
                          } else {
                            sessionStorage.setItem('pendingProfileTab', tab.label);
                            router.push('/profile');
                          }
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer border-none bg-transparent"
                      >
                        <tab.icon className="mr-3 h-4 w-4" />
                        {tab.label}
                      </button>
                    ))}
                    <div className="border-t border-border-subtle my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-muted hover:text-red-500 cursor-pointer border-none bg-transparent"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center justify-center h-8 px-4 text-sm font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-500 rounded-md transition-colors"
              style={{ textDecoration: 'none' }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Category Navigation Sub-bar (Desktop Only) */}
      <div className="hidden md:block bg-header-sub-bg border-t border-border-subtle w-full">
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex h-full items-center gap-1 min-w-max">
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl md:hidden overflow-y-auto transition-all duration-300">
          <div className="flex items-center justify-between p-6 sticky top-0 z-10">
            <Link href="/" className="flex shrink-0 items-center" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <Image 
                src="/ZoroBoost Logo.png" 
                alt="ZoroBoost Logo" 
                width={180} 
                height={45} 
                className="h-8 w-auto object-contain transition-colors"
                priority
              />
            </Link>
            <button 
              className="p-2 -mr-2 text-white/60 hover:text-white transition-colors cursor-pointer bg-transparent border-none rounded-full hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-7 h-7" strokeWidth={1.5} />
            </button>
          </div>

          <div className="px-6 py-2 flex flex-col min-h-[calc(100vh-80px)]">
            <div className="flex flex-col flex-1">
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
                      desc: '',
                      href: `/product/${p.id}`,
                      icon: nav.items[i % nav.items.length].icon,
                      color: nav.items[i % nav.items.length].color,
                      bg: nav.items[i % nav.items.length].bg
                    }));
                  }
                }

                const isExpanded = expandedMobileNav === nav.label;

                return (
                  <div key={nav.label} className="border-b border-white/[0.08] last:border-0">
                    <button 
                      className="w-full flex items-center justify-between py-6 text-white cursor-pointer border-none bg-transparent group"
                      onClick={() => setExpandedMobileNav(isExpanded ? null : nav.label)}
                    >
                      <span className={`text-3xl font-light tracking-wide transition-colors ${isExpanded ? 'text-amber-400' : 'text-white'}`}>
                        {nav.label}
                      </span>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isExpanded ? 'border-amber-400 bg-amber-400/10 text-amber-400 rotate-180' : 'border-white/20 text-white/50'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="flex flex-col gap-2 pl-4 border-l border-white/10 ml-2">
                        {itemsToRender.map((item, idx) => (
                          <Link 
                            key={idx}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-4 py-3 text-white/60 hover:text-amber-400 transition-colors no-underline group/link"
                          >
                            <span className="text-lg font-medium tracking-wide group-hover/link:translate-x-2 transition-transform duration-300">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pb-10 pt-8 mt-auto border-t border-white/[0.08]">
              <div className="flex gap-3 mb-3">
                <button 
                  onClick={() => { 
                    setIsMobileMenuOpen(false); 
                    if (user) {
                      router.push('/notifications');
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 font-semibold text-sm cursor-pointer relative"
                >
                  <Bell className="w-4 h-4 text-emerald-400" /> 
                  Notifications
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5 -mt-1 -mr-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-background">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              </div>
              <div className="flex gap-3 mb-3">
                <button 
                  onClick={() => { 
                    setIsMobileMenuOpen(false); 
                    if (user) {
                      window.dispatchEvent(new CustomEvent('openLiveChat')); 
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 font-semibold text-sm cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" /> Support
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); openCurrencyModal(); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 font-semibold text-sm cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-blue-400" /> Currency
                </button>
              </div>
              <button 
                onClick={() => { toggleTheme(); }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 font-semibold text-sm cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-300" />}
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      )}

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
      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#1b202c] border border-white/5 rounded-[4px] p-6 w-full max-w-[400px] shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-400/20">
              <LogOut className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Login Required</h2>
            <p className="text-sm text-neutral-400 mb-8">
              Please login to your account first to access Live Chat and contact support.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { setShowLoginModal(false); router.push('/login'); }}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold rounded-[4px] transition-colors cursor-pointer border-none"
              >
                Login
              </button>
              <button 
                onClick={() => { setShowLoginModal(false); router.push('/signup'); }}
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-[4px] border border-white/10 transition-colors cursor-pointer"
              >
                Sign Up
              </button>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="w-full py-3 px-4 bg-transparent text-neutral-400 hover:text-white font-medium rounded-[4px] transition-colors cursor-pointer border-none"
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