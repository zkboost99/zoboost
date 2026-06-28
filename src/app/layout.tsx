
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord Services Shop",
  description: "Buy aged accounts, server boosts, decoration, nitro, and server members.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackWidgets from "@/components/FeedbackWidgets";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/site icon.png" type="image/png" />
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
<link href="/assets/css/font-awesome.min.css" rel="stylesheet" />
<link href="/assets/css/validthemes-icon.css" rel="stylesheet" />
<link href="/assets/css/magnific-popup.css" rel="stylesheet" />
<link href="/assets/css/swiper-bundle.min.css" rel="stylesheet" />
<link href="/assets/css/animate.css" rel="stylesheet" />
<link href="/assets/css/validnavs.css" rel="stylesheet" />
<link href="/assets/css/helper.css" rel="stylesheet" />
<link href="/assets/css/unit-test.css" rel="stylesheet" />
<link href="/assets/css/style.css" rel="stylesheet" />
<link href="/style.css" rel="stylesheet" />

        <Script src="/assets/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
      </head>
      <body className="smooth-scroll-yes" suppressHydrationWarning>
        <Header />
        {children}
        <FeedbackWidgets />
        <Footer />
        <Script src="/assets/js/jquery.appear.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.easing.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/progress-bar.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/count-to.js" strategy="afterInteractive" />
        <Script src="/assets/js/YTPlayer.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/validnavs.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap.js" strategy="afterInteractive" />
        <Script src="/assets/js/lenis.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/SplitText.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
