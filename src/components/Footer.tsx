import { Gamepad2 } from 'lucide-react';

export default function Footer() {
  const cols = [
    { h: ' ', links: ['Help Center', 'Contact us', 'About us', 'Bug Bounty', 'Blog', 'Become a Partner', 'Become an Affiliate', 'Become a Seller'] },
    { h: ' ', links: ['Account Warranty', 'TradeShield (Buying)', 'TradeShield (Selling)', 'Withdrawals', 'Account Seller Rules'] },
    { h: ' ', links: ['Seller Rules', 'Changing Username', 'Fees', 'Refund Policy'] },
  ];

  return (
    <footer className="bg-[#0a0a0c] text-neutral-300 border-t border-white/5">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <a href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <div className="grid h-9 w-9 place-items-center rounded-md bg-amber-400 text-neutral-900">
              <Gamepad2 className="h-5 w-5" strokeWidth={2.75} />
            </div>
            <span className="text-xl font-bold text-white">ZoroBoost</span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-neutral-400">
            Join us today to level up your gaming experience!
          </p>
          <div className="mt-5 flex items-center gap-3 text-neutral-400">
            {['R', 'T', 'X', 'F', 'I', 'Y'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={`Social ${s}`}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#1c1c1f] text-xs font-bold hover:bg-[#26262a] hover:text-white"
                style={{ textDecoration: 'none' }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        {cols.map((col, i) => (
          <div key={i}>
            {col.h.trim() && <h3 className="text-sm font-semibold text-white">{col.h}</h3>}
            <ul className="space-y-3 text-sm text-neutral-400" style={{ listStyle: 'none', padding: 0 }}>
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
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()}. The ZoroBoost website is operated by ZoroBoost Ltd.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-neutral-400">
            <a href="#" className="hover:text-white" style={{ textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" className="hover:text-white" style={{ textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" className="hover:text-white" style={{ textDecoration: 'none' }}>DMCA</a>
            <a href="#" className="hover:text-white" style={{ textDecoration: 'none' }}>DSA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}