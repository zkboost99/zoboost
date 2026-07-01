'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  media_url?: string;
}

export default function SearchBox({ className, placeholder }: { className?: string; placeholder?: string }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.products) {
          setSuggestions(data.products);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error('Failed to fetch search suggestions:', error);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      router.push(`/product/${suggestions[0].id}`);
      setShowDropdown(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative rounded-[12px] border border-neutral-200 dark:border-white/5 p-[4px] shadow-sm dark:shadow-lg bg-neutral-100/50 dark:bg-black/10 transition-all hover:bg-neutral-200/50 dark:hover:bg-black/20 focus-within:bg-neutral-200/50 dark:focus-within:bg-black/20 focus-within:border-neutral-300 dark:focus-within:border-white/10">
          <div className="relative flex items-center h-[52px] w-full rounded-lg bg-neutral-200/60 dark:bg-[#1e1f22]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-[22px] w-[22px] -translate-y-1/2 text-neutral-500 dark:text-[#82848f] z-10" />
            <input
              type="search"
              placeholder={placeholder || "Search for games, services or keys..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowDropdown(true);
                }
              }}
              autoComplete="off"
              className={className || "h-full w-full bg-transparent pl-12 pr-4 text-[16px] text-neutral-900 dark:text-[#dbdee1] placeholder:text-neutral-500 dark:placeholder:text-[#82848f] placeholder:font-medium focus:outline-none rounded-lg"}
            />
          </div>
        </div>

        {showDropdown && suggestions.length > 0 && (
          <div 
            className="absolute left-0 top-full mt-2 w-full rounded-md bg-search-bg border border-search-border shadow-xl z-50 max-h-[380px] overflow-y-auto"
          >
            {suggestions.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  router.push(`/product/${product.id}`);
                  setShowDropdown(false);
                }}
                className="flex items-center gap-3 px-4 py-3 border-b border-search-border cursor-pointer hover:bg-neutral-800/5 dark:hover:bg-white/5 text-left"
              >
                <div 
                  className="w-9 h-9 rounded bg-card-active overflow-hidden flex items-center justify-center flex-shrink-0"
                >
                  {product.media_url ? (
                    <img 
                      src={product.media_url} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-[10px] font-bold text-amber-400">ZB</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {product.title}
                  </h4>
                  <span className="text-xs text-neutral-400 font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="text-sm font-bold text-amber-400 flex-shrink-0">
                  ${product.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
