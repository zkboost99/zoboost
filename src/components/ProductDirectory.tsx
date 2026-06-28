'use client';

import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
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
  Globe,
  Wand2,
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

type Entry = { label: string; icon: LucideIcon; tint: string };

const popularAccounts: Entry[] = [
  { label: "Battle Royale X", icon: Crown, tint: "bg-orange-500" },
  { label: "Auto Heist V", icon: Target, tint: "bg-emerald-700" },
  { label: "Tactical Strike", icon: Swords, tint: "bg-rose-500" },
  { label: "Siege Tactics", icon: Shield, tint: "bg-neutral-800" },
  { label: "Block World", icon: Joystick, tint: "bg-sky-500" },
  { label: "Hero League", icon: Star, tint: "bg-indigo-600" },
  { label: "Pixel Quest", icon: Wand2, tint: "bg-amber-500" },
  { label: "Old Realm Online", icon: Trophy, tint: "bg-yellow-600" },
  { label: "Monster Hunter Go", icon: Ghost, tint: "bg-red-500" },
  { label: "Shadow Raiders", icon: Flame, tint: "bg-purple-600" },
];

const popularCurrencies: Entry[] = [
  { label: "Football Coins", icon: Dice5, tint: "bg-emerald-600" },
  { label: "Exile Path Currency", icon: Coins, tint: "bg-stone-700" },
  { label: "Old Realm Gold", icon: Coins, tint: "bg-yellow-600" },
  { label: "Block World Cash", icon: Coins, tint: "bg-sky-500" },
  { label: "SMP Donations", icon: Coins, tint: "bg-rose-400" },
];

const popularBoosting: Entry[] = [
  { label: "Tactical Strike", icon: Rocket, tint: "bg-neutral-900" },
  { label: "Battle Brawl", icon: Sparkles, tint: "bg-cyan-500" },
  { label: "Football Pro", icon: Trophy, tint: "bg-emerald-600" },
  { label: "Rocket Arena", icon: Gamepad2, tint: "bg-blue-700" },
];

const popularItems: Entry[] = [
  { label: "Garden Grower 2", icon: Sparkles, tint: "bg-lime-500" },
  { label: "Brain Heist", icon: Ghost, tint: "bg-pink-300" },
];


export default function ProductDirectory({ products }: ProductDirectoryProps) {
  // Map our products dynamically to the "Recently viewed" section
  const recently = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-neutral-100 antialiased font-sans">
      
      {/* Header (TopBar & CategoryNav) */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img
          src="/lovable/brainrot-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Full-width smooth bottom fade blur */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f0f10] via-[#0f0f10]/80 to-transparent pointer-events-none" />

        <div className="relative mx-auto w-full flex min-h-[460px] max-w-[1200px] items-end px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-md pb-28">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-md sm:text-5xl" style={{ color: '#ffffff' }}>
              Complete your
              <br />
              Discord set
            </h1>
            <p className="mt-4 text-sm font-medium text-white/90">
              The safest player-to-player Discord services marketplace
            </p>
            <button 
              onClick={() => {
                const el = document.getElementById('listings');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-amber-400 px-8 py-2.5 text-xs font-bold text-neutral-900 shadow-md transition hover:bg-amber-300 border-none cursor-pointer"
            >
              Shop Now
            </button>
          </div>
          <img
            src="/lovable/brainrot-hero.webp"
            alt="Voxel character collection"
            className="pointer-events-none absolute bottom-[29%] right-[4%] hidden h-[50%] w-auto object-contain md:block"
          />
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-8" id="listings">
        
        {/* Recently viewed section */}
        <section className="-mt-32 pt-8 relative z-10">

          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ listStyle: 'none', padding: 0 }}>
            {recently.map((r) => (
              <li
                key={r.id}
                className="rounded-md bg-[#1c1c1f] p-4 ring-1 ring-white/5 transition hover:ring-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-md bg-indigo-500 text-xs font-bold text-white">
                      MV
                    </div>
                    <span className="text-sm font-semibold text-white">Boost Hub</span>
                  </div>
                  <span className="rounded-md bg-[#2a2a2e] px-2 py-1 text-[11px] font-bold text-white uppercase">
                    {r.category.replace('-', ' ')}
                  </span>
                </div>
                <p className="mt-6 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-white mb-0">
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

        {/* 4 Popular Grid Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CategoryCard title="Popular Accounts" entries={popularAccounts} twoCol />
          <CategoryCard title="Popular Currencies" entries={popularCurrencies} twoCol />
          <CategoryCard title="Popular Boosting Services" entries={popularBoosting} twoCol />
          <CategoryCard title="Popular Items" entries={popularItems} twoCol />
        </div>

      </main>

      {/* Safe and Easy Trading */}
      <SafeTrading />

      {/* Trust Cards */}
      <TrustCards />

      {/* Payments Bar */}
      <PaymentsBar />

      {/* Footer */}
      <Footer />

      {/* Floating chat */}
      <button
        aria-label="Open chat"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'suggestion', rect: e.currentTarget.getBoundingClientRect() } })); }}
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-sky-500 text-white shadow-lg hover:bg-sky-400 border-none cursor-pointer"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

    </div>
  );
}

/* Category Card Component */
function CategoryCard({
  title,
  entries,
  twoCol,
}: {
  title: string;
  entries: Entry[];
  twoCol?: boolean;
}) {
  return (
    <section className="rounded-md bg-[#1c1c1f] p-6 ring-1 ring-white/5 sm:p-7">
      <h2 className="text-lg font-bold text-white m-0">{title}</h2>
      <ul
        className={`mt-5 grid gap-x-8 gap-y-3 ${
          twoCol ? 'sm:grid-cols-2' : 'grid-cols-1'
        }`}
        style={{ listStyle: 'none', padding: 0, margin: 0 }}
      >
        {entries.map((e, idx) => (
          <li key={idx}>
            <a
              href="#"
              className="group flex items-center gap-3 rounded-md py-1.5 transition hover:bg-white/5"
              style={{ textDecoration: 'none' }}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${e.tint} text-white shadow-sm`}
              >
                <e.icon className="h-5 w-5" />
              </span>
              <span className="truncate text-sm font-medium text-neutral-200 group-hover:text-white">
                {e.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Safe Trading Component */
function SafeTrading() {
  return (
    <section className="bg-[#15161a]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-white sm:text-[28px] m-0">Safe and Easy Trading</h2>
          <div className="mt-6 space-y-5 text-sm leading-6 text-neutral-300">
            <p>
              Trade without fear — ZoroBoost guarantees that all trades are legit and keeps you
              safe from scammers.
            </p>
            <p>
              It's quick and easy — find the best product for your Discord server, make a payment,
              receive your order, and get back to playing.
            </p>
            <p>Join us today to level up your gaming experience!</p>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <img
            src="/lovable/phones.webp"
            alt="Mobile app preview"
            className="w-full max-w-[560px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

/* Trust Cards Component */
function TrustCards() {
  return (
    <section className="bg-[#0a0a0c]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <article className="flex items-center gap-5 rounded-md bg-[#f3e5c7] p-6 sm:p-7">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-md bg-amber-300/40">
            <Shield className="h-14 w-14 text-amber-700" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-neutral-900 m-0">Money-Back Guarantee</h3>
            <p className="mt-1 text-sm text-neutral-700 mb-0">
              Receive your order or get a refund. Feel safe with full trading protection!
            </p>
            <button className="mt-4 inline-flex items-center rounded-md bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-900 hover:bg-amber-300 border-none cursor-pointer">
              Learn more
            </button>
          </div>
        </article>
        <article className="flex items-center gap-5 rounded-md bg-[#c8e6a0] p-6 sm:p-7">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-md bg-lime-300/50">
            <HelpCircle className="h-14 w-14 text-emerald-800" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-neutral-900 m-0">24/7 Live Support</h3>
            <p className="mt-1 text-sm text-neutral-700 mb-0">
              ZoroBoost support works around the clock. Contact us at any time!
            </p>
            <button className="mt-4 inline-flex items-center rounded-md bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-900 hover:bg-amber-300 border-none cursor-pointer">
              Chat now
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

/* Payments Bar Component */
function PaymentsBar() {
  const pays = [
    '/lovable/Visa.svg',
    '/lovable/Mastercard.svg',
    '/lovable/Amex.svg',
    '/lovable/Discover.svg',
    '/lovable/BTC.svg',
    '/lovable/GooglePay.svg',
    '/lovable/ApplePay.svg'
  ];
  return (
    <section className="bg-[#0a0a0c]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {pays.map((p, i) => (
            <img key={i} src={p} alt="" className="h-7 w-auto" />
          ))}
          <span className="ml-2 text-xs font-semibold text-neutral-400">+15 more</span>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#15161a] px-4 py-2 text-xs font-semibold text-neutral-200 hover:border-white/20 border-none cursor-pointer">
          <Globe className="h-4 w-4" />
          English | USD - $
        </button>
      </div>
    </section>
  );
}
