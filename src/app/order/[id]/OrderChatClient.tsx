'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeedbackWidgets from '@/components/FeedbackWidgets';
import dynamic from 'next/dynamic';
import './userChat.css';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function OrderChatClient({ initialOrder }: { initialOrder: any }) {
  const [order, setOrder] = useState(initialOrder);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayId = order.id || 'ORD-000000';

  const formatTime = (dateStr: string) => {
    try {
      if (!dateStr) return '';
      if (!dateStr.includes('T') && dateStr.includes(':') && dateStr.length < 12) return dateStr;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) {
        const match = dateStr.match(/\d{1,2}:\d{2}\s*[AP]M/i);
        return match ? match[0] : dateStr;
      }
      return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(d);
    } catch { return dateStr || ''; }
  };

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesContainerRef.current)
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };
  useEffect(() => { scrollToBottom(); }, [messages.length]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/client/chat?order_id=${order.id}`);
        const json = await res.json();
        if (json.data) setMessages(json.data);
      } catch (err) { console.error('Failed to fetch messages:', err); }
    };
    fetchMessages();
    const poll = setInterval(fetchMessages, 3000);

    const sub = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${order.id}` },
        payload => setOrder(payload.new))
      .subscribe();

    return () => { clearInterval(poll); supabase.removeChannel(sub); };
  }, [order.id]);

  const sendMsg = async (text: string) => {
    if (!text.trim() || isSending) return;
    setIsSending(true);
    try {
      const res = await fetch('/api/client/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: order.id, message: text.trim() })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to send');
      setNewMessage('');
    } catch (err: any) {
      alert(err.message || 'Error sending message.');
    } finally { setIsSending(false); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      if (json.success && json.url) {
        await sendMsg(json.url);
      }
    } catch (err: any) {
      alert(err.message || 'Error uploading file.');
    } finally {
      setIsUploadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const renderMessageContent = (text: string) => {
    if (text.match(/\.(jpeg|jpg|gif|png|webp)($|\?)/i) || text.startsWith('https://pub-')) {
      return <img src={text} alt="attachment" style={{ maxWidth: '200px', borderRadius: '8px', display: 'block' }} />;
    }
    return <span>{text}</span>;
  };

  const isFinalized = ['Failed', 'Cancelled', 'Rejected'].includes(order.status);

  // Show quick reply row below the LAST seller message if customer hasn't replied yet
  const showQuickRepliesAfter = (idx: number) => {
    if (messages[idx]?.sender !== 'seller') return false;
    if (isFinalized) return false;
    const next = messages[idx + 1];
    return !next || next.sender !== 'customer';
  };

  return (
    <>
      <Header />
      <div className="uc-page-container">
        <div className="uc-content-wrapper">

          {/* Back nav */}
          <a href="/profile" className="uc-top-nav">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            All Orders
          </a>

          <main className="uc-grid">

            {/* ── LEFT COLUMN ── */}
            <div className="uc-left-col">

              {/* Chat with seller card */}
              <div className="uc-card">
                <div className="uc-top-card-inner">
                  <div className="uc-top-info">
                    <div className="uc-top-avatar">
                      <img src="https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/uploads/Copy%20of%20Untitled%20Design.png" alt="Mascot" />
                    </div>
                    <div className="uc-top-text">
                      <h1>Chat with seller</h1>
                      <p>Reply below if the seller asks for details to continue delivery.</p>
                    </div>
                  </div>
                  <div className="uc-delivery-timer">
                    {/* Removed Delivery In timer */}
                  </div>
                </div>
                <div className="uc-trade-shield">
                  <svg width="14" height="14" fill="none" stroke="#4a7de8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <span>TradeShield</span>
                  <span className="uc-trade-shield-sub">protects your order</span>
                </div>
              </div>

              {/* Chat interface card */}
              <div className="uc-card uc-chat-card">

                {/* Chat header */}
                <div className="uc-chat-header">
                  <div className="uc-chat-header-user">
                    <div className="uc-chat-header-avatar">
                      <img src="/fav icon.png" alt="ZoroBoost" />
                    </div>
                    <div className="uc-chat-header-info">
                      <h3>ZoroBoost</h3>
                      <p>Order for items</p>
                    </div>
                  </div>
                  <div className="uc-chat-search">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Messages */}
                <div className="uc-chat-messages" ref={messagesContainerRef}>

                  {/* System message — Order Created */}
                  <div className="uc-sys-msg-container">
                    <div className="uc-sys-msg-title">
                      Product Link:{' '}
                      <a href={`/product/${order.product_id}`} target="_blank" rel="noreferrer">
                        https://www.zoroboost.com/product/{order.product_id}
                      </a>
                    </div>
                    <a href={`/product/${order.product_id}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="uc-sys-link-box" style={{ cursor: 'pointer' }}>
                        <div className="uc-sys-link-content">
                          <div className="uc-sys-link-text">
                            <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z" clipRule="evenodd" />
                            </svg>
                            View Product
                          </div>
                          <div className="uc-sys-link-domain">www.zoroboost.com</div>
                        </div>
                        <div className="uc-sys-time">4m</div>
                      </div>
                    </a>
                  </div>

                  {/* Dynamic messages */}
                  {messages.map((msg, idx) => {
                    const isCustomer = msg.sender === 'customer';
                    return (
                      <div key={idx} className="uc-msg-group">

                        <div className={`uc-msg-row ${isCustomer ? 'buyer' : 'seller'}`}>
                          {/* Seller left avatar */}
                          {!isCustomer && (
                            <div className="uc-msg-avatar">
                              <img src="/fav icon.png" alt="ZoroBoost" />
                            </div>
                          )}

                          <div className="uc-msg-content">
                            {isCustomer ? (
                              <div className="uc-msg-bubble">
                                {renderMessageContent(msg.message)}
                                <span className="uc-msg-meta-inline">✓</span>
                              </div>
                            ) : (
                              <>
                                <div className="uc-msg-bubble">{renderMessageContent(msg.message)}</div>
                              </>
                            )}
                          </div>

                          {/* Buyer right avatar */}
                          {isCustomer && (
                            <div className="uc-msg-avatar-buyer">
                              <svg width="16" height="16" fill="rgba(255,255,255,0.9)" viewBox="0 0 24 24">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Quick reply row — [yes read] [not now /] [buyer avatar] */}
                        {showQuickRepliesAfter(idx) && (
                          <div className="uc-quick-reply-row">
                            <button
                              className="uc-qr-yes"
                              onClick={() => sendMsg('yes read')}
                              disabled={isSending}
                            >
                              yes read
                            </button>
                            <button
                              className="uc-qr-no"
                              onClick={() => sendMsg('not now')}
                              disabled={isSending}
                            >
                              not now /
                            </button>
                            <div className="uc-msg-avatar-buyer">
                              <svg width="16" height="16" fill="rgba(255,255,255,0.9)" viewBox="0 0 24 24">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                              </svg>
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

                {/* Input */}
                <div className="uc-chat-input-area" style={{ position: 'relative' }}>
                  
                  {showEmojiPicker && (
                    <div style={{ position: 'absolute', bottom: '100%', right: '0', zIndex: 50, marginBottom: '10px' }}>
                      <EmojiPicker onEmojiClick={(emojiData) => {
                        setNewMessage(prev => prev + emojiData.emoji);
                        setShowEmojiPicker(false);
                        setTimeout(() => inputRef.current?.focus(), 0);
                      }} />
                    </div>
                  )}

                  <form onSubmit={e => { e.preventDefault(); sendMsg(newMessage); }} className="uc-chat-input-wrapper">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                      accept="image/*"
                    />
                    <input
                      type="text"
                      ref={inputRef}
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder={isFinalized ? 'This order is finalized.' : isUploadingFile ? 'Uploading file...' : 'Say something...'}
                      disabled={isFinalized || isSending || isUploadingFile}
                    />
                    <div className="uc-input-actions">
                      {/* Paperclip */}
                      <div className="uc-input-icon" onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                        {isUploadingFile ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        )}
                      </div>
                      {/* Emoji / sticker */}
                      <div className="uc-input-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)} style={{ cursor: 'pointer' }}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      {/* Send */}
                      <button type="submit" className="uc-send-btn" disabled={!newMessage.trim() || isSending || isFinalized || isUploadingFile}>
                        {isSending
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                        }
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="uc-right-col">

              {/* Your money is safe banner */}
              <div className="uc-safe-banner">
                <div className="uc-safe-left">
                  <svg width="14" height="14" fill="none" stroke="#4a7de8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Your money is safe
                </div>
                <div className="uc-safe-right">Until order is completed</div>
              </div>

              {/* Order details card */}
              <div className="uc-card">
                <div className="uc-details-header">
                  <h2>Order details</h2>
                  <span className={`uc-status-pill ${order.status === 'Completed' ? 'completed' : (order.status === 'Failed' || order.status === 'Cancelled') ? 'cancelled' : order.status === 'Rejected' ? 'rejected' : 'pending'}`}>
                    {order.status === 'Completed' ? 'Completed'
                      : (order.status === 'Failed' || order.status === 'Cancelled') ? 'Cancelled'
                      : order.status === 'Rejected' ? 'Rejected'
                      : 'Pending delivery'}
                  </span>
                </div>

                <div className="uc-product-preview">
                  <div className="uc-product-img">
                    <img
                      src={order.real_media_url || order.product_url || order.products?.media_url || order.products?.images?.[0] || 'https://img.icons8.com/color/48/discord-logo.png'}
                      alt="Product"
                    />
                  </div>
                  <h3 className="uc-product-name">{order.product_name || 'Product Item'}</h3>
                </div>

                <div className="uc-details-list">
                  <div className="uc-detail-row">
                    <span className="uc-detail-label">Game</span>
                    <span className="uc-detail-value">
                      <span className="uc-discord-badge">DC</span>
                      Discord
                    </span>
                  </div>
                  <div className="uc-detail-row">
                    <span className="uc-detail-label">Delivery type</span>
                    <span className="uc-detail-value">Gifting Method</span>
                  </div>
                  <div className="uc-detail-row">
                    <span className="uc-detail-label">Item Type</span>
                    <span className="uc-detail-value">{order.item_type || 'Digital Product'}</span>
                  </div>
                  <div className="uc-detail-row">
                    <span className="uc-detail-label">Seller</span>
                    <span className="uc-detail-value seller-name">
                      ZoroBoost
                      <span className="uc-sep">|</span>
                      <span className="uc-online-dot" />
                      <span className="uc-online-txt">Online</span>
                    </span>
                  </div>
                  <div className="uc-detail-row">
                    <span className="uc-detail-label">Payment Gateway</span>
                    <span className="uc-detail-value">{order.payment_method || 'Unknown'}</span>
                  </div>
                  <div className="uc-detail-row">
                    <span className="uc-detail-label">Total price</span>
                    <span className="uc-detail-value total-price">${Number(order.amount).toFixed(2)}</span>
                  </div>
                  <div className="uc-detail-row">
                    <span className="uc-detail-label">Receipt sent</span>
                    <span className="uc-detail-value receipt-email">{order.email}</span>
                  </div>
                  <div className="uc-detail-row">
                    <span className="uc-detail-label">Order ID</span>
                    <span className="uc-detail-value order-id">{displayId}</span>
                  </div>
                </div>

                <div className="uc-actions-area">
                  <button className="uc-action-btn" onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'report', rect } }));
                  }}>Report</button>
                  <button className="uc-action-btn" onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'suggestion', rect } }));
                  }}>Suggestion</button>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
      <FeedbackWidgets />
      <Footer />
    </>
  );
}
