import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Zap, ShieldCheck, Clock } from 'lucide-react';

export default function AboutUs() {
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
            About Us
          </h1>
          <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Discover how ZoroBoost is revolutionizing Discord community growth with premium, fast, and secure services.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 w-full">
        
        {/* About Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="flex flex-col gap-6">
            <div className="inline-block">
              <span className="bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                ZoroBoost
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight m-0">
              Unlock limitless server growth with our premium Discord services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              ZoroBoost is dedicated to helping Discord communities and server owners achieve unprecedented growth. We provide high-quality Server Boosts, Aged Accounts, Nitro, and Real Server Members at the most competitive prices in the market. 
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're looking to unlock level 3 perks or build a massive community, ZoroBoost guarantees fast, secure, and reliable delivery to meet all your Discord needs.
            </p>
            <div className="mt-4">
              <Link 
                href="/server-boosts" 
                className="inline-flex items-center gap-2 bg-[#ffd13b] text-neutral-900 hover:bg-[#ffc83b] font-bold px-6 py-3.5 rounded shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ textDecoration: 'none' }}
              >
                Explore Boosts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#3b82f6]/20 to-transparent rounded-2xl blur-xl" />
            <div className="bg-card border border-border rounded-2xl p-8 relative shadow-2xl flex flex-col items-center justify-center text-center">
              <img src="/assets/img/illustration/4.png" alt="Instant Delivery" className="max-h-64 object-contain mb-8 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
              <h3 className="text-xl font-bold text-foreground mb-3">Instant Delivery to your Server</h3>
              <p className="text-muted-foreground text-sm">
                Our automated systems ensure that your server boosts and Nitro orders are processed and delivered in record time.
              </p>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-[#19202e] border border-[#3b82f6]/30 rounded-xl p-5 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="text-2xl font-black text-foreground">28K+</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-bg-secondary border border-border rounded-2xl p-8 sm:p-12 relative overflow-hidden">

          
          <div className="text-center mb-12 relative z-10">
            <h4 className="text-primary text-sm font-bold uppercase tracking-wider mb-3">How it works</h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Growing your server is as easy as 1-2-3</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-[#3b82f6]/30 transition-colors">
              <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center text-2xl font-black text-primary mb-6">
                01
              </div>
              <h4 className="text-lg font-bold text-foreground mb-4">Select Your Service</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Browse our extensive catalog of Discord services, including Server Boosts, Nitro, and Aged Accounts. Choose the package that fits your needs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-[#3b82f6]/30 transition-colors">
              <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center text-2xl font-black text-primary mb-6">
                02
              </div>
              <h4 className="text-lg font-bold text-foreground mb-4">Secure Checkout</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Complete your purchase using our secure payment gateways. We offer multiple payment methods to ensure a smooth and safe transaction process.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-[#3b82f6]/30 transition-colors">
              <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center text-2xl font-black text-primary mb-6">
                03
              </div>
              <h4 className="text-lg font-bold text-foreground mb-4">Instant Delivery</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Sit back and relax as our automated systems deliver your order instantly. Watch your server level up and your community grow in real-time.
              </p>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
