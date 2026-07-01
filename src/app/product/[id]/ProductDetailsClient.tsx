'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDescriptionSection from './ProductDescriptionSection';
import { 
  ArrowLeft,
  ShieldCheck, 
  Clock, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Zap
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  delivery_method?: string;
  delivery_time?: string;
  status?: string;
  media_url?: string;
  badge_text?: string;
  description: string;
}

interface Currency {
  code: string;
  symbol: string;
  label: string;
  rate: number;
}

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const [currency, setCurrency] = useState<Currency>({ code: 'USD', symbol: '$', label: 'USD - $', rate: 1 });
  const [protectExpanded, setProtectExpanded] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('selected_currency');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrency(parsed);
      } catch (e) {}
    }
  }, []);

  const formatPrice = (usdPrice: number) => {
    return `${currency.symbol}${(usdPrice * currency.rate).toFixed(2)}`;
  };

  // Process description to extract list items or show details
  const getOfferFeatures = () => {
    // If description has lines, split and make lists, otherwise return standard verification points
    const lines = product.description.split('\n').filter(l => l.trim().length > 0);
    if (lines.length > 2) {
      return lines;
    }
    return [
      "Random Region created",
      "Full Access / Email verified",
      "Clean & Safe",
      "No bans, no violations",
      "Registered Aged Account",
      "Full Access",
      "Email Verified",
      "Clean Account Status",
      "Not Banned"
    ];
  };

  const features = getOfferFeatures();

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white antialiased font-sans transition-colors duration-300">
      
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-[#3b82f6] hover:text-[#5584ff] uppercase tracking-wider transition-colors"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft className="h-3 w-3" /> Back to all offers
          </Link>
        </div>

        {/* Eldorado/PlayerAuctions Style Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDE: Product Image, Features list, Description */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Product Header Title (rendered directly on background) */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0 flex items-center gap-2">
                {product.title}
                {product.badge_text && (
                  <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest">
                    {product.badge_text}
                  </span>
                )}
              </h1>
            </div>

            {/* Showcase card */}
            <div className="bg-[#131924] border border-[#1d2736] rounded-xl p-8 flex items-center justify-center min-h-[300px] sm:min-h-[380px] shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />
              <img 
                src={product.media_url || '/assets/img/blog/1.jpg'} 
                alt={product.title} 
                className="max-h-[260px] sm:max-h-[320px] max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            {/* More Like This Section */}
            {relatedProducts.length > 0 && (
              <div className="bg-[#131924] border border-[#1d2736] rounded-xl p-6 shadow-lg">
                <h3 className="text-sm font-bold text-[#7f92ac] uppercase tracking-wider mb-4">More like this</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.map((p) => (
                    <Link 
                      key={p.id}
                      href={`/product/${p.id}`}
                      className="group flex flex-col justify-between bg-[#19202e] border border-[#222f44] rounded-lg p-3 hover:border-[#3b82f6] transition-all"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="w-full h-24 bg-[#111622] rounded flex items-center justify-center p-2 mb-3">
                        <img src={p.media_url || '/assets/img/blog/1.jpg'} alt="" className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform" />
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-2 min-h-[32px] leading-tight m-0">
                        {p.title}
                      </h4>
                      <div className="mt-3 pt-2 border-t border-[#222f44]/50 flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[10px] text-[#7f92ac]">
                          <span className="font-semibold">ZoroBoost</span>
                          <span className="text-[#00c853]">99.9%</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-black text-white">{formatPrice(p.price)}</span>
                          <span className="text-[9px] text-[#00c853] flex items-center gap-0.5"><Zap className="h-2.5 w-2.5 fill-current" /> Instant</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Offer Description Section */}
            <div className="bg-[#131924] border border-[#1d2736] rounded-xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1d2736] pb-3 m-0">Offer description</h2>
              
              {/* Badges row removed */}

              {/* Specs points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-6 text-sm text-[#8a9bb4]">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs">{idx % 4 === 0 ? '🔓' : idx % 4 === 1 ? '💎' : idx % 4 === 2 ? '✅' : '🗝'}</span>
                    <span className="truncate">{feat.replace(/^[-\s✓✅💎🔓🗝]+/g, '')}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#1d2736] my-6" />

              <ProductDescriptionSection product={{
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                delivery_method: product.delivery_method || 'Automatic',
                delivery_time: product.delivery_time || 'Instant',
                status: product.status || 'Active'
              }} />

              <div className="mt-8 text-xs text-[#5f7491]">
                Tags: {product.category.split(' ').concat(['zoro', 'boost', 'aged', 'nitro', 'shop']).join(', ')}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Payment Card, Guarantee, Purchase Protection, Seller info */}
          <div className="lg:col-span-4 flex flex-col gap-5 sticky top-24">
            
            {/* Price Box */}
            <div className="bg-[#131924] border border-[#1d2736] rounded-xl shadow-lg overflow-hidden">
              {/* Full Email Access Banner removed */}
              
              <div className="p-6">
                {/* Price Display */}
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                  {formatPrice(product.price)}
                </div>

                {/* Specs list */}
                <div className="flex flex-col gap-3 text-xs text-[#8a9bb4] mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-[#1d2736]">
                    <span className="flex items-center gap-1">Original email <HelpCircle className="h-3 w-3 opacity-60" /></span>
                    <span className="text-white font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#1d2736]">
                    <span className="flex items-center gap-1">Warranty <HelpCircle className="h-3 w-3 opacity-60" /></span>
                    <span className="text-white font-semibold">5 Days Free</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="flex items-center gap-1">Delivery time <HelpCircle className="h-3 w-3 opacity-60" /></span>
                    <span className="text-[#00c853] font-bold flex items-center gap-1">
                      <Zap className="h-3 w-3 fill-current" /> Instant
                    </span>
                  </div>
                </div>

                {/* Buy Button */}
                <Link 
                  href="/contact-us"
                  className="w-full inline-flex items-center justify-center rounded bg-[#ffd13b] hover:bg-[#ffc83b] px-4 py-3.5 text-sm font-bold text-neutral-900 shadow-md transition-all border-none cursor-pointer mb-5"
                  style={{ textDecoration: 'none' }}
                >
                  Buy now
                </Link>

                {/* Secure Trust lines */}
                <div className="flex flex-col gap-3 text-xs text-[#8a9bb4] pt-2 border-t border-[#1d2736]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#5584ff]" />
                    <span><strong>Money-back Guarantee</strong> Protected by TradeShield</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#ffd13b]" />
                    <span><strong>Fast Checkout Options</strong> Apple Pay, Google Pay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-[#5584ff]" />
                    <span><strong>24/7 Live Support</strong> We're always here to help</span>
                  </div>
                </div>

              </div>
            </div>

            {/* How we protect your purchase */}
            <div className="bg-[#131924] border border-[#1d2736] rounded-xl shadow-lg overflow-hidden">
              <button 
                onClick={() => setProtectExpanded(!protectExpanded)}
                className="w-full bg-transparent border-none px-6 py-4 flex items-center justify-between text-sm font-bold text-white cursor-pointer hover:bg-[#18202d] transition-colors"
              >
                <span className="flex items-center gap-2">🛡 How we protect your purchase</span>
                {protectExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {protectExpanded && (
                <div className="p-6 pt-0 border-t border-[#1d2736] flex flex-col gap-4 text-xs text-[#8a9bb4]">
                  <div>
                    <h5 className="text-white font-bold mb-1 mt-3 flex items-center gap-1.5">✓ Verified sellers</h5>
                    <p className="m-0 leading-relaxed">Sellers must confirm their identity before they can list and sell services.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1 flex items-center gap-1.5">✓ Payment held until delivery</h5>
                    <p className="m-0 leading-relaxed">Seller receives money only after you mark the order as received and verified.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1 flex items-center gap-1.5">✓ Free warranty included</h5>
                    <p className="m-0 leading-relaxed">If the account isn't as described, you're covered under the protection at no extra cost.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1 flex items-center gap-1.5">✓ Optional extended warranty</h5>
                    <p className="m-0 leading-relaxed">Add extra protection logs for longer-lasting peace of mind.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Seller Info (ZoroBoost) */}
            <div className="bg-[#131924] border border-[#1d2736] rounded-xl p-5 shadow-lg flex flex-col gap-3">
              <span className="text-xs font-bold text-[#7f92ac] uppercase tracking-wider">Seller</span>
              <div className="bg-[#19202e] border border-[#222f44] rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center font-bold text-white shrink-0 shadow">
                  ZB
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white m-0 flex items-center gap-1">
                    ZoroBoost 
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#5584ff] text-white text-[8px] font-black">✓</span>
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-[#7f92ac] mt-0.5">
                    <span className="text-[#00c853] font-bold">★ 99.9%</span>
                    <span>•</span>
                    <a href="#" className="text-[#5584ff] hover:underline flex items-center gap-0.5">11,952 reviews <ExternalLink className="h-2 w-2" /></a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
