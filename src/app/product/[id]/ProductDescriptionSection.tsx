"use client";

import { useState, useRef } from 'react';

interface ProductDescriptionSectionProps {
  product: {
    title: string;
    description: string;
    category: string;
    price: number;
    delivery_method: string;
    delivery_time: string;
    status: string;
  };
}

export default function ProductDescriptionSection({ product }: ProductDescriptionSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const openModal = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* macOS Modal Trigger */}
      <button 
        ref={btnRef} 
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-bg-secondary text-amber-600 dark:text-amber-500 rounded-lg border border-border-subtle hover:bg-neutral-500/10 cursor-pointer transition-all"
        onClick={openModal}
      >
        <i className="fas fa-file-alt"></i> View Long Description
      </button>

      {/* macOS Modal Structure */}
      {(isOpen || isClosing) && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div 
            className="w-full max-w-lg bg-card border border-border-subtle rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-transform duration-300 scale-100" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-bg-secondary border-b border-border-subtle p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-file-alt text-2xl text-amber-500"></i>
                <div>
                  <h3 className="text-sm font-bold text-foreground m-0">{product.title}</h3>
                  <p className="text-xs text-muted-foreground m-0">Detailed product overview and instructions</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-neutral-500/10 hover:bg-neutral-500/25 flex items-center justify-center border-none text-foreground cursor-pointer transition-all"
                aria-label="Close modal"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 text-sm text-foreground leading-relaxed overflow-y-auto">
              <h4 className="font-bold text-amber-600 dark:text-amber-500 mb-3 text-base">Overview & Features</h4>
              <p className="mb-4 text-foreground/90">
                Thank you for choosing ZoroBoost. Here is the detailed description and instructions for <strong>{product.title}</strong>:
              </p>
              <ul className="pl-5 list-disc mb-5 text-muted-foreground space-y-1">
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Price:</strong> ${product.price}</li>
                <li><strong>Delivery Process:</strong> {product.delivery_method} ({product.delivery_time})</li>
                <li><strong>Service Status:</strong> {product.status || 'Active'}</li>
              </ul>
              <p className="mb-4 text-foreground/90">
                Our {product.category} service is fully optimized for speed, reliability, and account safety. Once your payment is verified, our automated systems and support agents will immediately process your order.
              </p>
              <p className="font-bold text-amber-600 dark:text-amber-500 mb-2">
                Order Implementation Guidelines:
              </p>
              <p className="mb-4 text-foreground/90">
                Please make sure that the details you provide (like server link or username) are 100% correct. If you face any issues or need custom configurations, feel free to contact our support team on Discord.
              </p>
              <div className="bg-amber-500/5 border border-amber-400/20 p-4 rounded-xl text-xs text-amber-600 dark:text-amber-500 flex gap-2 items-start mt-4">
                <i className="fas fa-info-circle mt-0.5 shrink-0"></i> 
                <span><strong>Important Note:</strong> This is a premium digital service. Refills and refunds are covered under our ZoroBoost Refund Policy.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
