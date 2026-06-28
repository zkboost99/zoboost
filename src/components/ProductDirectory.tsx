'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Crown,
  Target,
  Swords,
  Shield,
  Joystick,
  Star,
  Ghost,
  Flame,
  Trophy,
  Dice5,
  Coins,
  Rocket,
  Gamepad2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
}

type Entry = { label: string; icon: LucideIcon; tint: string; category: string };

const popularAccounts: Entry[] = [
  { label: '2015 Aged Accounts', icon: Crown, tint: 'bg-orange-500', category: 'aged-accounts' },
  { label: '2016 Aged Accounts', icon: Target, tint: 'bg-emerald-700', category: 'aged-accounts' },
  { label: '2018 Aged Accounts', icon: Swords, tint: 'bg-rose-500', category: 'aged-accounts' },
  { label: 'Full Access Accounts', icon: Shield, tint: 'bg-neutral-800', category: 'aged-accounts' },
  { label: 'Verified Accounts', icon: Joystick, tint: 'bg-sky-500', category: 'aged-accounts' },
  { label: 'Nitro Accounts', icon: Star, tint: 'bg-indigo-600', category: 'nitro-accounts' }
];

const popularCurrencies: Entry[] = [
  { label: '14x Server Boosts', icon: Dice5, tint: 'bg-emerald-600', category: 'server-boosts' },
  { label: '7x Server Boosts', icon: Coins, tint: 'bg-stone-700', category: 'server-boosts' },
  { label: 'Level 3 Boosts', icon: Coins, tint: 'bg-yellow-600', category: 'server-boosts' },
  { label: 'Level 2 Boosts', icon: Coins, tint: 'bg-sky-500', category: 'server-boosts' }
];

const popularBoosting: Entry[] = [
  { label: '1000 Server Members', icon: Rocket, tint: 'bg-neutral-900', category: 'server-members' },
  { label: '500 Server Members', icon: Sparkles, tint: 'bg-cyan-500', category: 'server-members' },
  { label: 'Online Members', icon: Trophy, tint: 'bg-emerald-600', category: 'server-members' },
  { label: 'Offline Members', icon: Gamepad2, tint: 'bg-blue-700', category: 'server-members' }
];

const popularItems: Entry[] = [
  { label: 'Profile Decorations', icon: Sparkles, tint: 'bg-lime-500', category: 'decoration' },
  { label: 'Custom Status Badges', icon: Ghost, tint: 'bg-pink-300', category: 'decoration' }
];

export default function ProductDirectory({ products, posts }: ProductDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter products based on selected category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Dynamic 4 items from products to display in the RecentlyViewed list
  const recentProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-neutral-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-600 via-sky-500 to-sky-400" />
        {/* Clouds */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-[60%]">
          <div className="absolute left-[8%] h-32 w-72 rounded-full bg-sky-300/70 blur-md" />
          <div className="absolute left-[35%] h-40 w-96 rounded-full bg-sky-300/70 blur-md" />
          <div className="absolute right-[10%] h-36 w-80 rounded-full bg-sky-300/70 blur-md" />
        </div>
        {/* Stars */}
        <Sparkles className="absolute left-[42%] top-16 h-5 w-5 text-white/90" />
        <Sparkles className="absolute right-[8%] top-10 h-4 w-4 text-white/80" />
        <Sparkles className="absolute right-[28%] top-40 h-3 w-3 text-white/80" />
        <Sparkles className="absolute left-[55%] top-44 h-3 w-3 text-white/70" />

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-b from-emerald-500 to-emerald-700" />
        {/* Red road */}
        <div 
          className="absolute bottom-0 left-1/2 h-[45%] w-[70%] -translate-x-[35%] bg-gradient-to-b from-red-700 via-red-800 to-red-900" 
          style={{ clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)' }}
        />

        <div className="relative mx-auto flex min-h-[460px] max-w-[1400px] items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-md sm:text-6xl" style={{ color: '#ffffff' }}>
              Complete your
              <br />
              Discord set
            </h1>
            <p className="mt-5 text-base font-medium text-white/95">
              The safest player-to-player Discord services marketplace
            </p>
            <button 
              onClick={() => {
                const el = document.getElementById('listings');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-amber-400 px-12 py-3.5 text-sm font-bold text-neutral-900 shadow-md transition hover:bg-amber-300 border-none cursor-pointer"
            >
              Shop Now
            </button>
          </div>

          {/* Voxel characters on right */}
          <div className="absolute bottom-12 right-[4%] hidden items-end gap-1 md:flex">
            <VoxelChar color="bg-stone-300" hat="bg-cyan-500" size="h-28 w-20" />
            <VoxelChar color="bg-amber-500" hat="bg-orange-600" size="h-32 w-20" />
            <VoxelChar color="bg-lime-500" hat="bg-yellow-300" size="h-40 w-24" />
            <VoxelChar color="bg-neutral-500" hat="bg-neutral-700" size="h-44 w-24" />
            <VoxelChar color="bg-sky-500" hat="bg-blue-700" size="h-28 w-20" />
            <VoxelChar color="bg-red-600" hat="bg-red-800" size="h-52 w-28" />
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-8">
        
        {/* Recently Viewed / Popular Deals */}
        <section className="-mt-2 pt-8">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white m-0">
              Popular Deals
              <HelpCircle className="h-4 w-4 text-neutral-400" />
            </h2>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous"
                className="grid h-9 w-9 place-items-center rounded-md bg-[#1c1c1f] text-neutral-300 hover:bg-[#26262a] border-none cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next"
                className="grid h-9 w-9 place-items-center rounded-md bg-[#1c1c1f] text-neutral-300 hover:bg-[#26262a] border-none cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ listStyle: 'none', padding: 0 }}>
            {recentProducts.map((r) => (
              <li
                key={r.id}
                className="rounded-xl bg-[#1c1c1f] p-4 ring-1 ring-white/5 transition hover:ring-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-md bg-indigo-500 text-xs font-bold text-white">
                      ZB
                    </div>
                    <span className="text-sm font-semibold text-white">ZoroBoost</span>
                  </div>
                  <span className="rounded-md bg-[#2a2a2e] px-2 py-1 text-[11px] font-bold text-white">
                    {r.category}
                  </span>
                </div>
                <p className="mt-6 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-white">
                  <Link href={`/product/${r.id}`} style={{ color: '#ffffff', textDecoration: 'none' }}>
                    {r.title}
                  </Link>
                </p>
                <p className="mt-5 text-sm text-neutral-300 m-0">
                  <span className="text-base font-bold text-white">${r.price}</span> / unit
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4 Category Panel Grids */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CategoryCard 
            title="Popular Accounts" 
            entries={popularAccounts} 
            twoCol 
            onItemClick={(category) => {
              setActiveCategory(category);
              const el = document.getElementById('listings');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <CategoryCard 
            title="Popular Currencies" 
            entries={popularCurrencies} 
            twoCol 
            onItemClick={(category) => {
              setActiveCategory(category);
              const el = document.getElementById('listings');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <CategoryCard 
            title="Popular Boosting Services" 
            entries={popularBoosting} 
            twoCol 
            onItemClick={(category) => {
              setActiveCategory(category);
              const el = document.getElementById('listings');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <CategoryCard 
            title="Popular Items" 
            entries={popularItems} 
            twoCol 
            onItemClick={(category) => {
              setActiveCategory(category);
              const el = document.getElementById('listings');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* Eldorado Style Detailed Listings Table */}
        <section className="mt-12" id="listings">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-xl font-bold text-white m-0">All Offers</h2>
            
            {/* Quick Filter buttons */}
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setActiveCategory('all')} 
                className={`h-9 px-4 rounded-md text-xs font-bold transition border cursor-pointer bg-transparent ${activeCategory === 'all' ? 'border-amber-400 text-amber-400' : 'border-white/10 text-neutral-300'}`}
              >
                All Services
              </button>
              <button 
                onClick={() => setActiveCategory('aged-accounts')} 
                className={`h-9 px-4 rounded-md text-xs font-bold transition border cursor-pointer bg-transparent ${activeCategory.includes('account') ? 'border-amber-400 text-amber-400' : 'border-white/10 text-neutral-300'}`}
              >
                Accounts
              </button>
              <button 
                onClick={() => setActiveCategory('server-boosts')} 
                className={`h-9 px-4 rounded-md text-xs font-bold transition border cursor-pointer bg-transparent ${activeCategory.includes('boost') ? 'border-amber-400 text-amber-400' : 'border-white/10 text-neutral-300'}`}
              >
                Boosts
              </button>
              <button 
                onClick={() => setActiveCategory('server-members')} 
                className={`h-9 px-4 rounded-md text-xs font-bold transition border cursor-pointer bg-transparent ${activeCategory.includes('member') ? 'border-amber-400 text-amber-400' : 'border-white/10 text-neutral-300'}`}
              >
                Members
              </button>
              <button 
                onClick={() => setActiveCategory('decoration')} 
                className={`h-9 px-4 rounded-md text-xs font-bold transition border cursor-pointer bg-transparent ${activeCategory.includes('decoration') ? 'border-amber-400 text-amber-400' : 'border-white/10 text-neutral-300'}`}
              >
                Decorations
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#1c1c1f]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 bg-[#141417]">
                  <th className="p-4 text-xs font-bold text-neutral-400 uppercase">Offer Name</th>
                  <th className="p-4 text-xs font-bold text-neutral-400 uppercase">Category</th>
                  <th className="p-4 text-xs font-bold text-neutral-400 uppercase">Delivery Info</th>
                  <th className="p-4 text-xs font-bold text-neutral-400 uppercase">Trust Rating</th>
                  <th className="p-4 text-xs font-bold text-neutral-400 uppercase">Price</th>
                  <th className="p-4 text-xs font-bold text-neutral-400 uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-[#2a2a2e] flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img 
                              src={product.media_url || '/assets/img/icon/discord-3d-ball.png'} 
                              alt={product.title} 
                              className="w-4/5 h-4/5 object-contain"
                            />
                          </div>
                          <Link href={`/product/${product.id}`} className="text-sm font-semibold text-white hover:text-amber-400 transition" style={{ textDecoration: 'none' }}>
                            {product.title}
                          </Link>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="rounded-md bg-neutral-900 border border-white/10 px-2.5 py-1 text-xs font-bold text-neutral-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col text-sm text-neutral-200">
                          <span>{product.delivery_method || 'Instant'}</span>
                          <span className="text-xs text-neutral-400">{product.delivery_time || 'Under 10 mins'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          <span className="text-white font-bold">5.0</span>
                          <span className="text-neutral-400">(Verified)</span>
                        </div>
                      </td>
                      <td className="p-4 text-base font-bold text-amber-400">
                        ${product.price}
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/product/${product.id}`} className="inline-flex items-center justify-center rounded-md bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-900 shadow-md transition hover:bg-amber-300 border-none cursor-pointer" style={{ textDecoration: 'none' }}>
                          Buy Now
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-neutral-500">
                      No offers found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>
      
      {/* Floating Chat */}
      <button
        aria-label="Open chat"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'suggestion', rect: e.currentTarget.getBoundingClientRect() } })); }}
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-amber-400 text-neutral-900 shadow-lg hover:bg-amber-300 border-none cursor-pointer"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

    </div>
  );
}

/* Voxel Character Component */
function VoxelChar({
  color,
  hat,
  size,
}: {
  color: string;
  hat: string;
  size: string;
}) {
  return (
    <div className={`relative ${size} drop-shadow-xl`}>
      <div className={`absolute inset-x-1 top-0 h-1/4 rounded-sm ${hat}`} />
      <div className={`absolute inset-x-0 top-1/4 h-2/4 rounded-sm ${color}`} />
      <div className="absolute inset-x-1 bottom-0 h-1/4 rounded-sm bg-neutral-800" />
      <div className="absolute left-[25%] top-[35%] h-1.5 w-1.5 rounded-sm bg-white" />
      <div className="absolute right-[25%] top-[35%] h-1.5 w-1.5 rounded-sm bg-white" />
    </div>
  );
}

/* Category Card Panel Component */
function CategoryCard({
  title,
  entries,
  twoCol,
  onItemClick,
}: {
  title: string;
  entries: Entry[];
  twoCol?: boolean;
  onItemClick: (category: string) => void;
}) {
  return (
    <section className="rounded-xl bg-[#1c1c1f] p-6 ring-1 ring-white/5 sm:p-7">
      <h2 className="text-lg font-bold text-white m-0 mb-5">{title}</h2>
      <ul
        className={`grid gap-x-8 gap-y-3 ${
          twoCol ? 'sm:grid-cols-2' : 'grid-cols-1'
        }`}
        style={{ listStyle: 'none', padding: 0, margin: 0 }}
      >
        {entries.map((e, idx) => (
          <li key={idx}>
            <div
              onClick={() => onItemClick(e.category)}
              className="group flex items-center gap-3 rounded-lg py-1.5 px-2 hover:bg-white/5 cursor-pointer transition"
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${e.tint} text-white shadow-sm`}
              >
                <e.icon className="h-5 w-5" />
              </span>
              <span className="truncate text-sm font-medium text-neutral-200 group-hover:text-white">
                {e.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
