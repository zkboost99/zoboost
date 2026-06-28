"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleOAuthSignIn = async (provider: 'google' | 'discord') => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setToast({ type: 'error', message: err.message || `Failed to sign in with ${provider}` });
    }
  };


  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Mock login request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setToast({ type: 'success', message: 'Logged in successfully!' });
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to sign in. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Start Breadcrumb */}
      <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{ backgroundImage: "url(/assets/img/shape/banner-14.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>Sign In</h1>
              <ul className="breadcrumb">
                <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                <li>Sign In</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb */}

      <div id="smooth-content">
        <div className="contact-style-one-area overflow-hidden default-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-10">
                <div 
                  className="contact-form-card" 
                  style={{ 
                    background: '#ffffff', 
                    borderRadius: '15px', 
                    padding: '40px', 
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <h3 style={{ fontWeight: '700', marginBottom: '10px', color: '#111827' }} className="text-center">Welcome Back</h3>
                  <p className="text-center" style={{ color: '#6b7280', marginBottom: '30px' }}>
                    Sign in to your ZoroBoost account to continue.
                  </p>

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="row g-3" style={{ marginBottom: '20px' }}>
                      <div className="col-sm-6">
                        <button 
                          type="button"
                          onClick={() => handleOAuthSignIn('google')}
                          className="btn social-btn-google w-100"
                          style={{ 
                            height: '48px', 
                            borderRadius: '8px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '10px',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                          </svg> Google
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <button 
                          type="button"
                          onClick={() => handleOAuthSignIn('discord')}
                          className="btn social-btn-discord w-100"
                          style={{ 
                            height: '48px', 
                            borderRadius: '8px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '10px',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <svg viewBox="0 0 127.14 96.36" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.87-.64,1.72-1.31,2.53-2a75.46,75.46,0,0,0,76,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.42-18.83C129.89,50.15,123.66,27.27,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                          </svg> Discord
                        </button>
                      </div>
                    </div>

                    <div style={{ position: 'relative', textAlign: 'center', margin: '20px 0 25px' }}>
                      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0' }} />
                      <span style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        background: '#ffffff', 
                        padding: '0 15px', 
                        color: '#6b7280', 
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Or email sign in
                      </span>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                          <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>Email Address</label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                              <i className="fas fa-envelope"></i>
                            </span>
                            <input 
                              className="form-control" 
                              placeholder="Enter your email" 
                              type="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              required 
                              disabled={isSubmitting} 
                              style={{ 
                                paddingLeft: '45px', 
                                background: '#f9fafb', 
                                border: '1px solid #e5e7eb', 
                                color: '#1f2937',
                                borderRadius: '8px',
                                height: '50px'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                          <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>Password</label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                              <i className="fas fa-lock"></i>
                            </span>
                            <input 
                              className="form-control" 
                              placeholder="Enter your password" 
                              type="password" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                              required 
                              disabled={isSubmitting} 
                              style={{ 
                                paddingLeft: '45px', 
                                background: '#f9fafb', 
                                border: '1px solid #e5e7eb', 
                                color: '#1f2937',
                                borderRadius: '8px',
                                height: '50px'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-lg-12 d-flex justify-content-between align-items-center">
                        <label style={{ color: '#4b5563', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                          <input type="checkbox" style={{ cursor: 'pointer' }} /> Remember me
                        </label>
                        <a href="#" style={{ color: '#3b82f6', fontWeight: '500' }}>Forgot password?</a>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <button 
                          className="btn btn-style-one w-100" 
                          type="submit" 
                          disabled={isSubmitting} 
                          style={{ height: '50px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Signing In...
                            </>
                          ) : (
                            <>
                              Sign In <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="text-center" style={{ marginTop: '25px', color: '#4b5563' }}>
                    Don't have an account? <Link href="/signup" style={{ color: '#3b82f6', fontWeight: '600' }}>Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .social-btn-google {
          background: #ffffff !important;
          border: 1px solid #e5e7eb !important;
          color: #374151 !important;
        }
        .social-btn-google:hover {
          background: #f9fafb !important;
          border-color: #d1d5db !important;
        }
        .social-btn-discord {
          background: #5865F2 !important;
          border: none !important;
          color: #ffffff !important;
        }
        .social-btn-discord:hover {
          background: #4752c4 !important;
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
    </>
  );
}
