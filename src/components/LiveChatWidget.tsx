"use client";
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

type ChatView = 'home' | 'help' | 'pre-chat' | 'chat-stream' | 'article';
type ArticleKey = 'refund' | 'tos' | 'privacy' | 'exchange';
type BottomTab = 'home' | 'help' | 'messages';

const ARTICLES: Record<ArticleKey, { title: string; subtitle: string; author: string; date: string; tocItems: string[]; content: string }> = {
  refund: {
    title: 'Refund & Return Policy',
    subtitle: "Learn about ZoroBoost's refund and return policies for accounts, boosting, currency, and items.",
    author: 'ZoroBoost',
    date: 'June 30, 2025',
    tocItems: ['Contact the Seller First', 'Refund Eligibility', 'Boost Drop & Refill Warranty', 'Non-Refundable Scenarios', 'How to Request a Refund'],
    content: `
<h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 8px 0">ZoroBoost Refund &amp; Return Policy 🪙</h3>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">This article explains ZoroBoost's refund and return policy across all service categories.</p>

<div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;padding:13px 15px;margin:0 0 18px 0;font-size:12.5px;color:#166534;line-height:1.6">
  ✅ <strong>Refund requests are only processed directly by our support team</strong> in the order chat, or handled by the ZoroBoost Resolution Team after a formal dispute is opened.
</div>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Contact the Seller First 🤝</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">Always contact our support team first through Live Chat or the order page if you wish to return a service or request a refund. Most issues are resolved within minutes.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Refund Eligibility</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 8px 0">Because our services are digital and consumed upon delivery, refunds are generally not offered once the service has been initiated. However, you may be eligible under these circumstances:</p>
<ul style="padding-left:20px;color:#4b5563;font-size:13px;line-height:1.7;margin:0 0 14px 0">
  <li style="margin-bottom:5px">The ordered service was not delivered within 48 hours of purchase.</li>
  <li style="margin-bottom:5px">The service was out of stock and could not be fulfilled.</li>
  <li style="margin-bottom:5px">A duplicate payment occurred due to a system error.</li>
</ul>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Boost Drop &amp; Refill Warranty</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 8px 0">Discord Server Boosts may occasionally drop when a boosting account is flagged by Discord. ZoroBoost covers all boost drops under our Refill Warranty:</p>
<ul style="padding-left:20px;color:#4b5563;font-size:13px;line-height:1.7;margin:0 0 14px 0">
  <li style="margin-bottom:5px">1-month or 3-month warranty coverage depending on your purchased package.</li>
  <li style="margin-bottom:5px">Free refill of dropped boosts as quickly as possible.</li>
  <li style="margin-bottom:5px">If we cannot refill within 72 hours, a pro-rata refund is issued for the remaining period.</li>
</ul>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Non-Refundable Scenarios</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 8px 0">We cannot issue refunds or refills in the following situations:</p>
<ul style="padding-left:20px;color:#4b5563;font-size:13px;line-height:1.7;margin:0 0 14px 0">
  <li style="margin-bottom:5px">Customer provided an incorrect Discord server invite link.</li>
  <li style="margin-bottom:5px">The Discord server was deleted or banned by Discord Inc.</li>
  <li style="margin-bottom:5px">The customer removed or banned the boosting accounts.</li>
  <li style="margin-bottom:5px">Nitro codes that have already been redeemed or claimed.</li>
  <li style="margin-bottom:5px">Accounts that were accessed, used, or modified after delivery.</li>
</ul>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">How to Request a Refund</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">To request a refund or warranty refill, open a Live Chat session or email us at <strong>support@zoroboost.com</strong> with your Order ID, purchase email, and a description of the issue.</p>
`
  },
  tos: {
    title: 'Terms of Service',
    subtitle: 'Understand your rights and responsibilities when using ZoroBoost.',
    author: 'ZoroBoost',
    date: 'June 30, 2025',
    tocItems: ['Acceptance of Terms', 'Services Description', 'User Obligations', 'Payment & Billing', 'Account Termination', 'Limitation of Liability'],
    content: `
<h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 8px 0">ZoroBoost Terms of Service 📜</h3>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">By using ZoroBoost, you agree to be legally bound by these Terms of Service. Please read them carefully before placing any order.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Acceptance of Terms</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">By accessing or placing an order on ZoroBoost (zoroboost.com), you confirm that you are at least 13 years of age, are the authorized owner of the payment method used, and agree to comply with these Terms and all applicable laws.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Services Description</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 8px 0">ZoroBoost provides the following digital services:</p>
<ul style="padding-left:20px;color:#4b5563;font-size:13px;line-height:1.7;margin:0 0 14px 0">
  <li style="margin-bottom:5px">Discord Server Boosts and Nitro Gift codes.</li>
  <li style="margin-bottom:5px">Aged Discord accounts and server member joins.</li>
  <li style="margin-bottom:5px">Premium streaming service accounts (e.g. Netflix).</li>
  <li style="margin-bottom:5px">Currency exchange services for digital platforms.</li>
</ul>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">Delivery timelines are estimates and may vary depending on service availability and queue status.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">User Obligations</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 8px 0">When using our services, you agree to:</p>
<ul style="padding-left:20px;color:#4b5563;font-size:13px;line-height:1.7;margin:0 0 14px 0">
  <li style="margin-bottom:5px">Provide accurate order information including your Discord server link.</li>
  <li style="margin-bottom:5px">Not remove or ban boosting accounts during active delivery.</li>
  <li style="margin-bottom:5px">Not misrepresent your identity or payment authorization.</li>
  <li style="margin-bottom:5px">Not initiate fraudulent chargebacks without first contacting support.</li>
</ul>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Payment &amp; Billing</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">All payments are processed securely. Prices are quoted in USD unless otherwise stated. Unauthorized chargebacks will result in immediate service cancellation and account blacklisting.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Limitation of Liability</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">ZoroBoost is not liable for losses arising from Discord bans, server deletions, or actions taken by third-party platforms. Our liability is limited to the amount paid for the affected order.</p>
`
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Learn how ZoroBoost collects, uses, and protects your personal information.',
    author: 'ZoroBoost',
    date: 'June 30, 2025',
    tocItems: ['Information We Collect', 'How We Use Your Data', 'Data Sharing', 'Data Security', 'Your Rights', 'Contact Us'],
    content: `
<h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 8px 0">ZoroBoost Privacy Policy 🔒</h3>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">Your privacy matters to us. This policy explains what data ZoroBoost (zoroboost.com) collects, why we collect it, and how it is protected.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Information We Collect</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 8px 0">When you use ZoroBoost, we may collect:</p>
<ul style="padding-left:20px;color:#4b5563;font-size:13px;line-height:1.7;margin:0 0 14px 0">
  <li style="margin-bottom:5px">Name and email address when creating an account or submitting a contact form.</li>
  <li style="margin-bottom:5px">Order details including service type, Discord information, and transaction records.</li>
  <li style="margin-bottom:5px">IP address and browser metadata for security verification purposes.</li>
  <li style="margin-bottom:5px">Chat messages exchanged with our support team.</li>
</ul>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">How We Use Your Data</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 8px 0">Your information is used to:</p>
<ul style="padding-left:20px;color:#4b5563;font-size:13px;line-height:1.7;margin:0 0 14px 0">
  <li style="margin-bottom:5px">Process and fulfill your orders.</li>
  <li style="margin-bottom:5px">Provide live support and resolve disputes.</li>
  <li style="margin-bottom:5px">Verify buyer identity and prevent fraud.</li>
  <li style="margin-bottom:5px">Send transactional emails such as order confirmations.</li>
</ul>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Data Sharing</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">ZoroBoost does not sell, rent, or share your personal information with third-party advertisers. Data may be shared only with payment processors and hosting providers under strict confidentiality agreements.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Data Security</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">All data is encrypted in transit using TLS/SSL. Our databases are secured with access controls and regular security audits. Chat logs and personal records are stored in protected server environments.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Your Rights</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">You may request access to, correction of, or deletion of your personal data at any time by contacting us at <strong>support@zoroboost.com</strong>. Data deletion requests are processed within 30 days.</p>
`
  },
  exchange: {
    title: 'Exchange Policy',
    subtitle: 'Guidelines for ZoroBoost currency exchange, conversions, and transfers.',
    author: 'ZoroBoost',
    date: 'June 30, 2025',
    tocItems: ['Exchange Rate Lock', 'Processing Times', 'Supported Currencies', 'Failed Exchanges', 'Cancellations'],
    content: `
<h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 8px 0">ZoroBoost Exchange Policy 💱</h3>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">This policy governs all currency exchange and transfer services offered through ZoroBoost. Read carefully before placing an exchange order.</p>

<div style="background:#fffbeb;border:1.5px solid #fcd34d;border-radius:10px;padding:13px 15px;margin:0 0 18px 0;font-size:12.5px;color:#92400e;line-height:1.6">
  ℹ️ Exchange rates are updated regularly. The rate displayed at checkout is the final locked rate for your transaction.
</div>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Exchange Rate Lock</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">The exchange rate shown when you place an order is locked for that transaction. If market rates change after you submit payment, your conversion is still honored at the rate agreed to at checkout.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Processing Times</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 8px 0">Most exchanges are completed quickly, but processing windows vary:</p>
<ul style="padding-left:20px;color:#4b5563;font-size:13px;line-height:1.7;margin:0 0 14px 0">
  <li style="margin-bottom:5px"><strong>Standard exchanges:</strong> 5 – 30 minutes.</li>
  <li style="margin-bottom:5px"><strong>High-volume orders:</strong> Up to 2 hours.</li>
  <li style="margin-bottom:5px">If not processed within 24 hours, you are entitled to a full return of funds.</li>
</ul>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Supported Currencies</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">ZoroBoost supports major fiat currencies including USD, EUR, GBP, PKR, AED, SAR, and more. Digital currency transfers follow the same rules as fiat exchanges.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Failed Exchanges</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">If an exchange fails due to a system error or network issue on our end, a full refund will be issued immediately. Contact our Live Support team with your transaction ID.</p>

<h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:20px 0 8px 0">Cancellations</h4>
<p style="font-size:13px;line-height:1.65;color:#4b5563;margin:0 0 14px 0">Once a transfer or exchange has been broadcast and confirmed by the recipient platform, it cannot be recalled or reversed. Ensure all account details are correct before submitting your order.</p>
`
  }
};

// ── Inline SVG tab icons (no FA dependency) ──────────────────────────
const IcoHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);
const IcoHelp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IcoMsg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IcoClose = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcoBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IcoMinimize = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IcoExpand = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M15 3h6v6" />
    <path d="M9 21H3v-6" />
    <path d="M21 3l-7 7" />
    <path d="M3 21l7-7" />
  </svg>
);
const IcoSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IcoArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IcoSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
// ─────────────────────────────────────────────────────────────────────

const HELP_TOPICS: { key: ArticleKey; label: string }[] = [
  { key: 'refund', label: 'Refund & Return Policy' },
  { key: 'tos', label: 'Terms of Service' },
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'exchange', label: 'Exchange Policy' }
];

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [view, setView] = useState<ChatView>('home');
  const [activeTab, setActiveTab] = useState<BottomTab>('home');
  const [activeArticle, setActiveArticle] = useState<ArticleKey>('refund');
  const [tocOpen, setTocOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([{
    sender: 'agent',
    text: 'Hi there! 👋 Welcome to ZoroBoost Live Support. How can we help you today?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }]);
  const [input, setInput] = useState('');
  const [contactId, setContactId] = useState<string | null>(null);

  // Pre-chat
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBuyer, setIsBuyer] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [chatStarted, setChatStarted] = useState(false);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const streamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedId = localStorage.getItem('zoroboost_chat_id');
    if (savedId) {
      setContactId(savedId);
      setChatStarted(true);
      fetch(`/api/admin/contacts?id=${savedId}`)
        .then(r => r.status === 404 ? null : r.json())
        .then(d => {
          if (d?.success && d.contact) {
            try {
              const p = JSON.parse(d.contact.message);
              if (p?.type === 'chat' && p.messages) setMessages(p.messages);
            } catch {}
          }
        }).catch(() => {});
    }
    const open = () => { setIsOpen(true); setIsClosing(false); setIsMinimized(false); setView('home'); setActiveTab('home'); };
    const close = () => { closeWidget(); };
    const toggle = () => {
      setIsOpen(current => {
        if (current) {
          closeWidget();
        } else {
          setIsOpen(true);
          setIsClosing(false);
          setIsMinimized(false);
          setView('home');
          setActiveTab('home');
        }
        return current;
      });
    };
    window.addEventListener('openLiveChat', open);
    window.addEventListener('closeLiveChat', close);
    window.addEventListener('toggleLiveChat', toggle);
    return () => {
      window.removeEventListener('openLiveChat', open);
      window.removeEventListener('closeLiveChat', close);
      window.removeEventListener('toggleLiveChat', toggle);
    };
  }, []);

  useEffect(() => {
    const isActuallyOpen = isOpen && !isClosing && !isMinimized;
    window.dispatchEvent(new CustomEvent('liveChatStateChanged', { detail: { isOpen: isActuallyOpen } }));
  }, [isOpen, isClosing, isMinimized]);

  useEffect(() => {
    if (!isOpen || !contactId || view !== 'chat-stream') return;
    const iv = setInterval(() => {
      fetch(`/api/admin/contacts?id=${contactId}`)
        .then(r => r.status === 404 ? null : r.json())
        .then(d => {
          if (d?.success && d.contact) {
            try {
              const p = JSON.parse(d.contact.message);
              if (p?.type === 'chat' && p.messages?.length !== messages.length) setMessages(p.messages);
            } catch {}
          }
        }).catch(() => {});
    }, 3000);
    return () => clearInterval(iv);
  }, [isOpen, contactId, view, messages.length]);

  useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [messages, view]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const t = e.target as HTMLElement;
    if (t.closest('button') || t.closest('input') || t.closest('select') || t.closest('a') || t.closest('.no-drag')) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    const move = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const W = 340, H = 610;
      const defL = window.innerWidth - W - 24;
      const defT = window.innerHeight - H - 90;
      const ax = defL + (ev.clientX - dragStart.current.x);
      const ay = defT + (ev.clientY - dragStart.current.y);
      setPosition({ x: Math.max(0, Math.min(window.innerWidth - W, ax)) - defL, y: Math.max(0, Math.min(window.innerHeight - H, ay)) - defT });
    };
    const up = () => { isDragging.current = false; document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const closeWidget = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false); setIsClosing(false);
      localStorage.removeItem('zoroboost_chat_id');
      setContactId(null); setChatStarted(false);
      setName(''); setEmail(''); setOrderId(''); setIsBuyer(false);
      setView('home'); setActiveTab('home');
      setMessages([{ sender: 'agent', text: 'Hi there! 👋 Welcome to ZoroBoost Live Support. How can we help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 380);
  };

  const startChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, email, message: JSON.stringify({ type: 'chat', isBuyer, orderId: isBuyer ? orderId : undefined, messages }), status: 'Unread' };
    try {
      const r = await fetch('/api/admin/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const d = await r.json();
      if (d.success && d.contact) { localStorage.setItem('zoroboost_chat_id', d.contact.id); setContactId(d.contact.id); }
    } catch {}
    setChatStarted(true); setView('chat-stream'); setActiveTab('messages');
  };

  const sendMsg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg: Message = { sender: 'user', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updated = [...messages, msg];
    setMessages(updated); setInput('');
    const body = JSON.stringify({ type: 'chat', isBuyer, orderId: isBuyer ? orderId : undefined, messages: updated });
    try {
      if (!contactId) {
        const r = await fetch('/api/admin/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name || 'Guest', email: email || 'guest@chat.com', message: body, status: 'Unread' }) });
        const d = await r.json();
        if (d.success && d.contact) { localStorage.setItem('zoroboost_chat_id', d.contact.id); setContactId(d.contact.id); }
      } else {
        await fetch('/api/admin/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: contactId, message: body, status: 'Unread' }) });
      }
    } catch {}
  };

  const goToArticle = (key: ArticleKey) => { setActiveArticle(key); setView('article'); setTocOpen(false); };
  const goToMessages = () => { chatStarted ? setView('chat-stream') : setView('pre-chat'); setActiveTab('messages'); };

  if (!isOpen) return null;

  const W = 340, H = 610;

  if (isMinimized) return (
    <div onClick={() => setIsMinimized(false)} style={{ position: 'fixed', bottom: 24, right: 24, height: 52, padding: '0 20px', borderRadius: 26, background: 'linear-gradient(135deg,#d97706,#fbbf24)', color: '#fff', boxShadow: '0 8px 24px rgba(217,119,6,0.35)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', zIndex: 9999, fontWeight: 700, fontSize: 13.5 }}>
      <i className="fas fa-comments" style={{ fontSize: 17 }} />
      <span>Chat Support</span>
    </div>
  );

  const a = ARTICLES[activeArticle];

  return (
    <div style={{ position: 'fixed', bottom: 90, right: 24, width: W, height: H, zIndex: 9999, transform: `translate(${position.x}px,${position.y}px)`, display: 'flex', flexDirection: 'column', borderRadius: 10, boxShadow: '0 24px 60px rgba(0,0,0,0.18)', overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif", animation: isClosing ? 'zb-close 0.38s cubic-bezier(0.8,0,0.2,1) forwards' : 'zb-open 0.45s cubic-bezier(0.16,1,0.3,1) forwards' }}>

      <style>{`
        @keyframes zb-open{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes zb-close{from{opacity:1;transform:scale(1)}to{opacity:0;transform:translateY(16px) scale(0.94)}}
        .zb-tab-btn{background:none;border:none;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;padding:6px 22px;font-size:11.5px;font-weight:600;transition:color .15s;color:#94a3b8;line-height:1}
        .zb-tab-btn.active{color:#d97706}
        .zb-tab-btn i{font-size:20px}
        .zb-help-row{display:flex;align-items:center;padding:11px 0;border-bottom:1px solid #f1f5f9;cursor:pointer;gap:10px;transition:background .12s}
        .zb-help-row:last-child{border-bottom:none}
        .zb-help-row:hover{background:#f8fafc;margin:0 -18px;padding-left:18px;padding-right:18px;border-radius:6px}
        .zb-send-btn{display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;cursor:pointer;transition:box-shadow .15s;box-shadow:0 1px 4px rgba(0,0,0,0.05)}
        .zb-send-btn:hover{box-shadow:0 4px 14px rgba(0,0,0,0.1)}
        .zb-article-body h3,.zb-article-body h4{margin-top:0}
        .zb-toc-item{padding:6px 0;font-size:12.5px;color:#d97706;cursor:pointer;border-bottom:1px solid #f1f5f9}
        .zb-toc-item:last-child{border-bottom:none}
        .zb-msg-input{flex:1;height:36px;border:1px solid #e2e8f0;border-radius:10px;padding:0 12px;font-size:13px;outline:none;background:#fff;color:#1e293b;font-family:inherit}
        .zb-msg-input:focus{border-color:#d97706;box-shadow:0 0 0 3px rgba(217,119,6,0.08)}
      `}</style>

      {/* ══════════════════════════════════
          ARTICLE VIEW
      ══════════════════════════════════ */}
      {view === 'article' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: '1px solid #f1f5f9', background: '#fff', flexShrink: 0 }}>
            <button onClick={() => setView(activeTab === 'home' ? 'home' : 'help')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 6px' }}>
              <IcoBack />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                <IcoExpand />
              </button>
              <button onClick={closeWidget} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                <IcoClose size={18} />
              </button>
            </div>
          </div>

          {/* Article scroll body */}
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '22px 20px 16px' }}>
            {/* Title block */}
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.25 }}>{a.title}</h2>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55, margin: '0 0 18px 0' }}>{a.subtitle}</p>

            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#d97706,#fbbf24)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>ZB</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#334155' }}>Written by {a.author}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{a.date}</div>
              </div>
            </div>

            <div style={{ height: 1, background: '#f1f5f9', marginBottom: 16 }} />

            {/* Table of contents */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, marginBottom: 20, overflow: 'hidden' }}>
              <div className="no-drag" onClick={() => setTocOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', background: '#f8fafc', fontWeight: 700, fontSize: 13, color: '#334155' }}>
                <span>Table of contents</span>
                <i className={`fas fa-chevron-${tocOpen ? 'up' : 'down'}`} style={{ fontSize: 11, color: '#94a3b8', transition: 'transform .2s' }} />
              </div>
              {tocOpen && (
                <div style={{ padding: '4px 16px 8px' }}>
                  {a.tocItems.map((item, i) => (
                    <div key={i} className="zb-toc-item">{i + 1}. {item}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Article HTML */}
            <div className="zb-article-body" dangerouslySetInnerHTML={{ __html: a.content }} />
          </div>

          {/* Bottom nav */}
          <div style={{ borderTop: '1px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 58, flexShrink: 0 }}>
            <button className={`zb-tab-btn ${activeTab === 'home' ? 'active' : ''}`} style={{ color: activeTab === 'home' ? '#d97706' : '#94a3b8' }} onClick={() => { setView('home'); setActiveTab('home'); }}>
              <IcoHome /><span>Home</span>
            </button>
            <button className={`zb-tab-btn ${activeTab === 'help' ? 'active' : ''}`} style={{ color: activeTab === 'help' ? '#d97706' : '#94a3b8' }} onClick={() => { setView('help'); setActiveTab('help'); }}>
              <IcoHelp /><span>Help</span>
            </button>
            <button className={`zb-tab-btn ${activeTab === 'messages' ? 'active' : ''}`} style={{ color: activeTab === 'messages' ? '#d97706' : '#94a3b8' }} onClick={goToMessages}>
              <IcoMsg /><span>Messages</span>
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          HELP LIST VIEW
      ══════════════════════════════════ */}
      {view === 'help' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Help Center</span>
            <button onClick={closeWidget} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IcoClose size={18} />
            </button>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 18px' }}>
            {/* Search box */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: 10, padding: '10px 14px', marginBottom: 18, gap: 10 }}>
              <IcoSearch />
              <span style={{ fontSize: 13, color: '#94a3b8' }}>Search for help</span>
            </div>
            {/* Topics */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '4px 18px' }}>
              {HELP_TOPICS.map((t) => (
                <div key={t.key} className="zb-help-row" onClick={() => goToArticle(t.key)}>
                  <span style={{ flexGrow: 1, fontSize: 13, color: '#334155', fontWeight: 500 }}>{t.label}</span>
                  <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#cbd5e1' }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 58, flexShrink: 0 }}>
            <button className="zb-tab-btn" onClick={() => { setView('home'); setActiveTab('home'); }}><IcoHome /><span>Home</span></button>
            <button className="zb-tab-btn active" style={{ color: '#d97706' }} onClick={() => { setView('help'); setActiveTab('help'); }}><IcoHelp /><span>Help</span></button>
            <button className="zb-tab-btn" onClick={goToMessages}><IcoMsg /><span>Messages</span></button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          HOME VIEW
      ══════════════════════════════════ */}
      {view === 'home' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Gradient Header — draggable */}
          <div
            onMouseDown={handleDragStart}
            style={{ background: 'linear-gradient(145deg,#1c1408 0%,#92400e 55%,#f59e0b 100%)', padding: '20px 18px 22px', cursor: 'move', flexShrink: 0, position: 'relative' }}
          >
            {/* Logo + X */}
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src="/fav.png" alt="ZB" style={{ width: 22, height: 22, objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '0.2px' }}>ZoroBoost</span>
              </div>
              <button onClick={closeWidget} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                <IcoClose size={18} color="rgba(255,255,255,0.85)" />
              </button>
            </div>



            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 4px 0', lineHeight: 1.2 }}>Hi there 🤍</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', margin: 0, fontWeight: 500 }}>How can we help?</p>
          </div>

          {/* Body cards */}
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 16px 8px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Card 1 — Send a message */}
            <div className="no-drag zb-send-btn" onClick={goToMessages}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Send us a message</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 1 }}>Typically replies in under 1 min</div>
              </div>
            </div>

            {/* Card 2 — Search / Help topics */}
            <div className="no-drag" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              {/* Search bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid #f1f5f9', cursor: 'default' }}>
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Search for help</span>
                <i className="fas fa-search" style={{ color: '#94a3b8', fontSize: 13 }} />
              </div>
              {/* Topics */}
              <div style={{ padding: '0 16px' }}>
                {HELP_TOPICS.map((t) => (
                  <div key={t.key} className="zb-help-row" onClick={() => { goToArticle(t.key); setActiveTab('help'); }}>
                    <span style={{ flexGrow: 1, fontSize: 13, color: '#334155', fontWeight: 500 }}>{t.label}</span>
                    <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#cbd5e1' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom nav */}
          <div style={{ borderTop: '1px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 58, flexShrink: 0 }}>
            <button className="zb-tab-btn active" style={{ color: '#d97706' }} onClick={() => { setView('home'); setActiveTab('home'); }}>
              <IcoHome /><span>Home</span>
            </button>
            <button className="zb-tab-btn" onClick={() => { setView('help'); setActiveTab('help'); }}>
              <IcoHelp /><span>Help</span>
            </button>
            <button className="zb-tab-btn" onClick={goToMessages}>
              <IcoMsg /><span>Messages</span>
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          PRE-CHAT FORM
      ══════════════════════════════════ */}
      {view === 'pre-chat' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
            <button onClick={() => { setView('home'); setActiveTab('home'); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IcoBack />
            </button>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a' }}>Start a Conversation</span>
            <button onClick={closeWidget} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IcoClose size={18} />
            </button>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#d97706,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', overflow: 'hidden' }}>
                <img src="/fav.png" alt="ZB" style={{ width: 34, objectFit: 'contain' }} />
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>Live Support</h4>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Fill in your details to begin chatting with our team.</p>
            </div>
            <form onSubmit={startChat} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[{ label: 'Full Name', type: 'text', value: name, set: setName, ph: 'Your name...' }, { label: 'Email Address', type: 'email', value: email, set: setEmail, ph: 'your@email.com' }].map(f => (
                <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
                  <label style={{ fontSize: 10.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} required value={f.value} onChange={e => f.set(e.target.value)} style={{ height: 38, borderRadius: 9, border: '1px solid #e2e8f0', paddingLeft: 12, fontSize: 13, color: '#1e293b', background: '#fff', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
                <label style={{ fontSize: 10.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Are you a Buyer?</label>
                <select value={isBuyer ? 'buyer' : 'general'} onChange={e => setIsBuyer(e.target.value === 'buyer')} style={{ height: 38, borderRadius: 9, border: '1px solid #e2e8f0', paddingLeft: 12, fontSize: 13, color: '#1e293b', background: '#fff', outline: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
                  <option value="general">No — General / Pre-Sale Inquiry</option>
                  <option value="buyer">Yes — I Have Already Purchased</option>
                </select>
              </div>
              {isBuyer && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
                  <label style={{ fontSize: 10.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Order ID (Optional)</label>
                  <input type="text" placeholder="e.g. ORD-1086" value={orderId} onChange={e => setOrderId(e.target.value)} style={{ height: 38, borderRadius: 9, border: '1px solid #e2e8f0', paddingLeft: 12, fontSize: 13, color: '#1e293b', background: '#fff', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              )}
              <button type="submit" style={{ marginTop: 4, width: '100%', height: 42, borderRadius: 10, background: 'linear-gradient(135deg,#d97706,#f59e0b)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 14px rgba(217,119,6,0.25)', transition: 'opacity .15s', fontFamily: 'inherit' }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.9')} onMouseOut={e => (e.currentTarget.style.opacity = '1')}>
                Start Chat &nbsp;<IcoArrowRight />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          CHAT STREAM
      ══════════════════════════════════ */}
      {view === 'chat-stream' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderBottom: '1px solid #f1f5f9', gap: 10, flexShrink: 0, background: '#fff' }}>
            <button onClick={() => { setView('home'); setActiveTab('home'); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IcoBack />
            </button>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#d97706,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              <img src="/fav.png" alt="ZB" style={{ width: 22, objectFit: 'contain' }} />
            </div>
            <div style={{ flexGrow: 1, textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>ZoroBoost Support</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: 11, color: '#64748b' }}>Online — replies in under 1 min</span>
              </div>
            </div>
            <button onClick={() => setIsMinimized(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IcoMinimize />
            </button>
            <button onClick={closeWidget} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IcoClose size={18} />
            </button>
          </div>

          <div ref={streamRef} style={{ flexGrow: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, background: '#f8fafc' }}>
            {messages.map((msg, i) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={i} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
                  {!isUser && <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#d97706,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, marginRight: 8, alignSelf: 'flex-end' }}><img src="/fav.png" alt="ZB" style={{ width: 17, objectFit: 'contain' }} /></div>}
                  <div style={{ maxWidth: '75%', padding: '9px 13px', borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isUser ? 'linear-gradient(135deg,#d97706,#b45309)' : '#fff', color: isUser ? '#fff' : '#1e293b', fontSize: 13, lineHeight: 1.45, boxShadow: '0 1px 3px rgba(0,0,0,0.07)', textAlign: 'left' }}>
                    <div>
                      {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => 
                        /(https?:\/\/[^\s]+)/g.test(part) ? 
                        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', wordBreak: 'break-all' }}>{part}</a> : 
                        <span key={i}>{part}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 9.5, color: isUser ? 'rgba(255,255,255,0.6)' : '#94a3b8', textAlign: 'right', marginTop: 4 }}>{msg.time}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={sendMsg} style={{ padding: '12px 14px', borderTop: '1px solid #f1f5f9', background: '#fff', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
            <input className="zb-msg-input" type="text" placeholder="Write a message…" value={input} onChange={e => setInput(e.target.value)} />
            <button type="submit" style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#d97706,#f59e0b)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IcoSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}



