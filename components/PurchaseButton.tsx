'use client';

import { useState } from 'react';

interface PurchaseButtonProps {
  itemTitle: string;
  price?: number;
  className?: string;
}

export default function PurchaseButton({ itemTitle, price = 150, className = '' }: PurchaseButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handlePurchase = () => {
    setIsClicked(true);
    
    // Create email subject and body
    const subject = encodeURIComponent(`Purchase Inquiry - ${itemTitle}`);
    const body = encodeURIComponent(`Hi Brian,

I'm interested in purchasing "${itemTitle}" from your "All Marlboro Men Go To Heaven" collection. 
I will send payment of $${price} via PayPal or Venmo as per your instructions.

[PayPal newyorksaint@gmail.com]
[Venmo: @BrianStCyr2]

Please let me know:
- Shipping information
- Expected delivery time

My mailing address:
[Please add your mailing address here]

Thank you!`);

    // Open email client
    window.location.href = `mailto:newyorksaint@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset button state after a short delay
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <button
      onClick={handlePurchase}
      className={`
        px-8 py-3 bg-black text-white font-medium rounded-lg 
        hover:bg-gray-800 active:bg-gray-900 
        transition-all duration-200 transform hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
      disabled={isClicked}
    >
      {isClicked ? (
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Opening Email...
        </span>
      ) : (
        `Available for Purchase - $${price}`
      )}
    </button>
  );
}