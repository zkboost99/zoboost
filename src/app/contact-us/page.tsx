"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { injectGenieKeyframes } from '@/utils/genie';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactUs() {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state set to true for demonstration
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Live Chat States & Refs
  const liveChatBtnRef = useRef<HTMLAnchorElement>(null);
  const chatStreamRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatClosing, setIsChatClosing] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Hello! Welcome to ZoroBoost Live Chat. How can we help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [chatContactId, setChatContactId] = useState<string | null>(null);

  // Pre-chat Form States
  const [preChatName, setPreChatName] = useState('');
  const [preChatEmail, setPreChatEmail] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Load chat session on mount
  useEffect(() => {
    const savedId = localStorage.getItem('zoroboost_chat_contact_id');
    if (savedId) {
      setChatContactId(savedId);
      setIsFormSubmitted(true);
      fetch(`/api/admin/contacts?id=${savedId}`)
        .then(res => {
          if (res.status === 404) {
            localStorage.removeItem('zoroboost_chat_contact_id');
            setChatContactId(null);
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.success && data.contact) {
            try {
              const parsed = JSON.parse(data.contact.message);
              if (parsed && parsed.type === 'chat' && parsed.messages) {
                setChatMessages(parsed.messages);
              }
            } catch (e) {
              console.error("Error parsing saved chat:", e);
            }
          }
        })
        .catch(err => console.error("Error loading initial chat:", err));
    }
  }, []);

  // Poll for admin replies
  useEffect(() => {
    if (!isChatOpen || !chatContactId || isChatMinimized) return;

    const interval = setInterval(() => {
      fetch(`/api/admin/contacts?id=${chatContactId}`)
        .then(res => {
          if (res.status === 404) {
            localStorage.removeItem('zoroboost_chat_contact_id');
            setChatContactId(null);
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.success && data.contact) {
            try {
              const parsed = JSON.parse(data.contact.message);
              if (parsed && parsed.type === 'chat' && parsed.messages) {
                if (parsed.messages.length !== chatMessages.length) {
                  setChatMessages(parsed.messages);
                }
              }
            } catch (e) {
              console.error("Error parsing polled messages:", e);
            }
          }
        })
        .catch(err => console.error("Error polling messages:", err));
    }, 3000);

    return () => clearInterval(interval);
  }, [isChatOpen, chatContactId, isChatMinimized, chatMessages.length]);

  // Scroll to bottom when messages or open states change
  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen, isChatMinimized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('.macos-btn') || target.closest('button') || target.closest('input')) return;

    isDragging.current = true;
    dragStart.current = { x: e.clientX - chatPosition.x, y: e.clientY - chatPosition.y };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;
      
      let newX = moveEvent.clientX - dragStart.current.x;
      let newY = moveEvent.clientY - dragStart.current.y;
      
      const chatWidth = 380;
      const chatHeight = 500;
      const defaultLeft = window.innerWidth - chatWidth - 30;
      const defaultTop = window.innerHeight - chatHeight - 100;
      
      const absoluteX = defaultLeft + newX;
      const absoluteY = defaultTop + newY;
      
      const constrainedX = Math.max(0, Math.min(window.innerWidth - chatWidth, absoluteX));
      const constrainedY = Math.max(0, Math.min(window.innerHeight - chatHeight, absoluteY));
      
      setChatPosition({
        x: constrainedX - defaultLeft,
        y: constrainedY - defaultTop
      });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const openChatModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (liveChatBtnRef.current) {
      const rect = liveChatBtnRef.current.getBoundingClientRect();
      injectGenieKeyframes(rect, 380, 500, 'chat-genie');
    }
    setIsChatOpen(true);
    setIsChatClosing(false);
    setIsChatMinimized(false);
  };

  const closeChatModal = () => {
    setIsChatClosing(true);
    setTimeout(() => {
      setIsChatOpen(false);
      setIsChatClosing(false);
      
      // Clear session from state & localStorage so the next open starts a fresh chat!
      localStorage.removeItem('zoroboost_chat_contact_id');
      setChatContactId(null);
      setIsFormSubmitted(false);
      setPreChatName('');
      setPreChatEmail('');
      setChatMessages([
        {
          sender: 'agent',
          text: 'Hello! Welcome to ZoroBoost Live Chat. How can we help you today?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 400);
  };

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preChatName.trim() || !preChatEmail.trim()) return;

    try {
      const payload = {
        name: preChatName.trim(),
        email: preChatEmail.trim(),
        message: JSON.stringify({
          type: 'chat',
          messages: chatMessages
        }),
        status: 'Unread'
      };

      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.contact) {
        localStorage.setItem('zoroboost_chat_contact_id', data.contact.id);
        setChatContactId(data.contact.id);
        setIsFormSubmitted(true);
      } else {
        setIsFormSubmitted(true);
      }
    } catch (err) {
      console.error("Error starting chat:", err);
      setIsFormSubmitted(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput('');

    try {
      if (!chatContactId) {
        const payload = {
          name: preChatName || 'Live Chat Guest',
          email: preChatEmail || 'live-chat@zoroboost.com',
          message: JSON.stringify({
            type: 'chat',
            messages: updatedMessages
          }),
          status: 'Unread'
        };

        const res = await fetch('/api/admin/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success && data.contact) {
          setChatContactId(data.contact.id);
          localStorage.setItem('zoroboost_chat_contact_id', data.contact.id);
        }
      } else {
        const payload = {
          id: chatContactId,
          message: JSON.stringify({
            type: 'chat',
            messages: updatedMessages
          }),
          status: 'Unread'
        };

        await fetch('/api/admin/contacts', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.error("Error sending chat message:", err);
    }
  };


  // Form states for submit ticket
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Form states for contact/inquiry message
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryOrderId, setInquiryOrderId] = useState('');
  const [inquiryComments, setInquiryComments] = useState('');
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const openTicketModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
        setToast({ type: 'error', message: 'Please log in to submit a ticket.' });
        return;
    }
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      injectGenieKeyframes(rect, 500, 600, 'ticket-genie');
    }
    setIsTicketModalOpen(true);
    setIsClosing(false);
  };

  const closeTicketModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsTicketModalOpen(false);
      setIsClosing(false);
      // Reset ticket form
      setDept('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 400); // Wait for close animation
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isInquirySubmitting) return;
    setIsInquirySubmitting(true);

    try {
      const payload = {
        name: inquiryName,
        email: inquiryEmail,
        message: JSON.stringify({
          type: 'message',
          order_id: inquiryOrderId,
          comments: inquiryComments
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
        setToast({ type: 'success', message: 'Message sent successfully! Our team will contact you ASAP.' });
        setInquiryName('');
        setInquiryEmail('');
        setInquiryOrderId('');
        setInquiryComments('');
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to send message.' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: 'Network error occurred. Please try again.' });
    } finally {
      setIsInquirySubmitting(false);
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        name: `Support Ticket (${dept})`,
        email: email,
        message: JSON.stringify({
          type: 'ticket',
          dept: dept,
          subject: subject,
          message: message
        }),
        status: 'Pending'
      };

      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setToast({ type: 'success', message: 'Ticket submitted successfully! Our support team will respond shortly.' });
        closeTicketModal();
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to submit ticket.' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Network error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
      <Header />
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Get In Touch</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/*  End Breadcrumb  */}
 
    <div id="smooth-content">
        {/*  Start Contact Us  */}
        <div className="contact-style-one-area overflow-hidden default-padding">
            <div className="container">
                <div className="contact-style-one-items" style={{backgroundImage: "url(/assets/img/shape/map.png)"}}>
                    <div className="row align-center">
                        <div className="contact-stye-one col-lg-5 mb-md-50 mb-xs-50">

                            <div className="contact-style-one-info">
                                <h2 className="split-text title">Need help with your order? Contact our support team.</h2>
                                <ul>
                                    <li className="wow fadeInUp">
                                        <div className="icon">
                                            <i className="fab fa-discord"></i>
                                        </div>
                                        <div className="content">
                                            <h4>Discord Support Server</h4>
                                            <a href="https://discord.gg/zoroboost">discord.gg/zoroboost</a>
                                        </div>
                                    </li>
                                    <li className="wow fadeInUp" data-wow-delay="300ms">
                                        <div className="icon">
                                            <i className="fas fa-envelope-open-text"></i>
                                        </div>
                                        <div className="info">
                                            <h4>Official Email</h4>
                                            <a href="mailto:info@zoroboost.com">info@zoroboost.com</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="contact-stye-one col-lg-7 pl-60 pl-md-15 pl-xs-15">
                            <div className="contact-form-card" style={{backgroundImage: "url(/assets/img/shape/3.png)"}}>
                                    <h4 className="sub-title">Send us a message</h4>
                                    <p>
                                        Have a question about Server Boosts, Nitro, or bulk orders? Fill out the form and our team will get back to you ASAP.
                                    </p>
                                    <form onSubmit={handleInquirySubmit} className="contact-form">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input className="form-control" id="name" name="name" placeholder="Discord Username (e.g. wumpus#1234)" type="text" value={inquiryName} onChange={(e) => setInquiryName(e.target.value)} required disabled={isInquirySubmitting} />
                                                    <span className="alert-error"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <input className="form-control" id="email" name="email" placeholder="Email Address*" type="email" value={inquiryEmail} onChange={(e) => setInquiryEmail(e.target.value)} required disabled={isInquirySubmitting} />
                                                    <span className="alert-error"></span>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <input className="form-control" id="order_id" name="order_id" placeholder="Order ID (Optional)" type="text" value={inquiryOrderId} onChange={(e) => setInquiryOrderId(e.target.value)} disabled={isInquirySubmitting} />
                                                    <span className="alert-error"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group comments">
                                                    <textarea className="form-control" id="comments" name="comments" placeholder="How can we help you? *" value={inquiryComments} onChange={(e) => setInquiryComments(e.target.value)} required disabled={isInquirySubmitting}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-style-one" type="submit" name="submit" id="submit" disabled={isInquirySubmitting}>
                                                    {isInquirySubmitting ? (
                                                      <>
                                                        <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Sending...
                                                      </>
                                                    ) : (
                                                      <>
                                                        Send Message <i className="fas fa-arrow-right"></i>
                                                      </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        {/*  Alert Message  */}
                                        <div className="col-lg-12 alert-notification">
                                            <div id="message" className="alert-msg"></div>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  End Contact  */}

        {/*  Start Contact Options  */}
        <div className="contact-options-area default-padding-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 mb-xs-30">
                        <div className="service-style-three-item">
                            <div className="top">
                                <div className="icon">
                                    <img src="/assets/img/icon/19.png" alt="Discord Support" />
                                </div>
                                <h4>Discord Ticket Support</h4>
                                <p>
                                    Join our official Discord server for instant assistance. Chat with our support team, open a support ticket, or get live help for your orders, payments, and Discord services.
                                </p>
                            </div>
                            <div style={{ marginTop: '25px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                <a href="https://discord.gg/zoroboost" target="_blank" rel="noopener noreferrer" className="btn btn-style-one" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '5px' }}>
                                    Join Discord Server
                                </a>
                                <a href="mailto:info@zoroboost.com" className="btn btn-style-one" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '5px' }}>
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="service-style-three-item">
                            <div className="top">
                                <div className="icon">
                                    <img src="/assets/img/icon/20.png" alt="Email Support" />
                                </div>
                                <h4>Live Support</h4>
                                <p>
                                    Need help with payments, bulk orders, partnerships, or general inquiries? Send us an email and our support team will respond as quickly as possible.
                                </p>
                            </div>
                            <div style={{ marginTop: '25px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                <a href="#" ref={liveChatBtnRef} className="btn-style-one" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '5px' }} onClick={openChatModal}>
                                    Live Chat
                                </a>
                                <a href="#" ref={btnRef} className="btn btn-style-one" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '5px' }} onClick={openTicketModal}>
                                    Submit Ticket
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  End Contact Options  */}
    </div>

    {/* macOS Style Ticket Modal */}
    {(isTicketModalOpen || isClosing) && (
        <div className="macos-modal-overlay" onClick={closeTicketModal} style={{ opacity: isClosing ? 0 : 1, transition: 'opacity 0.4s ease' }}>
            <div 
                className="macos-window feedback-window" 
                onClick={(e) => e.stopPropagation()}
                style={{
                  animation: isClosing 
                    ? 'genie-close-ticket-genie 0.4s cubic-bezier(0.8, 0, 0.2, 1) forwards' 
                    : 'genie-open-ticket-genie 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
                }}
            >
                <div className="feedback-modal-header suggestion-header">
                    <div className="macos-controls-feedback">
                        <div className="macos-btn close" onClick={closeTicketModal}></div>
                    </div>
                    <div className="header-content">
                        <i className="fas fa-ticket-alt"></i>
                        <div>
                            <h3>Submit a Ticket</h3>
                            <p>Our support team is here to help you.</p>
                        </div>
                    </div>
                </div>
                <div className="feedback-modal-body">
                    <form onSubmit={handleTicketSubmit}>
                        <div className="input-row">
                            <div className="form-group">
                                <label>Department</label>
                                <select className="form-control" required value={dept} onChange={(e) => setDept(e.target.value)} disabled={isSubmitting}>
                                    <option value="" disabled>Select Department</option>
                                    <option value="support">General Support</option>
                                    <option value="billing">Billing & Payments</option>
                                    <option value="technical">Technical Issue</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="form-control" placeholder="contact@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isSubmitting} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" placeholder="Brief subject" value={subject} onChange={(e) => setSubject(e.target.value)} required disabled={isSubmitting} />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea className="form-control" rows={4} placeholder="Describe your issue in detail..." value={message} onChange={(e) => setMessage(e.target.value)} required disabled={isSubmitting}></textarea>
                        </div>
                        <button type="submit" className="feedback-submit-btn suggestion-submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Submitting...
                            </>
                          ) : 'Submit Ticket'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )}

    {/* macOS Style Live Chat Window */}
    {(isChatOpen || isChatClosing) && !isChatMinimized && (
      <div 
        className="macos-window"
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '380px',
          height: '500px',
          maxWidth: 'none',
          zIndex: 9999,
          transform: `translate(${chatPosition.x}px, ${chatPosition.y}px)`,
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid #f1f5f9',
          overflow: 'hidden',
          fontFamily: 'inherit',
          animation: isChatClosing 
            ? 'genie-close-chat-genie 0.4s cubic-bezier(0.8, 0, 0.2, 1) forwards' 
            : 'genie-open-chat-genie 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
        }}
      >
        {/* Header (Draggable) */}
        <div 
          onMouseDown={handleMouseDown}
          style={{
            padding: '15px 20px',
            background: '#ffffff',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            cursor: 'move',
            userSelect: 'none',
            borderBottom: '1px solid #f1f5f9',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Avatar */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <img src="/fav.png" alt="ZoroBoost Icon" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} />
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid #ffffff'
              }}></div>
            </div>
            {/* Info */}
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: '#0f172a' }}>Live Support</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Typically replies in under 1 minute</span>
              </div>
            </div>
          </div>
          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={closeChatModal}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#94a3b8', 
                cursor: 'pointer', 
                fontSize: '18px',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fas fa-times"></i>
            </button>
            <button 
              onClick={() => setIsChatMinimized(true)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#94a3b8', 
                cursor: 'pointer', 
                fontSize: '16px',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>

        {!isFormSubmitted ? (
          /* Pre-chat Form */
          <div style={{
            flexGrow: 1,
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            background: '#ffffff',
            overflowY: 'auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px auto',
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.1)'
              }}>
                <img src="/fav.png" alt="ZoroBoost" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Start Live Support</h4>
              <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', padding: '0 10px' }}>Please fill out the form below to connect with a support representative.</p>
            </div>

            <form 
              onSubmit={handleStartChat}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name..." 
                  required
                  value={preChatName}
                  onChange={(e) => setPreChatName(e.target.value)}
                  style={{
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    paddingLeft: '12px',
                    fontSize: '12.5px',
                    background: '#ffffff',
                    color: '#1e293b',
                    width: '100%'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email..." 
                  required
                  value={preChatEmail}
                  onChange={(e) => setPreChatEmail(e.target.value)}
                  style={{
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    paddingLeft: '12px',
                    fontSize: '12.5px',
                    background: '#ffffff',
                    color: '#1e293b',
                    width: '100%'
                  }}
                />
              </div>

              <button 
                type="submit" 
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  marginTop: '6px',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#4338ca')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#4f46e5')}
              >
                Start Chat <i className="fas fa-comments"></i>
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Message Stream */}
            <div 
              ref={chatStreamRef}
              style={{
                flexGrow: 1,
                padding: '15px 20px',
                overflowY: 'auto',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {/* Today Divider */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
                <span style={{ 
                  background: '#eff2fb', 
                  color: '#4f46e5', 
                  fontSize: '11px', 
                  fontWeight: '600', 
                  padding: '4px 12px', 
                  borderRadius: '50px' 
                }}>
                  Today
                </span>
              </div>

              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    width: '100%'
                  }}
                >
                  {msg.sender === 'user' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', maxWidth: '75%' }}>
                      <div style={{
                        background: '#eef2ff',
                        border: '1px solid #e0e7ff',
                        color: '#312e81',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        boxShadow: '0 2px 6px rgba(99, 102, 241, 0.03)',
                        textAlign: 'left'
                      }}>
                        {msg.text}
                      </div>
                      <span style={{ fontSize: '10px', color: '#94a3b8', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        {msg.time} <i className="fas fa-check-double" style={{ color: '#4f46e5', fontSize: '9px' }}></i>
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '75%' }}>
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid #f1f5f9',
                        color: '#0f172a',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                        textAlign: 'left'
                      }}>
                        {msg.text}
                      </div>
                      <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: '4px' }}>{msg.time}</span>
                    </div>
                  )}
                </div>
              ))}

              {isAgentTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '75%' }}>
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid #f1f5f9',
                      color: '#94a3b8',
                      padding: '10px 14px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <i className="fas fa-circle-notch fa-spin" style={{ color: '#4f46e5' }}></i> Support is typing...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input Box */}
            <form 
              onSubmit={handleSendMessage}
              style={{
                padding: '15px 20px',
                borderTop: '1px solid #f1f5f9',
                background: '#ffffff',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <div style={{ position: 'relative', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isAgentTyping}
                  style={{
                    width: '100%',
                    height: '46px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    paddingLeft: '15px',
                    paddingRight: '40px',
                    fontSize: '13px',
                    background: '#ffffff',
                    color: '#1e293b',
                    boxShadow: 'none'
                  }}
                />
                <i 
                  className="fas fa-paperclip" 
                  style={{ 
                    position: 'absolute', 
                    right: '15px', 
                    color: '#cbd5e1', 
                    fontSize: '15px', 
                    cursor: 'pointer' 
                  }}
                ></i>
              </div>
              <button 
                type="submit" 
                disabled={isAgentTyping || !chatInput.trim()}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '16px',
                  flexShrink: 0
                }}
              >
                <i className="fas fa-paper-plane" style={{ transform: 'rotate(-10deg)' }}></i>
              </button>
            </form>
          </>
        )}

        {/* Small branding footer */}
        <div 
          style={{
            padding: '10px',
            background: '#f8fafc',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#64748b'
          }}
        >
          <i className="fas fa-bolt" style={{ color: '#4f46e5' }}></i> Powered by <span style={{ color: '#4f46e5', fontWeight: '700' }}>ZoroBoost</span>
        </div>
      </div>
    )}

    {/* Minimized Chat Pill */}
    {isChatOpen && isChatMinimized && (
      <div 
        onClick={() => setIsChatMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '320px',
          background: '#ffffff',
          color: '#1e293b',
          padding: '12px 18px',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
          cursor: 'pointer',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#10b981',
          boxShadow: '0 0 8px #10b981'
        }}></div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>💬 Live Support Chat</div>
          <div style={{ fontSize: '9px', color: '#64748b', fontWeight: '600', letterSpacing: '0.3px', marginTop: '2px' }}>
            <i className="fas fa-bolt" style={{ color: '#4f46e5' }}></i> Powered by <span style={{ color: '#4f46e5' }}>ZoroBoost</span>
          </div>
        </div>
        <i className="fas fa-chevron-up" style={{ fontSize: '12px', color: '#94a3b8' }}></i>
      </div>
    )}

    <style>{`
      @keyframes slideIn {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .service-style-three-item {
        transition: all 0.3s ease !important;
      }
      .service-style-three-item:hover {
        background: #000000 !important;
      }
      .service-style-three-item:hover h4,
      .service-style-three-item:hover p {
        color: #ffffff !important;
      }
    `}</style>

    {/* Toast Notification */}
    {toast && (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: toast.type === 'success' ? '#10B981' : '#EF4444',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        animation: 'slideIn 0.3s ease forwards',
        fontWeight: '600',
        fontSize: '14px'
      }}>
        <i className={toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
        {toast.message}
      </div>
    )}
    <Footer />
    </>
  );
}
