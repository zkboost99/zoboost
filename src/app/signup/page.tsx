"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleOAuthSignIn = async (provider: 'google' | 'discord') => {
    try {
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(returnUrl)}`,
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
    
    if (password !== confirmPassword) {
      setToast({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    if (!agreeTerms) {
      setToast({ type: 'error', message: 'You must agree to the Terms & Conditions.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        throw error;
      }

      setToast({ type: 'success', message: 'Account created successfully! Please log in.' });
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);
      
      setTimeout(() => {
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
        router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      }, 1500);
    } catch (err: any) {
      setToast({ type: 'error', message: err.message || 'Failed to sign up. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div 
        id="smooth-content" 
        className="min-h-[calc(100vh-100px)] flex items-center justify-center relative py-20 bg-[#111214] overflow-hidden"
      >
        {/* Discord-like Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5865F2] opacity-[0.07] blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#5865F2] opacity-[0.05] blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-[480px] relative z-10 px-4">
          <div 
            className="bg-[#313338] rounded-[24px] p-8 md:p-10 shadow-2xl border border-white/[0.02]"
          >
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-[#1E1F22] rounded-[16px] flex items-center justify-center mb-6 shadow-inner border border-white/[0.05]">
                <svg viewBox="0 0 127.14 96.36" width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="#5865F2">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.87-.64,1.72-1.31,2.53-2a75.46,75.46,0,0,0,76,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.42-18.83C129.89,50.15,123.66,27.27,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                </svg>
              </div>
              <h3 className="text-[28px] font-bold text-[#F2F3F5] mb-2 tracking-tight">Create an account</h3>
              <p className="text-[#B5BAC1] text-[15px]">Join ZoroBoost for premium Discord services.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="flex flex-col gap-3 mb-6">
                <button 
                  type="button"
                  onClick={() => handleOAuthSignIn('discord')}
                  className="w-full h-[48px] rounded-[3px] bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center gap-3 font-medium text-[15px] transition-colors"
                >
                  <svg viewBox="0 0 127.14 96.36" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.87-.64,1.72-1.31,2.53-2a75.46,75.46,0,0,0,76,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.42-18.83C129.89,50.15,123.66,27.27,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                  </svg> 
                  Continue with Discord
                </button>
                <button 
                  type="button"
                  onClick={() => handleOAuthSignIn('google')}
                  className="w-full h-[48px] rounded-[3px] bg-[#2B2D31] hover:bg-[#1E1F22] text-[#DBDEE1] flex items-center justify-center gap-3 font-medium text-[15px] transition-colors"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg> 
                  Continue with Google
                </button>
              </div>

              <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-[#1E1F22]"></div>
                <span className="flex-shrink-0 mx-4 text-[#B5BAC1] text-[11px] font-bold uppercase tracking-wide">Or email sign up</span>
                <div className="flex-grow border-t border-[#1E1F22]"></div>
              </div>

              <div className="mb-4">
                <label className="text-[#B5BAC1] text-[12px] font-bold uppercase tracking-wide block mb-2">Username / Name <span className="text-[#F23F42]">*</span></label>
                <div className="relative">
                  <input 
                    className="w-full bg-[#1E1F22] text-[#DBDEE1] border-none rounded-[3px] h-[48px] px-3 focus:outline-none focus:ring-1 focus:ring-[#5865F2] transition-all" 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    disabled={isSubmitting} 
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[#B5BAC1] text-[12px] font-bold uppercase tracking-wide block mb-2">Email <span className="text-[#F23F42]">*</span></label>
                <div className="relative">
                  <input 
                    className="w-full bg-[#1E1F22] text-[#DBDEE1] border-none rounded-[3px] h-[48px] px-3 focus:outline-none focus:ring-1 focus:ring-[#5865F2] transition-all" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    disabled={isSubmitting} 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <label className="text-[#B5BAC1] text-[12px] font-bold uppercase tracking-wide block mb-2">Password <span className="text-[#F23F42]">*</span></label>
                  <div className="relative">
                    <input 
                      className="w-full bg-[#1E1F22] text-[#DBDEE1] border-none rounded-[3px] h-[48px] px-3 focus:outline-none focus:ring-1 focus:ring-[#5865F2] transition-all" 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      disabled={isSubmitting} 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-[#B5BAC1] text-[12px] font-bold uppercase tracking-wide block mb-2">Confirm <span className="text-[#F23F42]">*</span></label>
                  <div className="relative">
                    <input 
                      className="w-full bg-[#1E1F22] text-[#DBDEE1] border-none rounded-[3px] h-[48px] px-3 focus:outline-none focus:ring-1 focus:ring-[#5865F2] transition-all" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      required 
                      disabled={isSubmitting} 
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-6 text-[13px]">
                <label className="text-[#B5BAC1] cursor-pointer flex items-center gap-2 m-0 hover:text-[#DBDEE1] transition-colors">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms} 
                    onChange={(e) => setAgreeTerms(e.target.checked)} 
                    className="cursor-pointer accent-[#5865F2] w-4 h-4 rounded-[3px] border-[#1E1F22] bg-[#1E1F22]" 
                  /> 
                  <span>I agree to the <Link href="/terms-and-conditions" className="text-[#00A8FC] hover:underline font-medium">Terms &amp; Conditions</Link></span>
                </label>
              </div>

              <button 
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-colors" 
                type="submit" 
                disabled={isSubmitting} 
                style={{ height: '48px', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Registering...
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </form>

            <div className="mt-6 text-[#B5BAC1] text-[13px] text-center">
              Already have an account? <Link href="/login" className="text-[#00A8FC] hover:underline font-medium">Log In</Link>
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
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #ffffff !important;
          backdrop-filter: blur(10px);
        }
        .social-btn-google:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.2) !important;
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
