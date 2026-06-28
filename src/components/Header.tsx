'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBox from './SearchBox';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header-eldorado">
      <div className="eldorado-container">
        <div className="header-inner">
          {/* Brand Logo */}
          <div className="header-logo">
            <Link href="/">
              <img src="/assets/img/logo.png" alt="ZoroBoost Logo" />
            </Link>
          </div>

          {/* Central Search Bar */}
          <div style={{ flex: 1, maxWidth: '500px' }} className="d-none d-md-block">
            <SearchBox />
          </div>

          {/* Actions & Navigation links */}
          <div className="header-actions">
            <nav className="d-none d-lg-flex align-items-center gap-3">
              <Link href="/about-us" className="btn-eldorado-outline" style={{ border: 'none', padding: '8px 12px' }}>
                About Us
              </Link>
              <Link href="/contact-us" className="btn-eldorado-outline" style={{ border: 'none', padding: '8px 12px' }}>
                Contact Us
              </Link>
              <Link href="/blog" className="btn-eldorado-outline" style={{ border: 'none', padding: '8px 12px' }}>
                Blog
              </Link>
              
              {/* Dropdown Menu for legal links */}
              <div className="dropdown">
                <button 
                  className="btn-eldorado-outline dropdown-toggle" 
                  type="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false" 
                  style={{ border: 'none', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Legal <i className="fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-dark" style={{ background: 'var(--bg-section)', border: '1px solid var(--border-color)', marginTop: '8px' }}>
                  <li><Link className="dropdown-item" href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
                  <li><Link className="dropdown-item" href="/disclaimer">Disclaimer</Link></li>
                  <li><Link className="dropdown-item" href="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link className="dropdown-item" href="/refund-policy">Refund Policy</Link></li>
                  <li><Link className="dropdown-item" href="/cookies-policy">Cookies Policy</Link></li>
                </ul>
              </div>
            </nav>

            {/* Support and Feedback options */}
            <div className="d-flex align-items-center gap-2">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'suggestion', rect: e.currentTarget.getBoundingClientRect() } })); }} 
                title="Share a Suggestion" 
                className="btn-eldorado-outline"
                style={{ padding: '10px 12px', fontSize: '16px' }}
              >
                <i className="fas fa-lightbulb" style={{ color: 'var(--accent-gold)' }}></i>
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'report', rect: e.currentTarget.getBoundingClientRect() } })); }} 
                title="Report an Issue" 
                className="btn-eldorado-outline"
                style={{ padding: '10px 12px', fontSize: '16px' }}
              >
                <i className="fas fa-bug" style={{ color: '#ef4444' }}></i>
              </button>
            </div>

            {/* Main CTA */}
            <Link className="btn-eldorado-gold" href="/login">
              Get Started <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search - visible below header on screens smaller than md */}
        <div className="d-block d-md-none mt-3">
          <SearchBox />
        </div>
      </div>
    </header>
  );
}