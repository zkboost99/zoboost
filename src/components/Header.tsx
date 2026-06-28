'use client';

import Link from 'next/link';
import { 
  ChevronDown, 
  Bell, 
  MessageSquare, 
  ArrowLeftRight, 
  HelpCircle, 
  Globe, 
  Sun, 
  Moon, 
  Gamepad2 
} from 'lucide-react';
import SearchBox from './SearchBox';

const navItems = [
  { label: 'Accounts' },
  { label: 'Boosting' },
  { label: 'Members' },
  { label: 'Nitro' },
  { label: 'Decorations' },
  { label: 'Promo Deals' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#0f0f10] border-b border-white/5">
      {/* Top Bar */}
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2" style={{ textDecoration: 'none' }}>
          <div className="grid h-9 w-9 place-items-center rounded-md bg-amber-400 text-neutral-900">
            <Gamepad2 className="h-5 w-5" strokeWidth={2.75} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ZoroBoost</span>
        </Link>

        {/* Central Search Box */}
        <div className="relative mx-2 hidden flex-1 md:block max-w-[600px]">
          <SearchBox />
        </div>

        {/* Right Nav Controls */}
        <div className="ml-auto flex items-center gap-4 text-neutral-300">
          <button 
            aria-label="Swap" 
            className="relative hover:text-white"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'suggestion', rect: e.currentTarget.getBoundingClientRect() } })); }}
          >
            <ArrowLeftRight className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber-400" />
          </button>
          
          <button 
            aria-label="Messages" 
            className="relative hover:text-white"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'report', rect: e.currentTarget.getBoundingClientRect() } })); }}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-neutral-900">
              1
            </span>
          </button>
          
          <button aria-label="Notifications" className="relative hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-neutral-900">
              2
            </span>
          </button>
          
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-rose-400 to-amber-500 ring-2 ring-white/10" />
        </div>
      </div>

      {/* Category Navigation Sub-bar */}
      <div className="bg-[#1a1a1d] border-t border-white/5">
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex h-full items-center gap-1 overflow-x-auto">
            {navItems.map(({ label }) => (
              <button
                key={label}
                className="flex h-full shrink-0 items-center gap-1.5 px-3 text-sm font-semibold text-neutral-100 hover:text-white border-none bg-transparent"
              >
                {label}
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
            ))}
          </nav>
          
          <div className="hidden items-center gap-5 text-sm text-neutral-300 md:flex">
            <button className="flex items-center gap-2 hover:text-white border-none bg-transparent">
              <HelpCircle className="h-4 w-4" />
              24/7 Live Support
            </button>
            <button className="flex items-center gap-2 hover:text-white border-none bg-transparent">
              <Globe className="h-4 w-4" />
              English | USD - $
            </button>
            <div className="flex items-center gap-1 text-neutral-400">
              <Sun className="h-4 w-4" />
              <Moon className="h-4 w-4 text-amber-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}