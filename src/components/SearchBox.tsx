'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

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
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Describe what you want" 
          className="form-control" 
          name="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowDropdown(true);
            }
          }}
          autoComplete="off"
        />
        <button className="btn btn-style-one" type="submit">
          Search <i className="fa fa-search"></i>
        </button>  

        {showDropdown && suggestions.length > 0 && (
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              marginTop: '10px',
              left: 0,
              width: '100%',
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
              border: '1px solid #f1f5f9',
              zIndex: 999,
              overflow: 'hidden',
              maxHeight: '380px',
              overflowY: 'auto'
            }}
          >
            {suggestions.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  router.push(`/product/${product.id}`);
                  setShowDropdown(false);
                }}
                style={{
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '6px', 
                    background: '#f1f5f9',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {product.media_url ? (
                    <img 
                      src={product.media_url} 
                      alt={product.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="fab fa-discord" style={{ color: '#5865F2', fontSize: '18px' }}></i>
                  )}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h4 
                    style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#0f172a', 
                      margin: '0 0 2px 0',
                      fontFamily: 'inherit'
                    }}
                  >
                    {product.title}
                  </h4>
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      color: '#64748b', 
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <i className="fab fa-discord" style={{ fontSize: '12px', color: '#5865F2' }}></i> {product.category}
                  </span>
                </div>
                <div 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#5865F2',
                    flexShrink: 0 
                  }}
                >
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
