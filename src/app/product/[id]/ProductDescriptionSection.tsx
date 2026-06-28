"use client";

import { useState, useRef } from 'react';
import { injectGenieKeyframes } from '@/utils/genie';

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
  const btnRef = useRef<HTMLLabelElement>(null);

  const openModal = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      injectGenieKeyframes(rect, 500, 500, 'desc-genie');
    }
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400); // match genie-close animation duration
  };

  return (
    <>
      <p className="premium-details-desc">
        {product.description}
      </p>

      {/* macOS Modal Trigger */}
      <label ref={btnRef} className="macos-modal-trigger-btn" onClick={openModal}>
        <i className="fas fa-file-alt"></i> View Long Description
      </label>

      {/* macOS Modal Structure */}
      {(isOpen || isClosing) && (
        <div className="macos-modal-overlay" onClick={closeModal} style={{ opacity: isClosing ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          <div className={`macos-window feedback-window ${isClosing ? 'genie-close-anim' : 'genie-open-anim'}`} onClick={(e) => e.stopPropagation()} style={{ width: '90%', maxWidth: '500px' }}>
            <div className="feedback-modal-header suggestion-header">
              <div className="macos-controls-feedback">
                <div className="macos-btn close" onClick={closeModal}></div>
              </div>
              <div className="header-content">
                <i className="fas fa-file-alt"></i>
                <div>
                  <h3>{product.title}</h3>
                  <p>Detailed product overview and instructions</p>
                </div>
              </div>
            </div>
            
            <div className="feedback-modal-body" style={{ color: '#fff', fontSize: '14.5px', lineHeight: '1.7' }}>
              <h4 style={{ fontWeight: '700', marginBottom: '12px', color: '#6366f1' }}>Overview & Features</h4>
              <p style={{ marginBottom: '15px' }}>
                Thank you for choosing ZoroBoost. Here is the detailed description and instructions for <strong>{product.title}</strong>:
              </p>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginBottom: '20px', color: '#ccc' }}>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Price:</strong> ${product.price}</li>
                <li><strong>Delivery Process:</strong> {product.delivery_method} ({product.delivery_time})</li>
                <li><strong>Service Status:</strong> {product.status || 'Active'}</li>
              </ul>
              <p style={{ marginBottom: '15px' }}>
                Our {product.category} service is fully optimized for speed, reliability, and account safety. Once your payment is verified, our automated systems and support agents will immediately process your order.
              </p>
              <p style={{ fontWeight: '600', color: '#6366f1', marginBottom: '8px' }}>
                Order Implementation Guidelines:
              </p>
              <p style={{ marginBottom: '15px' }}>
                Please make sure that the details you provide (like server link or username) are 100% correct. If you face any issues or need custom configurations, feel free to contact our support team on Discord.
              </p>
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '13px', color: '#a5b4fc' }}>
                <i className="fas fa-info-circle"></i> <strong>Important Note:</strong> This is a premium digital service. Refills and refunds are covered under our ZoroBoost Refund Policy.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
