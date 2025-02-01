import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import PaymentModal from './PaymentModal';

const Footer: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <footer className="mt-auto py-6 px-4 border-t border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left text-gray-400">
            Developed by{' '}
            <a
              href="https://fb.com/empiredigits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Empire Digitals
            </a>{' '}
            with <Heart className="inline-block w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            Appreciate and Support Developer
          </button>
        </div>
      </footer>
      
      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </>
  );
};

export default Footer;