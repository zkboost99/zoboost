"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Gamepad2, ShieldAlert, KeyRound, Mail, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  
  // Math Captcha state
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Generate random math captcha on load
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 1. Verify Math Captcha
    if (parseInt(captchaAnswer) !== num1 + num2) {
      setError('Math Captcha is incorrect.');
      return;
    }
    
    // 2. Verify Security Question (Client-side pre-check to prevent brute force)
    if (securityQuestion !== 'Im_Zoro') {
      setError('Invalid security question answer.');
      return;
    }

    setLoading(true);

    try {
      // 3. Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // 4. Verify Admin Role & Security Question via Metadata
      const user = data.user;
      const role = user?.app_metadata?.role;
      const dbSecurityQuestion = user?.user_metadata?.security_question;

      if (role !== 'admin' || dbSecurityQuestion !== 'Im_Zoro') {
        await supabase.auth.signOut();
        throw new Error('Unauthorized: Admin access required.');
      }

      setSuccess(true);
      // Wait a moment then redirect to a safe admin area
      setTimeout(() => {
        router.push('/admin.html');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
      // Reset captcha on failure
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setCaptchaAnswer('');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-deep p-4">
        <div className="w-full max-w-md bg-card border border-border-subtle rounded-2xl p-8 text-center shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Granted</h2>
          <p className="text-muted-foreground mb-8">Welcome back, Admin. Initializing dashboard...</p>
          <div className="w-full h-1 bg-border-subtle rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 w-1/2 animate-[pulse_1s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-deep p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Link href="/" className="flex items-center mb-8 z-10" style={{ textDecoration: 'none' }}>
        <Image 
          src="/zoroboost-logo.png" 
          alt="ZoroBoost Logo" 
          width={220} 
          height={60} 
          className="h-12 w-auto object-contain dark:bg-white/90 dark:p-1.5 dark:rounded-lg drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-colors"
          priority
        />
      </Link>

      <div className="w-full max-w-[420px] bg-card border border-border-subtle rounded-2xl shadow-2xl p-6 sm:p-8 z-10">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Admin Portal
          </h1>
          <p className="text-sm text-muted-foreground">Restricted Access. Authenticate to continue.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                placeholder="admin@zoroboost.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Security Question</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                required
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                placeholder="Who are you?"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-border-subtle">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Bot Verification</label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-background border border-border-subtle rounded-xl py-2.5 px-4 text-center font-mono text-sm text-foreground">
                {num1} + {num2} = ?
              </div>
              <input
                type="number"
                required
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="w-24 text-center py-2.5 bg-background border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                placeholder="0"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
}
