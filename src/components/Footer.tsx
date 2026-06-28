import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0f0f10]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {[
          { h: 'ZoroBoost', links: ['About Us', 'Careers', 'Press', 'Blog'] },
          { h: 'Support', links: ['Help Center', '24/7 Live Chat', 'Contact', 'FAQ'] },
          { h: 'Sellers', links: ['Become a Seller', 'Seller Hub', 'Fees', 'Guidelines'] },
          { h: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'Trust & Safety'] },
        ].map((col) => (
          <div key={col.h}>
            <h3 className="text-sm font-semibold text-white">{col.h}</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400" style={{ listStyle: 'none', padding: 0 }}>
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white" style={{ textDecoration: 'none' }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} ZoroBoost. All rights reserved.</p>
          <p>Player-to-player Discord services marketplace · Secure Escrow Protected</p>
        </div>
      </div>
    </footer>
  );
}