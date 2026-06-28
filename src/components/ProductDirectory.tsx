'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function ProductDirectory({ products, posts }: ProductDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Categories mapping to database categories
  const categoriesList = [
    { id: 'all', label: 'All Services', icon: 'fas fa-th-large' },
    { id: 'Aged Accounts', label: 'Aged Accounts', icon: 'fas fa-history' },
    { id: 'Server Boosts', label: 'Server Boosts', icon: 'fas fa-gem' },
    { id: 'Server Members', label: 'Server Members', icon: 'fas fa-users' },
    { id: 'Nitro Boost', label: 'Nitro Boost', icon: 'fas fa-bolt' },
    { id: 'Decoration', label: 'Decorations', icon: 'fas fa-paint-brush' },
    { id: 'Promo', label: 'Promo Deals', icon: 'fas fa-fire' }
  ];

  // Filter products based on selected category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Static testimonials to avoid layout shift
  const testimonials = [
    {
      name: 'Sarah K.',
      role: 'Community Manager',
      text: 'Super fast delivery! Got my 14x Server Boosts within 10 minutes of ordering. Highly recommended site.',
      rating: 5
    },
    {
      name: 'Alex Mercer',
      role: 'Discord Owner',
      text: 'The aged accounts I bought were high quality, full access, and came with detailed instructions. Will buy again.',
      rating: 5
    },
    {
      name: 'Danyal H.',
      role: 'Server Admin',
      text: 'Amazing support! I had a question about setting up the members and the team resolved it within minutes.',
      rating: 5
    }
  ];

  // Helper to format date
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return 'June 28, 2026';
    }
  };

  return (
    <div className="eldorado-container">
      <div className="eldorado-main-layout">
        
        {/* Left Sidebar Menu */}
        <aside className="eldorado-sidebar">
          <div className="sidebar-title">
            <i className="fas fa-compass"></i> Discover
          </div>
          <ul className="sidebar-menu">
            {categoriesList.map((cat) => (
              <li 
                key={cat.id} 
                className={`sidebar-menu-item ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(cat.id);
                  }}
                >
                  <i className={cat.icon}></i>
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Main Area */}
        <main>
          
          {/* Flat Hero Banner */}
          <div className="eldorado-hero">
            <div className="eldorado-hero-content">
              <h2>Power Up Your Discord Community</h2>
              <p>
                Get premium Discord Server Boosts, Aged Accounts, Members, Nitro, and Profile Decorations instantly. Guaranteed safe delivery backed by escrow protection.
              </p>
            </div>
            <img 
              src="/assets/img/shape/globe.png" 
              alt="Discord Graphic" 
              className="eldorado-hero-badge"
            />
          </div>

          {/* Eldorado Category Tabs */}
          <div className="eldorado-tabs">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`eldorado-tab ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Offer Listings Grid */}
          <div className="eldorado-grid">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="eldorado-card">
                  <div className="card-img-wrapper">
                    {product.discount_value && product.discount_value > 0 && (
                      <span className="card-discount-badge">
                        <i className="fas fa-fire"></i> Off
                      </span>
                    )}
                    <img 
                      src={product.media_url || '/assets/img/icon/discord-3d-ball.png'} 
                      alt={product.title} 
                    />
                  </div>
                  
                  <div className="card-body-eldorado">
                    <span className="card-category-tag">{product.category}</span>
                    <h3 className="card-title-eldorado">
                      <Link href={`/product/${product.id}`}>{product.title}</Link>
                    </h3>
                    
                    <div className="card-rating">
                      <div className="card-rating-stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <span className="card-rating-text">5.0 (Verified)</span>
                    </div>

                    <div className="card-footer-eldorado">
                      <div className="card-price-info">
                        <span className="card-price-label">Price starting at</span>
                        <span className="card-price-value">${product.price}</span>
                      </div>
                      <Link 
                        href={`/product/${product.id}`} 
                        className="btn-eldorado-gold"
                        style={{ padding: '8px 14px', fontSize: '13px' }}
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-100 text-center py-5 text-secondary">
                <i className="fas fa-search fa-3x mb-3 text-warning"></i>
                <h4>No offers found in this category</h4>
                <p>Check back later or try selecting another category.</p>
              </div>
            )}
          </div>

          {/* TradeShield™ Escrow Banner */}
          <div className="tradeshield-banner">
            <div className="d-flex align-items-center gap-4 flex-column flex-md-row text-center text-md-start">
              <div className="tradeshield-badge">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="tradeshield-text">
                <h3>Protected by TradeShield™</h3>
                <p>
                  Eldorado-style escrow protection keeps your money safe. The seller only receives payment after you confirm successful delivery of your Discord boosts or accounts.
                </p>
              </div>
            </div>
            <Link href="/contact-us" className="btn-eldorado-outline" style={{ whiteSpace: 'nowrap' }}>
              How it works
            </Link>
          </div>

          {/* Customer Reviews Section */}
          <div className="mb-5">
            <div className="mb-4">
              <h4 className="text-uppercase text-secondary mb-2" style={{ fontSize: '13px', letterSpacing: '1px' }}>Feedback</h4>
              <h2 className="m-0" style={{ fontSize: '24px' }}>What our buyers say</h2>
            </div>
            
            <div className="row g-3">
              {testimonials.map((test, index) => (
                <div key={index} className="col-md-4">
                  <div className="p-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border-color)', borderRadius: '12px', height: '100%' }}>
                    <div className="d-flex text-warning gap-1 mb-3" style={{ fontSize: '12px' }}>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <p className="text-secondary mb-3" style={{ fontSize: '14px', lineHeight: '1.6', fontStyle: 'italic' }}>
                      &ldquo;{test.text}&rdquo;
                    </p>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-primary)' }}>{test.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{test.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Blogs / News */}
          {posts && posts.length > 0 && (
            <div className="mt-5">
              <div className="mb-4">
                <h4 className="text-uppercase text-secondary mb-2" style={{ fontSize: '13px', letterSpacing: '1px' }}>Guides</h4>
                <h2 className="m-0" style={{ fontSize: '24px' }}>Latest from ZoroBoost blog</h2>
              </div>
              
              <div className="row g-4">
                {posts.slice(0, 3).map((post) => (
                  <div key={post.id} className="col-md-4">
                    <div className="eldorado-card h-100">
                      <div className="card-img-wrapper" style={{ height: '140px' }}>
                        <img 
                          src={post.media_url || 'https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/blog/zoroboost-guide.png'} 
                          alt={post.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="card-body-eldorado">
                        <span className="card-category-tag" style={{ fontSize: '10px' }}>{formatDate(post.created_at)}</span>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', margin: '8px 0 16px 0', lineHeight: '1.4' }}>
                          <Link href={`/blog/${post.slug || post.id}`} style={{ color: 'var(--text-primary)' }}>{post.title}</Link>
                        </h4>
                        <Link href={`/blog/${post.slug || post.id}`} className="text-warning mt-auto" style={{ fontSize: '13px', fontWeight: '600' }}>
                          Read Guide <i className="fas fa-long-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
