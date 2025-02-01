import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import APIConfig from './components/APIConfig';
import DownloadForm from './components/DownloadForm';
import Footer from './components/Footer';

function App() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Empire Media Downloader
          </h1>
          <p className="text-gray-400">Download videos from YouTube, Facebook, Instagram, and TikTok</p>
        </header>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Settings size={20} />
            API Configuration
          </button>
        </div>

        {showConfig && <APIConfig onClose={() => setShowConfig(false)} />}
        <DownloadForm />
      </div>
      <Footer />
    </div>
  );
}

export default App;