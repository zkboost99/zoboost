
import Script from 'next/script';
import type { Metadata } from "next";
import "./globals.css";
import LiveChatWidget from "@/components/LiveChatWidget";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fav icon.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground transition-colors duration-200">
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
        {children}
        <LiveChatWidget />
      </body>
    </html>
  );
}
