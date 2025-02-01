import React, { useState, useEffect } from 'react';
import { Download, Music, Video, AlertCircle } from 'lucide-react';
import { Platform } from '../types';

const DownloadForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [type, setType] = useState<'video' | 'audio'>('video');
  const [quality, setQuality] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');

  const qualities = {
    video: [
      { label: '4K (2160p)', value: '2160p', size: '~800MB' },
      { label: '1440p', value: '1440p', size: '~500MB' },
      { label: '1080p', value: '1080p', size: '~200MB' },
      { label: '720p', value: '720p', size: '~100MB' },
      { label: '480p', value: '480p', size: '~50MB' },
    ],
    audio: [
      { label: 'High Quality (320kbps)', value: '320', size: '~10MB' },
      { label: 'Medium Quality (192kbps)', value: '192', size: '~7MB' },
      { label: 'Normal Quality (128kbps)', value: '128', size: '~5MB' },
    ],
  };

  const platformColors = {
    youtube: 'border-red-600',
    facebook: 'border-blue-600',
    instagram: 'border-pink-600',
    tiktok: 'border-gray-600',
  };

  const detectPlatform = (url: string): Platform | null => {
    const patterns = {
      youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
      facebook: /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/.+/,
      instagram: /^(https?:\/\/)?(www\.)?(instagram\.com)\/.+/,
      tiktok: /^(https?:\/\/)?(www\.)?(tiktok\.com)\/.+/,
    };

    for (const [platform, pattern] of Object.entries(patterns)) {
      if (pattern.test(url)) {
        return platform as Platform;
      }
    }
    return null;
  };

  const validateUrl = async (url: string) => {
    const detectedPlatform = detectPlatform(url);
    setPlatform(detectedPlatform);
    setError('');

    if (!detectedPlatform) {
      setError('Invalid URL. Please enter a valid social media link.');
      setThumbnail('');
      return;
    }

    try {
      // Here you'll integrate with your API to validate the URL and fetch thumbnail
      // For now, we'll just simulate the validation
      const apiKeys = JSON.parse(localStorage.getItem('apiKeys') || '{}');
      const platformKey = apiKeys[detectedPlatform];
      
      if (!platformKey) {
        setError('API key not configured for this platform');
        return;
      }

      // API integration will go here to fetch thumbnail and validate URL
      // setThumbnail(response.thumbnail);
    } catch (err) {
      setError('Error validating URL. Please try again.');
    }
  };

  useEffect(() => {
    if (url) {
      const timeoutId = setTimeout(() => validateUrl(url), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform || !quality) return;

    try {
      // API integration will go here
      // The response should include the download URL
      // window.location.href = downloadUrl; // Auto download
    } catch (err) {
      setError('Error downloading content. Please try again.');
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border-2 ${platform ? platformColors[platform] : 'border-gray-700'}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Enter URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Paste your video URL here"
            required
          />
          {error && (
            <div className="mt-2 text-red-500 flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {platform === 'youtube' && !error && (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setType('video')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg ${
                type === 'video'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Video size={20} />
              Video
            </button>
            <button
              type="button"
              onClick={() => setType('audio')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg ${
                type === 'audio'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Music size={20} />
              Audio
            </button>
          </div>
        )}

        {thumbnail && (
          <div className="aspect-video rounded-lg overflow-hidden">
            <img src={thumbnail} alt="Content preview" className="w-full h-full object-cover" />
          </div>
        )}

        {platform && !error && (
          <div>
            <label className="block text-sm font-medium mb-2">Quality</label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="">Select quality</option>
              {qualities[platform === 'youtube' ? type : 'video'].map((q) => (
                <option key={q.value} value={q.value}>
                  {q.label} ({q.size})
                </option>
              ))}
            </select>
          </div>
        )}

        {platform && !error && quality && (
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={20} />
            Download
          </button>
        )}
      </form>
    </div>
  );
};

export default DownloadForm;