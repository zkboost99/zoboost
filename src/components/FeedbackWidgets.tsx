"use client";
import React, { useState, useEffect } from 'react';
import { injectGenieKeyframes } from '@/utils/genie';

export default function FeedbackWidgets() {
  const [activeModal, setActiveModal] = useState<'suggestion' | 'report' | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const { type, rect } = (e as CustomEvent<{ type: 'suggestion' | 'report', rect: DOMRect }>).detail;

      injectGenieKeyframes(rect, 450, 520, 'feedback-genie');
      setActiveModal(type);
      setIsClosing(false);
    };
    document.addEventListener('openFeedback', handleOpen);
    return () => document.removeEventListener('openFeedback', handleOpen);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
    }, 400); // Wait for close animation
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const isSuggestion = activeModal === 'suggestion';
      const endpoint = isSuggestion ? '/api/admin/suggestions' : '/api/admin/bug-reports';
      
      const payload = isSuggestion
        ? {
            name: name || undefined,
            email: email || undefined,
            message: JSON.stringify({ title, desc: details })
          }
        : {
            name: name || undefined,
            email: email || undefined,
            title,
            description: details
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setToast({ 
          type: 'success', 
          message: `${isSuggestion ? 'Suggestion' : 'Bug Report'} submitted successfully!` 
        });
        closeModal();
        setTitle('');
        setDetails('');
        setName('');
        setEmail('');
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err: unknown) {
      console.error(err);
      const errorMsg = err instanceof Error ? err.message : 'Network error, please try again.';
      setToast({ 
        type: 'error', 
        message: errorMsg 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .macos-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .macos-window.feedback-window {
          background-color: #1B1D22;
          width: 90%;
          max-width: 500px;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .feedback-modal-header {
          padding: 24px;
          position: relative;
        }

        .suggestion-header { background: linear-gradient(135deg, #4f46e5, #7c3aed); }
        .report-header { background: linear-gradient(135deg, #e11d48, #be123c); }

        .macos-controls-feedback {
          position: absolute;
          top: 12px;
          right: 12px;
        }

        .macos-btn.close {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #ff5f56;
          cursor: pointer;
          position: relative;
        }
        .macos-btn.close::before, .macos-btn.close::after {
          content: ''; position: absolute; top: 50%; left: 50%;
          width: 8px; height: 1.5px; background: #990000;
          transform-origin: center; opacity: 0; transition: opacity 0.2s;
        }
        .macos-btn.close:hover::before { transform: translate(-50%, -50%) rotate(45deg); opacity: 1; }
        .macos-btn.close:hover::after { transform: translate(-50%, -50%) rotate(-45deg); opacity: 1; }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-content i {
          font-size: 32px;
          opacity: 0.9;
        }

        .header-content h3 {
          margin: 0 0 4px 0;
          font-size: 20px;
          font-weight: 700;
        }

        .header-content p {
          margin: 0;
          font-size: 13px;
          opacity: 0.8;
        }

        .feedback-modal-body {
          padding: 24px;
          background: #1B1D22;
        }

        .form-group {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #9CA3AF;
          margin-bottom: 8px;
        }

        .form-control {
          background-color: #111827;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 16px;
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }

        .form-control:focus {
          border-color: #3b82f6;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .feedback-submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          margin-top: 16px;
          color: #fff;
          transition: opacity 0.2s;
        }

        .feedback-submit-btn:hover { opacity: 0.9; }
        .feedback-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .suggestion-submit { background-color: #6d28d9; }
        .report-submit { background-color: #be123c; }

        .genie-open-anim { animation: slideIn 0.3s ease-out forwards; }
        .genie-close-anim { animation: slideIn 0.3s ease-out reverse backwards; }
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

      {/* Suggestion Modal */}
      {((activeModal as string) === 'suggestion' || (isClosing && (activeModal as string) === 'suggestion')) && (
        <div className="macos-modal-overlay" onClick={closeModal} style={{ opacity: isClosing ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          <div className={`macos-window feedback-window ${isClosing ? 'genie-close-anim' : 'genie-open-anim'}`} onClick={(e) => e.stopPropagation()}>
            <div className="feedback-modal-header suggestion-header">
              <div className="macos-controls-feedback">
                <div className="macos-btn close" onClick={closeModal}></div>
              </div>
              <div className="header-content">
                <i className="fas fa-moon"></i>
                <div>
                  <h3>Share a Suggestion</h3>
                  <p>Your ideas shape our future. What&apos;s on your mind?</p>
                </div>
              </div>
            </div>
            <div className="feedback-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" placeholder="Short &amp; sweet summary" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Details</label>
                  <textarea className="form-control" rows={4} placeholder="Explain what happened or your brilliant idea..." value={details} onChange={(e) => setDetails(e.target.value)} required></textarea>
                </div>
                <div className="input-row">
                  <div className="form-group">
                    <label>NAME (OPT)</label>
                    <input type="text" className="form-control" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>EMAIL (OPT)</label>
                    <input type="email" className="form-control" placeholder="contact@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="feedback-submit-btn suggestion-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Submitting...
                    </>
                  ) : 'Send Suggestion'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {((activeModal as string) === 'report' || (isClosing && (activeModal as string) === 'report')) && (
        <div className="macos-modal-overlay" onClick={closeModal} style={{ opacity: isClosing ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          <div className={`macos-window feedback-window ${isClosing ? 'genie-close-anim' : 'genie-open-anim'}`} onClick={(e) => e.stopPropagation()}>
            <div className="feedback-modal-header report-header">
              <div className="macos-controls-feedback">
                <div className="macos-btn close" onClick={closeModal}></div>
              </div>
              <div className="header-content">
                <i className="fas fa-bug"></i>
                <div>
                  <h3>Report an Issue</h3>
                  <p>Help us squash bugs! Describe what went wrong.</p>
                </div>
              </div>
            </div>
            <div className="feedback-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" placeholder="Short &amp; sweet summary" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Details</label>
                  <textarea className="form-control" rows={4} placeholder="Explain what happened or your brilliant idea..." value={details} onChange={(e) => setDetails(e.target.value)} required></textarea>
                </div>
                <div className="input-row">
                  <div className="form-group">
                    <label>NAME (OPT)</label>
                    <input type="text" className="form-control" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>EMAIL (OPT)</label>
                    <input type="email" className="form-control" placeholder="contact@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="feedback-submit-btn report-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Submitting...
                    </>
                  ) : 'Submit Report'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
