import React, { useState } from 'react';
import { X } from 'lucide-react';

const APIConfig: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [apis, setApis] = useState({
    youtube: '',
    facebook: '',
    instagram: '',
    tiktok: '',
  });

  const handleSave = () => {
    localStorage.setItem('apiKeys', JSON.stringify(apis));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">API Configuration</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {Object.entries(apis).map(([platform, key]) => (
          <div key={platform} className="mb-4">
            <label className="block text-sm font-medium mb-2 capitalize">
              {platform} API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setApis({ ...apis, [platform]: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder={`Enter ${platform} API key`}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium transition-colors"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default APIConfig;