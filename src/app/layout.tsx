
import Script from 'next/script';
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import LiveChatWidget from '@/components/LiveChatWidget';
import { ViewTransitions } from 'next-view-transitions';
import NextTopLoader from 'nextjs-toploader';

// Self-hosted fonts — eliminates external Google Fonts HTTP requests
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "ZoroBoost — Discord Accounts, Boosts, Members & Customizations",
  description: "Buy and sell Discord accounts, boosts, members, and customizations on the safest player-to-player marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <head>
          <link rel="icon" href="/fav icon.png" type="image/png" />
        </head>
        <body className="antialiased min-h-screen bg-background text-foreground transition-colors duration-200" suppressHydrationWarning>
          <Script
            id="theme-switcher"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (theme === 'light') {
                      document.documentElement.classList.add('light');
                    } else {
                      document.documentElement.classList.remove('light');
                    }
                  } catch (e) {}
                })();
              `,
            }}
          />
          {/* Slim amber progress bar on every page navigation */}
          <NextTopLoader
            color="#FBBF24"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #FBBF24,0 0 5px #FBBF24"
          />
          {children}
          <LiveChatWidget />
        </body>
      </html>
    </ViewTransitions>
  );
}
