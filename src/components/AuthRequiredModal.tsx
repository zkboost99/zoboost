'use client';

import { X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthRequiredModal({ isOpen, onClose }: AuthRequiredModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleLogin = () => {
    // Save buy intent in local storage to automatically trigger the payment popup after login
    localStorage.setItem('pending_buy_intent', 'true');
    router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
  };

  const handleSignup = () => {
    localStorage.setItem('pending_buy_intent', 'true');
    router.push(`/signup?returnUrl=${encodeURIComponent(pathname)}`);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#0b0e14] border border-[#1d2736] rounded-2xl shadow-2xl w-full max-w-md my-8 relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1d2736]">
          <div>
            <h2 className="text-xl font-bold text-white m-0">Login Required</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#131924] hover:bg-[#1d2736] text-[#8a9bb4] hover:text-white transition-colors cursor-pointer border-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Create an account to continue</h3>
          <p className="text-sm text-[#8a9bb4] mb-6">
            Please login or create your account to proceed with your purchase and track your order.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-lg text-sm font-bold bg-[#ffd13b] text-neutral-900 hover:bg-[#ffc83b] transition-colors border-none cursor-pointer shadow-md"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="w-full py-3 rounded-lg text-sm font-bold bg-[#131924] text-white hover:bg-[#1d2736] transition-colors border border-[#1d2736] cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
