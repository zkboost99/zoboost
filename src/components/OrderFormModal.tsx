'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: number;
    media_url?: string;
  };
  currencySymbol: string;
  currencyRate: number;
}

const PAYMENT_METHODS = {
  Pakistan: ['Easypaisa', 'JazzCash', 'NayaPay', 'SadaPay', 'Bank Transfer'],
  Crypto: ['Litecoin (LTC)', 'USDT (BEP20)', 'USDT (Polygon)', 'Ethereum (ETH)', 'Solana (SOL)'],
  International: ['UPI']
};

export default function OrderFormModal({ isOpen, onClose, product, currencySymbol, currencyRate }: OrderFormModalProps) {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const validateForm = () => {
    if (!selectedPayment) {
      return 'Please select a payment method.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/client/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.title,
          productUrl: window.location.href, // Current URL
          productPrice: product.price,
          paymentMethod: selectedPayment,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/order/' + data.orderId);
        }, 100);
      } else {
        setError(data.error || 'Failed to create order. Please try again.');
        // Note: If columns don't exist yet, it will throw an error. We show it here.
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#0b0e14] border border-[#1d2736] rounded-2xl shadow-2xl w-full max-w-2xl my-8 relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1d2736] shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white m-0">Create Order</h2>
            <p className="text-xs text-[#8a9bb4] mt-1 m-0">Complete your details to proceed with the purchase</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#131924] hover:bg-[#1d2736] text-[#8a9bb4] hover:text-white transition-colors cursor-pointer border-none"
            disabled={isSubmitting || success}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-[#00c853]/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#00c853]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Order Created Successfully!</h3>
              <p className="text-sm text-[#8a9bb4] mb-4">Redirecting you to the Order Chat...</p>
              <Loader2 className="w-6 h-6 animate-spin text-[#ffd13b]" />
            </div>
          ) : (
            <form id="orderForm" onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Product Summary */}
              <div className="bg-[#131924] border border-[#1d2736] rounded-xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-[#0b0e14] rounded-lg flex items-center justify-center p-2 shrink-0 border border-[#1d2736]">
                  <img src={product.media_url || '/assets/img/blog/1.jpg'} alt="Product" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{product.title}</div>
                  <div className="text-xs text-[#8a9bb4] mt-1">Total Amount</div>
                </div>
                <div className="text-xl font-black text-[#ffd13b]">
                  {currencySymbol}{(product.price * currencyRate).toFixed(2)}
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400 m-0 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Select Payment Method *</h4>
                <div className="flex flex-col gap-5">
                  {Object.entries(PAYMENT_METHODS).map(([region, methods]) => (
                    <div key={region}>
                      <div className="text-xs font-semibold text-[#7f92ac] mb-2">{region}</div>
                      <div className="flex flex-wrap gap-2">
                        {methods.map(method => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setSelectedPayment(method)}
                            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                              selectedPayment === method 
                                ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6]' 
                                : 'bg-[#131924] border-[#1d2736] text-[#8a9bb4] hover:border-[#3b82f6]/50 hover:text-white'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="p-6 border-t border-[#1d2736] shrink-0 bg-[#0b0e14] rounded-b-2xl flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#131924] text-white hover:bg-[#1d2736] transition-colors border-none cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="orderForm"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#ffd13b] text-neutral-900 hover:bg-[#ffc83b] transition-colors border-none cursor-pointer disabled:opacity-50 flex items-center gap-2 min-w-[140px] justify-center shadow-md"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
              ) : (
                'Create Order'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
