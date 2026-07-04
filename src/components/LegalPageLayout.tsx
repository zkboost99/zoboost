import Link from 'next/link';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface Section {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  icon: string;
  currentPage: string;
  sections: Section[];
  children: ReactNode;
  lastUpdated?: string;
}

const legalPages = [
  { href: '/terms-and-conditions', label: 'Terms & Conditions', icon: '📋' },
  { href: '/privacy-policy', label: 'Privacy Policy', icon: '🔒' },
  { href: '/refund-policy', label: 'Refund Policy', icon: '💰' },
  { href: '/cookies-policy', label: 'Cookies Policy', icon: '🍪' },
  { href: '/disclaimer', label: 'Disclaimer', icon: '⚠️' },
];

export default function LegalPageLayout({
  title,
  subtitle,
  icon,
  currentPage,
  sections,
  children,
  lastUpdated = 'January 2025',
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(251,191,36,0.08),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
            <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">{title}</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-2xl flex-shrink-0 mt-1">
              {icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                {title}
              </h1>
              <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed">{subtitle}</p>
              <div className="flex items-center gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-white/30 bg-white/5 border border-white/8 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  Last updated: {lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

          {/* Sidebar */}
          <aside className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-8 space-y-4">

              {/* Table of Contents */}
              {sections.length > 0 && (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((s, i) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                      >
                        <span className="w-5 h-5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 text-[10px] font-bold flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                          {i + 1}
                        </span>
                        <span className="leading-tight">{s.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Legal Pages Navigation */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                  Legal Documents
                </h3>
                <nav className="space-y-1">
                  {legalPages.map((page) => {
                    const isActive = page.href === currentPage;
                    return (
                      <Link
                        key={page.href}
                        href={page.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            : 'text-white/50 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-base">{page.icon}</span>
                        <span className="font-medium">{page.label}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Help Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-5">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/5 rounded-full -translate-y-6 translate-x-6" />
                <div className="text-xl mb-3">💬</div>
                <h3 className="text-sm font-bold text-white mb-2">Need Help?</h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4">
                  Questions about our legal agreements? We&apos;re here to help.
                </p>
                <a
                  href="mailto:info@zoroboost.com"
                  className="block text-xs font-semibold text-yellow-400 mb-3 hover:text-yellow-300 transition-colors truncate"
                >
                  info@zoroboost.com
                </a>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 text-xs font-bold bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Contact Us <span>→</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
              <div className="p-6 md:p-10 lg:p-12">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

/* Sub-components for content formatting */
export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="flex items-start gap-4 mb-5">
        <span className="w-8 h-8 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 text-sm font-bold flex-shrink-0 mt-0.5">
          {number}
        </span>
        <h2 className="text-lg md:text-xl font-bold text-white leading-snug pt-0.5">{title}</h2>
      </div>
      <div className="pl-12 space-y-4 text-white/60 leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  );
}

export function LegalDivider() {
  return <div className="border-t border-white/[0.05] my-8" />;
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 flex-shrink-0 mt-2"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
