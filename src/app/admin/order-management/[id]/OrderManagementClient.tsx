'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import './orderManagement.css' // Import Vanilla CSS

export default function OrderManagementClient({ order, customerInfo }: { order: any, customerInfo: any }) {
  const router = useRouter()
  const [status, setStatus] = useState(order.status || 'Pending')
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, newStatus: string, message: string}>({ isOpen: false, newStatus: '', message: '' })

  // Timer state
  const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 15 })

  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/client/chat?order_id=${order.id}`)
      const json = await res.json()
      if (json.data) setMessages(json.data)
    } catch (e) {
      console.error("Failed to fetch messages", e)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    
    // Countdown timer logic
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 }
        return prev
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(timerInterval)
    }
  }, [order.id])

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    try {
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: order.id, message: newMessage.trim() })
      })
      if (!res.ok) throw new Error('Failed to send')
      setNewMessage('')
      fetchMessages()
    } catch (e) {
      alert("Could not send message")
    } finally {
      setIsSending(false)
    }
  }

  const updateOrderStatus = (newStatus: string) => {
    const confirmMessage = newStatus === 'Completed' 
      ? 'Are you sure you want to MARK this order as COMPLETE?' 
      : 'Are you sure you want to CANCEL this order?'
    
    setConfirmModal({ isOpen: true, newStatus, message: confirmMessage })
  }

  const executeStatusChange = async (newStatus: string) => {
    setIsProcessing(true)
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, status: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        setStatus(newStatus)
        const msg = newStatus === 'Completed' 
          ? 'Order has been delivered. Thank you!'
          : 'Order has been cancelled.'
        
        await fetch('/api/admin/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: order.id, message: msg })
        })
        fetchMessages()
      } else {
        alert("Error: " + data.error)
      }
    } catch (e) {
      alert("Failed to update status")
    } finally {
      setIsProcessing(false)
    }
  }

  const pName = order.products?.title || 'Unknown Product'
  const pImg = order.products?.media_url || order.products?.images?.[0] || 'https://img.icons8.com/color/48/discord-logo.png'
  const buyerName = order.discord_username || customerInfo?.discord_username || order.username || 'Anonymous'

  const basePrice = order.total_price || 0
  const commission = basePrice * 0.10
  const receiveAmount = basePrice - commission

  const getStatusClass = () => {
    if (status === 'Completed') return 'om-status-completed'
    if (status === 'Failed' || status === 'Cancelled') return 'om-status-failed'
    return 'om-status-pending'
  }
  const statusText = status === 'Completed' ? 'Complete' : status === 'Failed' ? 'Cancelled' : 'Pending delivery'
  return (
    <div className="om-page-container">
      <div className="om-content-wrapper">
        
        {/* TOP HEADER */}
        <div className="om-header">
          <div className="om-header-left">
            <div className="om-product-img">
              <img src={pImg} alt="Product" />
            </div>
            <div>
              <h1 className="om-product-title">{pName}</h1>
              <div className="om-order-id-wrap">
                <span>Order ID: {order.id}</span>
                <button className="om-copy-btn" onClick={() => navigator.clipboard.writeText(order.id)} title="Copy ID">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className={`om-status-pill ${getStatusClass()}`}>
              {statusText}
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="om-grid">
          
          {/* LEFT COLUMN */}
          <div className="om-left-col">
            
            {/* Action Card */}
            <div className="om-card">
              <div className="om-action-top">
                <div className="om-action-icon">
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                    <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="om-action-title">Deliver order to buyer</h2>
                  <div className="om-action-buttons">
                    <button 
                      onClick={() => updateOrderStatus('Completed')}
                      disabled={isProcessing || status === 'Completed'}
                      className="om-btn om-btn-deliver"
                    >
                      Mark as Complete
                    </button>
                    <button 
                      onClick={() => updateOrderStatus('Failed')}
                      disabled={isProcessing || status === 'Failed' || status === 'Cancelled'}
                      className="om-btn om-btn-cancel"
                    >
                      Cancel order
                    </button>
                  </div>
                </div>
              </div>
              <div className="om-action-banner">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Don't forget to take screenshots or record a video of delivery.
              </div>
            </div>

            {/* Chat Interface */}
            <div className="om-card om-chat-container">
              <div className="om-chat-header">
                <div className="om-chat-user">
                  <div className="om-avatar">
                    {buyerName.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="om-chat-username">{buyerName}</span>
                </div>
                <button className="om-copy-btn">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              <div className="om-chat-messages" ref={messagesContainerRef}>
                <div className="om-sys-msg">
                  <div className="om-sys-title">Order Created: {order.id}</div>
                  <div className="om-sys-link-box">
                    <div className="om-sys-link">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                      </svg>
                      {order.id}
                    </div>
                    <span className="om-sys-time">0m</span>
                  </div>
                </div>

                {messages.map((msg, idx) => {
                  const isAdmin = msg.sender === 'admin'
                  return (
                    <div key={idx} className={`om-msg-row ${isAdmin ? 'admin' : 'customer'}`}>
                      {!isAdmin && (
                        <div className="om-avatar">
                          {buyerName.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="om-msg-bubble">
                        {msg.message}
                        <span className="om-msg-time">
                          {msg.created_at ? new Date(msg.created_at).getMinutes() + 'm' : '1m'}
                        </span>
                      </div>
                      {isAdmin && (
                        <div className="om-admin-avatar">
                          <img src="/fav icon.png" alt="Admin" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="om-chat-input-area">
                <form onSubmit={handleSendMessage} className="om-chat-form">
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Message..."
                    disabled={isSending}
                    className="om-chat-input"
                  />
                  <button 
                    type="submit" 
                    disabled={isSending || !newMessage.trim()}
                    className="om-chat-send"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="om-right-col">
            
            {/* Delivery Deadline */}
            <div className="om-card om-timer-card">
              <h3 className="om-timer-title">Guaranteed delivery deadline</h3>
              <div className="om-timer-display">
                <div className="om-time-block">
                  <span className="om-time-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="om-time-label">Minutes</span>
                </div>
                <div className="om-time-colon">:</div>
                <div className="om-time-block">
                  <span className="om-time-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="om-time-label">Seconds</span>
                </div>
              </div>
              <p className="om-timer-desc">Deliver before the timer ends to avoid penalties</p>
            </div>

            {/* Order Details */}
            <div className="om-card">
              <div className="om-card-header">Order details</div>
              <div className="om-details-list">
                <div className="om-detail-row">
                  <span className="om-detail-label">Game</span>
                  <span className="om-detail-value">
                    <span className="om-discord-badge">D</span>
                    Discord
                  </span>
                </div>
                <div className="om-detail-row">
                  <span className="om-detail-label">Delivery type</span>
                  <span className="om-detail-value">Login Method</span>
                </div>
                <div className="om-detail-row">
                  <span className="om-detail-label">Item Type</span>
                  <span className="om-detail-value">Server Boosts</span>
                </div>
                <div className="om-detail-row">
                  <span className="om-detail-label">Quantity</span>
                  <span className="om-detail-value">1</span>
                </div>
                <div className="om-detail-row">
                  <span className="om-detail-label">Buyer</span>
                  <span className="om-detail-value">
                    <span className="om-link" style={{cursor: 'pointer'}}>{buyerName}</span>
                  </span>
                </div>
              </div>
              <div className="om-view-desc">
                <a href={`/product/${order.products?.id}`} target="_blank" rel="noopener noreferrer">
                  View full description
                </a>
              </div>
            </div>

            {/* Payment Details */}
            <div className="om-card">
              <div className="om-card-header">Payment details</div>
              <div className="om-details-list">
                <div className="om-detail-row">
                  <span className="om-detail-label">Order Price</span>
                  <span className="om-detail-value">${basePrice.toFixed(2)}</span>
                </div>
                <div className="om-detail-row">
                  <span className="om-detail-label">Commission</span>
                  <span className="om-detail-value">-${commission.toFixed(2)}</span>
                </div>
                <div className="om-detail-row">
                  <span className="om-detail-label">You receive</span>
                  <span className="om-detail-value" style={{fontWeight: 700, color: '#FFF'}}>${receiveAmount.toFixed(2)}</span>
                </div>
              </div>
              <div className="om-payment-footer">
                <p className="om-payment-text">Funds will be added to your ZoroBoost balance once the order is marked as received by the buyer.</p>
                <p className="om-payment-text">If the buyer does not confirm delivery within 3 days, it will be confirmed automatically.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CUSTOM CONFIRM MODAL */}
      {confirmModal.isOpen && (
        <div className="om-modal-overlay">
          <div className="om-modal">
            <div className="om-modal-icon">
              <svg width="32" height="32" fill="none" stroke="#FACC15" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="om-modal-title">Confirm Action</h3>
            <p className="om-modal-text">{confirmModal.message}</p>
            <div className="om-modal-actions">
              <button onClick={() => setConfirmModal({isOpen: false, newStatus: '', message: ''})} className="om-btn om-btn-cancel">Cancel</button>
              <button onClick={() => { 
                setConfirmModal({isOpen: false, newStatus: '', message: ''}); 
                executeStatusChange(confirmModal.newStatus); 
              }} className="om-btn om-btn-deliver" style={{ marginLeft: '12px' }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
