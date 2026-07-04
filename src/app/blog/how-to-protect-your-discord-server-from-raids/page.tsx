import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StaticArticle() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
      <Header />
      
      {/* Article Hero */}
      <div className="relative pt-24 pb-16 bg-bg-secondary border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider mb-8 transition-colors" style={{ textDecoration: 'none' }}>
            <i className="fas fa-arrow-left"></i> Back to Blog
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Security</span>
            <span className="flex items-center gap-1.5"><i className="fas fa-calendar-alt opacity-70"></i> June 27, 2026</span>
            <span className="flex items-center gap-1.5"><i className="fas fa-clock opacity-70"></i> 5 min read</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            How to Protect Your Discord Server from Raids
          </h1>
          
          <div className="flex items-center gap-4 pt-6 border-t border-border-subtle">
            <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center overflow-hidden">
              <img src="/site icon.png" alt="Author" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="font-bold text-foreground">ZoroBoost Team</div>
              <div className="text-xs text-muted-foreground">Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-[900px] px-4 py-12 sm:px-6 lg:px-8 w-full">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl mb-12">
          <img src="/assets/img/blog/protect-discord-raids.png" alt="Blog Cover" className="w-full h-auto max-h-[500px] object-cover" />
        </div>
        
        <article className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-p:text-muted-foreground prose-li:text-muted-foreground">
          
        </article>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
             <span className="font-bold text-foreground">Share this post:</span>
             <div className="flex gap-2">
               <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 text-foreground flex items-center justify-center transition-colors"><i className="fab fa-twitter"></i></button>
               <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 text-foreground flex items-center justify-center transition-colors"><i className="fab fa-facebook-f"></i></button>
               <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 text-foreground flex items-center justify-center transition-colors"><i className="fas fa-link"></i></button>
             </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
