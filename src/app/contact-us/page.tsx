'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Inline SVGs
const SvgDiscord = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
);
const SvgEnvelope = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);
const SvgExternal = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
);
const SvgSpinner = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
);
const SvgArrowRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
);
const SvgArrowLeft = ({ className = "w-3 h-3" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
);
const SvgTicket = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
);
const SvgTimes = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);
const SvgHeadset = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
);

export default function ContactUs() {
  // General Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryComments, setInquiryComments] = useState('');
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Ticket Modal State
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState({ name: '', email: '' });
  const [selectedDept, setSelectedDept] = useState('General Support');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- GENERAL INQUIRY SUBMIT ---
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInquirySubmitting(true);
    setToast(null);

    try {
      const payload = {
        name: inquiryName,
        email: inquiryEmail,
        message: inquiryComments,
        status: 'Unread'
      };

      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setToast({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setInquiryName('');
        setInquiryEmail('');
        setInquiryComments('');
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Network error occurred. Please try again.' });
    } finally {
      setIsInquirySubmitting(false);
    }
  };

  // --- TICKET MODAL LOGIC ---
  const openTicketModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    setToast(null);
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      // Format payload to look like a Chat message so the Admin Panel natively displays it in Messages
      const payload = {
        name: ticketData.name,
        email: ticketData.email,
        message: JSON.stringify({
          type: 'chat',
          dept: selectedDept, // sets the tag in admin panel
          messages: [
            {
              sender: 'user',
              text: `**Ticket: ${subject}**\n\n${message}`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        }),
        status: 'Unread'
      };

      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setToast({ type: 'success', message: 'Ticket submitted successfully! Our support team will respond shortly.' });
        setTimeout(() => {
          closeTicketModal();
        }, 2000);
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to submit ticket.' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Network error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- LIVE CHAT DISPATCH ---
  const openLiveChat = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('toggleLiveChat'));
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col relative">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-bg-secondary pt-16 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider mb-6 transition-colors"
          >
            <SvgArrowLeft /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight m-0 drop-shadow-xl">
            Get In Touch
          </h1>
          <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Need help with your order? Our support team is here to assist you 24/7.
          </p>
        </div>
      </div>

      <main className="flex-1 mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 w-full flex flex-col gap-16 relative z-10">
        
        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground leading-tight mb-4">
                We're here to help you.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Reach out to us through our official channels. For the fastest response, join our Discord server and open a ticket.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
                  <SvgDiscord />
                </div>
                <div>
                  <h5 className="font-bold text-foreground text-lg mb-1">Discord Support Server</h5>
                  <a href="https://discord.gg/zoroboost" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 transition-colors font-medium">
                    discord.gg/zoroboost <SvgExternal />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <SvgEnvelope />
                </div>
                <div>
                  <h5 className="font-bold text-foreground text-lg mb-1">Official Email</h5>
                  <a href="mailto:info@zoroboost.com" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 transition-colors font-medium">
                    info@zoroboost.com <SvgExternal />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-foreground mb-2">Send us a message</h3>
              <p className="text-muted-foreground text-sm mb-6">Have a question about Server Boosts, Nitro, or bulk orders? Fill out the form below.</p>
              
              <form onSubmit={handleInquirySubmit} className="flex flex-col gap-5">
                <div>
                  <input 
                    className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" 
                    type="text" placeholder="Discord Username (e.g. wumpus#1234)" 
                    value={inquiryName} onChange={(e) => setInquiryName(e.target.value)} required disabled={isInquirySubmitting}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input 
                      className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" 
                      type="email" placeholder="Email Address*" 
                      value={inquiryEmail} onChange={(e) => setInquiryEmail(e.target.value)} required disabled={isInquirySubmitting}
                    />
                  </div>
                  <div>
                    <input 
                      className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" 
                      type="text" placeholder="Order ID (Optional)" 
                      disabled={isInquirySubmitting}
                    />
                  </div>
                </div>
                
                <div>
                  <textarea 
                    className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-y" 
                    placeholder="How can we help you? *" 
                    value={inquiryComments} onChange={(e) => setInquiryComments(e.target.value)} required disabled={isInquirySubmitting}
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#ffd13b] text-neutral-900 hover:bg-[#ffc83b] font-bold px-8 py-3.5 rounded-lg transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed border-none" 
                    type="submit" disabled={isInquirySubmitting}
                  >
                    {isInquirySubmitting ? (
                      <><SvgSpinner /> Sending...</>
                    ) : (
                      <>Send Message <SvgArrowRight /></>
                    )}
                  </button>
                </div>
                
                {toast && (
                  <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {toast.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Contact Options Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-8 hover:border-border-subtle transition-colors flex flex-col h-full shadow-lg">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
              <SvgDiscord className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">Discord Ticket Support</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
              Join our official Discord server for instant assistance. Chat with our support team, open a support ticket, or get live help for your orders, payments, and Discord services.
            </p>
            <div className="flex flex-wrap gap-4 mt-auto">
              <a href="https://discord.gg/zoroboost" target="_blank" rel="noopener noreferrer" className="bg-secondary hover:bg-secondary/80 text-foreground border border-border font-bold px-5 py-2.5 rounded text-sm transition-colors">
                Join Discord Server
              </a>
              <a href="mailto:info@zoroboost.com" className="bg-secondary hover:bg-secondary/80 text-foreground font-bold px-5 py-2.5 rounded text-sm transition-colors border border-border">
                Email Us
              </a>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-border-subtle transition-colors flex flex-col h-full shadow-lg">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
              <SvgHeadset />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">Live Support</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
              Need help with payments, bulk orders, partnerships, or general inquiries? Use our live chat feature for immediate assistance or submit a ticket directly.
            </p>
            <div className="flex flex-wrap gap-4 mt-auto">
              <button onClick={openLiveChat} className="bg-secondary hover:bg-secondary/80 text-foreground border border-border font-bold px-5 py-2.5 rounded text-sm transition-colors cursor-pointer">
                Live Chat
              </button>
              <button onClick={openTicketModal} className="bg-secondary hover:bg-secondary/80 text-foreground font-bold px-5 py-2.5 rounded text-sm transition-colors border border-border cursor-pointer">
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Tailwind Fixed Modal for Tickets */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={closeTicketModal}>
          <div 
            className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <SvgTicket />
                </div>
                <div>
                  <h3 className="font-bold text-foreground m-0">Submit a Ticket</h3>
                  <p className="text-xs text-muted-foreground m-0">Our support team is here to help.</p>
                </div>
              </div>
              <button onClick={closeTicketModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <SvgTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleTicketSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Name</label>
                    <input 
                      type="text" required 
                      className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                      value={ticketData.name} onChange={(e) => setTicketData({...ticketData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Email</label>
                    <input 
                      type="email" required 
                      className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                      value={ticketData.email} onChange={(e) => setTicketData({...ticketData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Department</label>
                  <select 
                    className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                    value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}
                  >
                    <option value="General Support">General Support</option>
                    <option value="Billing / Payment">Billing & Payments</option>
                    <option value="Boosting Order">Server Boosting Order</option>
                    <option value="Account Order">Discord Accounts</option>
                    <option value="Other">Other Issues</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Subject</label>
                  <input 
                    type="text" required placeholder="Brief summary of your issue..."
                    className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                    value={subject} onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Message</label>
                  <textarea 
                    required minLength={10} rows={4} placeholder="Please provide all relevant details..."
                    className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary resize-y"
                    value={message} onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <><SvgSpinner className="w-4 h-4" /> Submitting...</> : 'Submit Ticket'}
                  </button>
                </div>
                
                {toast && (
                  <div className={`mt-2 p-3 rounded-md text-sm font-medium text-center ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {toast.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
