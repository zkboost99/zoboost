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

export default function SearchBox() {
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
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            placeholder="Search ZoroBoost..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowDropdown(true);
              }
            }}
            autoComplete="off"
            className="h-10 w-full rounded-md bg-[#1c1c1f] pl-11 pr-4 text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 border border-white/5"
          />
        </div>

        {showDropdown && suggestions.length > 0 && (
          <div 
            className="absolute left-0 top-full mt-2 w-full rounded-md bg-[#1c1c1f] border border-white/5 shadow-xl z-50 max-h-[380px] overflow-y-auto"
          >
            {suggestions.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  router.push(`/product/${product.id}`);
                  setShowDropdown(false);
                }}
                className="flex items-center gap-3 px-4 py-3 border-b border-white/5 cursor-pointer hover:bg-white/5 text-left"
              >
                <div 
                  className="w-9 h-9 rounded bg-[#2a2a2e] overflow-hidden flex items-center justify-center flex-shrink-0"
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
                  <h4 className="text-sm font-semibold text-white truncate">
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
