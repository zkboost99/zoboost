import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: 'Zooro Boost – What Is a Discord Aged Account Service, Server Boosts for Discord, and Discord Decorations?',
      image: '/assets/img/blog/zoroboost-guide.png',
      category: 'Discord',
      date: '26 June, 2026',
      slug: 'zooro-boost-discord-aged-account-service'
    },
    {
      title: 'Discord Server Boosts Explained: Are They Worth It for Growing Communities?',
      image: '/assets/img/blog/discord-server-boost.png',
      category: 'Server Boosts',
      date: '27 June, 2026',
      slug: 'discord-server-boosts-explained'
    },
    {
      title: 'How to Protect Your Discord Server from Raids',
      image: '/assets/img/blog/protect-discord-raids.png',
      category: 'Security',
      date: '28 June, 2026',
      slug: 'how-to-protect-your-discord-server-from-raids'
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
            Discord Growth Blog
          </h1>
          <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Latest tips, tricks, and guides on growing and managing your Discord communities effectively.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:border-[#3b82f6]/50 transition-colors group flex flex-col">
              <div className="relative h-48 w-full overflow-hidden bg-bg-secondary">
                <Link href={`/blog/${post.slug}`}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-3 group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </h3>
                <div className="mt-auto pt-4 border-t border-border">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                    style={{ textDecoration: 'none' }}
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
              &laquo;
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-bg-secondary font-bold cursor-pointer transition-colors">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
              &raquo;
            </button>
          </nav>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
