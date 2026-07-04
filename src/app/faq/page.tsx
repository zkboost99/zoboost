"use client";
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ChevronDown, ArrowRight } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = [
    {
      q: "How long does a Server Boost take to deliver?",
      a: "Our delivery is completely automated. Most Server Boosts and Nitro orders are delivered instantly upon successful payment. In rare cases, it might take up to 10 minutes during high volume periods."
    },
    {
      q: "Are the aged accounts secure and verified?",
      a: "Yes! All our aged accounts are fully Phone & Email verified. They come with original email access and have clean standing, ensuring you get the highest quality accounts without the risk of instant bans."
    },
    {
      q: "Do you offer refunds if a service drops?",
      a: "Absolutely. We offer a solid warranty period on our boosts and members. If you experience any drops within the warranty timeframe, simply reach out to our support team and we will refill or refund based on our policy."
    },
    {
      q: "How do Discord Server Members work and are they safe?",
      a: "Our Server Members service adds high-quality, realistic members to your community. We use secure and natural delivery patterns that fully comply with Discord's guidelines, ensuring your server remains safe and clean."
    },
    {
      q: "What is the difference between Nitro Boost, Nitro Basic, and Nitro Accounts?",
      a: "Nitro Boost provides premium Discord features including 2 monthly server boosts. Nitro Basic offers custom emojis and basic Nitro perks without boosts. Nitro Accounts are ready-made, pre-configured accounts containing an active Nitro subscription."
    },
    {
      q: "How do profile Decorations and Promo codes work?",
      a: "Decorations and Promo codes are delivered as gift links or codes. You can redeem them instantly on your personal account to style your profile or enjoy promotional Discord benefits."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept multiple secure payment options, including major Credit/Debit cards, PayPal, and cryptocurrencies like Bitcoin, Ethereum, and USDT to ensure a safe checkout process."
    },
    {
      q: "Is my account safe from getting banned?",
      a: "Yes, absolutely. All ZoroBoost services are developed and delivered with security as a priority. We do not require your account password for boosts, decorations, or member services, keeping your login credentials 100% private."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-bg-secondary pt-16 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider mb-6 transition-colors"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight m-0 drop-shadow-xl">
            Important FAQs
          </h1>
          <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Find answers to common questions about our services, delivery times, and guarantees.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            <h4 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Questions & Answers</h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight m-0">
              Have queries about our Discord Services?
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-2">
              If you can't find the answer you're looking for, feel free to reach out to our support team. We're available 24/7.
            </p>
            <div className="mt-4">
              <Link 
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-[#ffd13b] hover:bg-[#ffc83b] text-neutral-900 font-bold px-6 py-3.5 rounded shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ textDecoration: 'none' }}
              >
                Ask A Question <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-card border transition-colors duration-300 rounded-xl overflow-hidden ${openIndex === idx ? 'border-[#3b82f6]' : 'border-border hover:border-border'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-transparent border-none cursor-pointer text-foreground hover:text-primary transition-colors"
                >
                  <span className="font-bold text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-5 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/50 mx-5 mt-1">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
