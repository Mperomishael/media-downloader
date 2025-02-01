import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

const ThankYou: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center text-white p-8">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Support!</h1>
        <p className="text-gray-400">
          Your contribution means a lot to us. Redirecting back to home page...
        </p>
      </div>
    </div>
  );
};

export default ThankYou;