import Image from 'next/image';
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const cols = [
    { 
      h: 'Products', 
      links: [
        { label: 'Discord Accounts', href: '/discord-accounts' },
        { label: 'Server Boosts', href: '/server-boosts' },
        { label: 'Server Members', href: '/server-members' },
        { label: 'Discord Nitro', href: '/discord-nitro' },
      ] 
    },
    { 
      h: 'Services', 
      links: [
        { label: 'Decorations', href: '/decorations' },
        { label: 'Netflix Premium', href: '/netflix' },
        { label: 'Money Exchange', href: '/money-exchange' },
      ] 
    },
    { 
      h: 'Support & Info', 
      links: [
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'About Us', href: '/about-us' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Blog', href: '/blog' },
      ] 
    },
    { 
      h: 'Legal', 
      links: [
        { label: 'Terms & Conditions', href: '/terms-and-conditions' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Refund Policy', href: '/refund-policy' },
        { label: 'Cookies Policy', href: '/cookies-policy' },
        { label: 'Disclaimer', href: '/disclaimer' },
      ] 
    },
  ];

  return (
    <footer className="bg-bg-deep text-muted-foreground border-t border-border-subtle transition-colors duration-200 mt-auto">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-5 lg:px-8">
        <div>
          <Link href="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <Image 
              src="/zoroboost-logo.png" 
              alt="ZoroBoost Logo" 
              width={160} 
              height={40} 
              className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-all dark:bg-white/90 dark:p-1 dark:rounded-md"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Join us today to level up your gaming experience with premium Discord services!
          </p>
          <div className="mt-5 flex items-center gap-3 text-muted-foreground">
            {['X', 'IG', 'YT', 'FB'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={`Social ${s}`}
                className="grid h-8 w-8 place-items-center rounded-full bg-card text-[10px] font-bold hover:bg-neutral-800/10 dark:hover:bg-white/5 text-foreground transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        {cols.map((col, i) => (
          <div key={i}>
            {col.h.trim() && <h3 className="text-sm font-semibold text-foreground mb-4">{col.h}</h3>}
            <ul className="space-y-3 text-sm text-muted-foreground" style={{ listStyle: 'none', padding: 0 }}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-amber-400 transition-colors" style={{ textDecoration: 'none' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-6 text-xs text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()}. The ZoroBoost website is operated by ZoroBoost Ltd.
          </p>
          <div className="flex items-center text-muted-foreground">
            <p className="m-0">
              Developed by <a href="https://udesigner.net" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-500 font-bold transition-colors" style={{ textDecoration: 'none' }}>UDESIGNER</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}