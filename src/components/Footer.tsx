import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-eldorado text-light">
      <div className="eldorado-container">
        
        {/* Footer Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Contact & About */}
          <div className="footer-col">
            <div className="logo mb-4">
              <Link href="/">
                <img src="/assets/img/logo-light.png" alt="ZoroBoost Logo" style={{ height: '38px', objectFit: 'contain' }} />
              </Link>
            </div>
            <p className="mb-4 text-secondary" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              ZoroBoost is the ultimate destination for premium Discord services. Boost your server, get aged accounts, nitro, and active members with absolute security.
            </p>
            <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: '13px' }}>
              <div><i className="fas fa-envelope text-warning me-2"></i> info@zoroboost.com</div>
              <div><i className="fas fa-phone text-warning me-2"></i> +923438495390</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link href="/aged-accounts">Aged Accounts</Link></li>
              <li><Link href="/server-boosts">Server Boosts</Link></li>
              <li><Link href="/server-members">Server Members</Link></li>
              <li><Link href="/nitro-boost">Nitro Boost</Link></li>
              <li><Link href="/decoration">Decorations</Link></li>
              <li><Link href="/promo">Promo Deals</Link></li>
            </ul>
          </div>

          {/* Column 4: Trust & Payments */}
          <div className="footer-col">
            <h4>Safe & Secure</h4>
            <p className="mb-3 text-secondary" style={{ fontSize: '13px', lineHeight: '1.5' }}>
              All transactions are secured by our TradeShield™ escrow protection. Seller funds are only released after successful service delivery.
            </p>
            
            <div className="payment-methods-grid">
              <div className="payment-icon" title="Visa"><i className="fab fa-cc-visa"></i></div>
              <div className="payment-icon" title="Mastercard"><i className="fab fa-cc-mastercard"></i></div>
              <div className="payment-icon" title="Apple Pay"><i className="fab fa-apple-pay"></i></div>
              <div className="payment-icon" title="Google Pay"><i className="fab fa-google-pay"></i></div>
              <div className="payment-icon" title="Bitcoin"><i className="fab fa-btc"></i></div>
              <div className="payment-icon" title="Ethereum"><i className="fab fa-ethereum"></i></div>
              <div className="payment-icon" title="Discord"><i className="fab fa-discord"></i></div>
              <div className="payment-icon" title="Secure Escrow"><i className="fas fa-shield-alt text-warning"></i></div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            <p>© {new Date().getFullYear()} <Link href="/" className="text-warning">ZoroBoost</Link>. All Rights Reserved.</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link href="/privacy-policy" className="text-secondary" style={{ fontSize: '13px' }}>Privacy Policy</Link>
            <span className="text-secondary" style={{ fontSize: '13px' }}>•</span>
            <Link href="/terms-and-conditions" className="text-secondary" style={{ fontSize: '13px' }}>Terms &amp; Conditions</Link>
            <span className="text-secondary" style={{ fontSize: '13px' }}>•</span>
            <a href="https://udesigner.net" target="_blank" rel="noopener noreferrer" className="text-secondary" style={{ fontSize: '13px' }}>
              Developed by UDESIGNER
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}