import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

export default function AiServicesSection() {
  return (
    <div className="relative z-10 py-24 bg-bg-base/50 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up animate-stagger-1">
          <h4 className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-3">Services</h4>
          <h2 
            className="text-3xl sm:text-5xl font-black text-foreground tracking-tight m-0"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Premium Digital Services & Discord Upgrades
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Curved text + Image */}
          <div className="relative rounded-lg overflow-hidden border border-white/10 bg-card group min-h-[300px] animate-fade-in-up animate-stagger-2">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-60" style={{ backgroundImage: "url('/assets/img/shape/banner-7.jpg')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 p-8 flex flex-col h-full justify-center items-center text-center">
              <div className="relative w-full flex justify-center items-center">
                <svg viewBox="0 0 200 200" className="w-48 h-48 animate-[spin_20s_linear_infinite]">
                  <path id="curve" d="M 20,100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" fill="transparent" />
                  <text className="text-[14px] fill-white font-bold tracking-widest uppercase">
                    <textPath href="#curve" startOffset="0">
                      Instant Delivery & Secure Transactions
                    </textPath>
                  </text>
                </svg>
                {/* Center Image */}
                <img src="/discord-globe.png" alt="Discord Services" className="absolute w-24 h-24 object-contain" />
              </div>
            </div>
          </div>

          {/* Card 2: Ai Development */}
          <div className="rounded-lg border border-white/10 bg-card p-8 hover:bg-white/5 transition-colors group animate-fade-in-up animate-stagger-3">
            <div className="w-16 h-16 rounded bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-amber-400/50 transition-colors">
              <img src="/assets/img/icon/2.png" alt="Server Boosting" className="w-8 h-8 object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-4">
              <Link href="#" className="hover:text-amber-400 transition-colors">Server Boosting</Link>
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Elevate your Discord server with our premium server boosts. Unlock Level 3 features instantly, securely, and at unbeatable prices.
            </p>
          </div>

          {/* Card 3: Data Science */}
          <div className="rounded-lg border border-white/10 bg-card p-8 hover:bg-white/5 transition-colors group animate-fade-in-up animate-stagger-4">
            <div className="w-16 h-16 rounded bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-amber-400/50 transition-colors">
              <img src="/assets/img/icon/3.png" alt="Premium Accounts" className="w-8 h-8 object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-4">
              <Link href="#" className="hover:text-amber-400 transition-colors">Premium Accounts</Link>
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Buy aged and verified Discord accounts with early supporter badges, nitro subscriptions, and a completely clean history.
            </p>
          </div>

          {/* Machine Learning */}
          <div className="rounded-lg border border-white/10 bg-card p-8 hover:bg-white/5 transition-colors group animate-fade-in-up animate-stagger-5">
            <div className="w-16 h-16 rounded bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-amber-400/50 transition-colors">
              <img src="/assets/img/icon/1.png" alt="Server Members" className="w-8 h-8 object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-4">
              <Link href="#" className="hover:text-amber-400 transition-colors">Server Members</Link>
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Grow your community rapidly with high-quality offline and online members delivered straight to your server with realistic profiles.
            </p>
          </div>

          {/* Chatbot Solutions */}
          <div className="rounded-lg border border-white/10 bg-card p-8 hover:bg-white/5 transition-colors group animate-fade-in-up animate-stagger-6">
            <div className="w-16 h-16 rounded bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-amber-400/50 transition-colors">
              <img src="/assets/img/icon/4.png" alt="Profile Decor" className="w-8 h-8 object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-4">
              <Link href="#" className="hover:text-amber-400 transition-colors">Profile Decor</Link>
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Stand out from the crowd with exclusive profile decorations, avatar effects, and custom badges tailored for your unique Discord identity.
            </p>
          </div>

          {/* Card 6: Ai Community */}
          <div className="relative rounded-lg overflow-hidden border border-white/10 bg-card group min-h-[300px] animate-fade-in-up animate-stagger-7">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-60" style={{ backgroundImage: "url('/assets/img/shape/1.jpg')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 p-8 flex flex-col h-full justify-end">
              <h4 className="text-2xl font-bold text-white mb-3">ZoroBoost Community</h4>
              <p className="text-gray-300 text-sm mb-6">
                Join our massive network of trusted buyers and sellers in the premium digital marketplace.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                  <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                  <img src="https://i.pravatar.cc/100?img=47" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                  <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-amber-400 flex items-center justify-center text-black font-bold text-sm">
                    +
                  </div>
                </div>
                <h5 className="font-bold text-white text-sm">Over 50K+ Customers</h5>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
