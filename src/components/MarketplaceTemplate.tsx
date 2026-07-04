'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import * as LucideIcons from 'lucide-react';
import { Search, ChevronDown, Gamepad2, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Currency {
  code: string;
  symbol: string;
  label: string;
  rate: number;
}

export interface Product {
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
  rating?: number;
}

export interface CategoryDef {
  id: string;
  label: string;
  iconName: string;
  keywords?: string[];
}

interface MarketplaceTemplateProps {
  title: string;
  description: string;
  bgImageUrl?: string;
  avatarIconUrl: string;
  products: Product[];
  categories: CategoryDef[];
}

export default function MarketplaceTemplate({ 
  title, 
  description, 
  bgImageUrl, 
  avatarIconUrl, 
  products, 
  categories 
}: MarketplaceTemplateProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<Currency>({ code: 'USD', symbol: '$', label: 'USD - $', rate: 1 });

  useEffect(() => {
    const stored = localStorage.getItem('selected_currency');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrency(parsed);
      } catch (e) {}
    }

    const currencyChangeHandler = (e: CustomEvent) => {
      setCurrency(e.detail);
    };

    window.addEventListener('currencyChanged' as any, currencyChangeHandler);
    return () => {
      window.removeEventListener('currencyChanged' as any, currencyChangeHandler);
    };
  }, []);

  const formatPrice = (usdPrice: number) => {
    return `${currency.symbol}${(usdPrice * currency.rate).toFixed(2)}`;
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const pTitle = p.title.toLowerCase();
      const pCat = p.category.toLowerCase();
      
      let categoryMatch = false;
      if (activeCategory === 'all') {
        categoryMatch = true;
      } else {
        const selectedCat = categories.find(c => c.id === activeCategory);
        if (selectedCat && selectedCat.keywords && selectedCat.keywords.length > 0) {
          categoryMatch = selectedCat.keywords.some(kw => pTitle.includes(kw) || pCat.includes(kw));
        } else if (selectedCat) {
          categoryMatch = pCat.includes(selectedCat.label.toLowerCase()) || pTitle.includes(selectedCat.label.toLowerCase());
        }
      }

      let searchMatch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        searchMatch = pTitle.includes(query) || pCat.includes(query);
      }

      return categoryMatch && searchMatch;
    });
  }, [products, activeCategory, searchQuery, categories]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    
    categories.forEach(cat => {
      if (cat.id === 'all') return;
      let count = 0;
      if (cat.keywords && cat.keywords.length > 0) {
        count = products.filter(p => {
          const pTitle = p.title.toLowerCase();
          const pCategory = p.category.toLowerCase();
          return cat.keywords!.some(kw => pTitle.includes(kw) || pCategory.includes(kw));
        }).length;
      } else {
        count = products.filter(p => {
          return p.category.toLowerCase().includes(cat.label.toLowerCase()) || p.title.toLowerCase().includes(cat.label.toLowerCase());
        }).length;
      }
      counts[cat.id] = count;
    });
    
    return counts;
  }, [products, categories]);

  return (
    <div className="min-h-screen bg-[#111111] text-neutral-200 font-sans">
      <Header />
      
      {/* Top Banner Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-[300px] z-0 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: bgImageUrl ? `url('${bgImageUrl}')` : 'none', backgroundColor: bgImageUrl ? 'transparent' : '#4252f5' }}
      >
         {/* Dark overlay for readability */}
         <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <main className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        
        {/* Overlapping Hero Card */}
        <div className="bg-[#1c1c1e] rounded-xl shadow-2xl p-6 sm:p-8 mb-8 border border-neutral-800">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Avatar / Icon */}
            <div className="w-24 h-24 rounded-full bg-[#0a0a0b] flex items-center justify-center border-4 border-[#1c1c1e] shadow-inner flex-shrink-0">
               <img src={avatarIconUrl} alt={title} className="w-16 h-16 object-contain" />
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight m-0">{title}</h1>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-neutral-400 mb-4 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Secure</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Instant Delivery</span>
              </div>
              <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          
          {/* Mock Tabs inside the hero card */}
          <div className="mt-8 pt-4 border-t border-neutral-800 flex gap-6">
             <button className="text-white font-bold pb-2 border-b-2 border-[#4252f5] px-1 text-sm">Shop</button>
             <button className="text-neutral-500 font-medium pb-2 border-b-2 border-transparent hover:text-neutral-300 px-1 text-sm transition-colors cursor-not-allowed">Reviews</button>
             <button className="text-neutral-500 font-medium pb-2 border-b-2 border-transparent hover:text-neutral-300 px-1 text-sm transition-colors cursor-not-allowed">About</button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Shop</h2>

        {/* Circular Categories */}
        <div className="flex overflow-x-auto hide-scrollbar gap-6 mb-10 pb-4">
          {categories.map(category => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="flex flex-col items-center gap-3 flex-shrink-0 group outline-none"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#ffc107] shadow-[0_0_15px_rgba(255,193,7,0.3)]' 
                    : 'bg-[#1c1c1e] group-hover:bg-[#2c2c2e]'
                }`}>
                  {(() => {
                    const IconComponent = (LucideIcons as any)[category.iconName] || LucideIcons.HelpCircle;
                    return <IconComponent className={`w-6 h-6 ${isActive ? 'text-black' : 'text-neutral-400'}`} />;
                  })()}
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-[11px] font-bold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                    {category.label}
                  </span>
                  <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    ({categoryCounts[category.id] || 0})
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Search & Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative w-full sm:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-500" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#1c1c1e] border border-neutral-800 rounded-md focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all text-sm font-medium text-white placeholder:text-neutral-500"
            />
          </div>
          <div className="relative w-full sm:w-[200px]">
             <select 
               value={activeCategory}
               onChange={(e) => setActiveCategory(e.target.value)}
               className="w-full appearance-none bg-[#1c1c1e] border border-neutral-800 rounded-md pl-4 pr-10 py-2.5 focus:outline-none focus:border-neutral-600 transition-all text-sm font-medium text-white cursor-pointer"
             >
               {categories.map(c => (
                 <option key={c.id} value={c.id}>{c.label}</option>
               ))}
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-medium mb-4">
          {filteredProducts.length} Items found
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <Link 
                href={`/product/${product.id}`} 
                key={product.id}
                className="group flex flex-col bg-[#1c1c1e] border border-neutral-800 rounded-lg p-4 hover:border-neutral-600 transition-all duration-300"
                style={{ textDecoration: 'none' }}
              >
                {/* Top Row: Icon + Title */}
                <div className="flex items-center gap-2 mb-3">
                  <Gamepad2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white truncate">{product.category}</span>
                </div>

                {/* Middle: Subtitle & Image */}
                <div className="flex justify-between items-start gap-4 mb-4 flex-1">
                  <h3 className="text-sm font-medium text-neutral-300 line-clamp-2 leading-tight flex-1">
                    {product.title}
                  </h3>
                  <div className="w-14 h-14 rounded-md bg-[#0a0a0b] border border-neutral-800 flex items-center justify-center p-1.5 flex-shrink-0 overflow-hidden">
                    <img 
                      src={product.media_url || avatarIconUrl || 'https://img.icons8.com/color/96/discord-logo.png'} 
                      alt={product.title}
                      className="w-full h-full object-contain filter group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>

                {/* Bottom: Seller, Price, Delivery */}
                <div className="flex flex-col gap-2 mt-auto">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-1">
                       <span className="text-[10px] font-bold text-neutral-400">VnHax</span>
                       <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                     </div>
                     <span className="text-[10px] font-medium text-neutral-400">99.4% (39,834)</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white tracking-tight">
                        {formatPrice(product.price)}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Instant</span>
                      </div>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#1c1c1e] border border-neutral-800 rounded-lg">
            <Search className="w-8 h-8 text-neutral-600 mb-4" />
            <h3 className="text-base font-bold text-white mb-2">No products found</h3>
            <p className="text-xs text-neutral-500 max-w-sm">
              Try adjusting your search query or category filters.
            </p>
          </div>
        )}
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
