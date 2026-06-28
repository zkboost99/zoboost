import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/site icon.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-[#0f0f10]">
        {children}
      </body>
    </html>
  );
}
