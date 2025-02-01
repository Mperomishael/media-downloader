import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

interface PaymentModalProps {
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: Date.now().toString(),
    amount: Number(amount),
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phone_number: '',
      name: email.split('@')[0],
    },
    customizations: {
      title: 'Support Empire Digitals',
      description: 'Thank you for your support!',
      logo: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=128&h=128&fit=crop&crop=faces',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !amount) {
      setError('Email and amount are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (Number(amount) < 100) {
      setError('Minimum amount is ₦100');
      return;
    }

    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal();
        if (response.status === 'successful') {
          window.location.href = '/thank-you';
        }
      },
      onClose: () => {
        // Handle modal close
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Support Empire Digitals</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount (₦)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              min="100"
              step="100"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter amount (minimum ₦100)"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;