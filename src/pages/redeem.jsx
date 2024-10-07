// pages/redeem.jsx

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useCurrentUser } from '../../lib/user';
import { fetcher } from '../../lib/fetch';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Text } from '../components/Text';
import dynamic from 'next/dynamic';

// Dynamically import ModelViewer with SSR disabled
const ModelViewer = dynamic(() => import('../components/ModelViewer'), {
  ssr: false,
});

const RedeemPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [collectible, setCollectible] = useState(null);
  const videoRef = useRef(null);

  const onRedeem = async (e) => {
    e.preventDefault();
    if (!code) return;

    setIsLoading(true);
    try {
      const response = await fetcher('/api/collectibles/redeem', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.collectibleId) {
        setCode('');
        // Fetch the collectible data
        const collectibleData = await fetcher(
          `/api/collectibles/${response.collectibleId}`
        );
        setCollectible(collectibleData.collectible);

        // Show the video
        setShowVideo(true);

        // Play the video with audio
        if (videoRef.current) {
          videoRef.current.muted = false; // Unmute the video
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error('Video playback failed:', error);
            });
          }
        }
      } else {
        throw new Error('Collectible ID not returned from API');
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoEnded = () => {
    setShowVideo(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-500 to-indigo-700 text-white">
        <Text className="text-xl font-semibold mt-20">
          You must be logged in to redeem a code.
        </Text>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-500 to-indigo-700 text-white">
      {/* Form Container */}
      {!showVideo && !collectible && (
        <div className="bg-black bg-opacity-75 rounded-lg shadow-lg p-8 w-full max-w-lg mx-auto mt-10">
          <form onSubmit={onRedeem} className="flex flex-col">
            <label
              htmlFor="code"
              className="text-white font-semibold mb-2"
            >
              Redeem Your Flare
            </label>
            <Input
              id="code"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              ariaLabel="Code"
              className="mb-4"
            />
            <Button type="success" loading={isLoading} className="w-full">
              Redeem
            </Button>
          </form>
        </div>
      )}

      {/* Collectible Display */}
      {collectible && (
        <div className="flex flex-col items-center mt-10 w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            {collectible.name}
          </h2>
          <div className="w-full" style={{ height: '80vh' }}>
            {collectible.glb ? (
              <ModelViewer
                src={collectible.glb}
                alt={collectible.name}
                autoRotate={true}
                cameraControls={true}
                interactionPrompt="none"
                autoRotateDelay="11160"
                style={{ width: '100%', height: '100%' }}
                exposure="1.5"
                cameraOrbit="0deg 90deg 1m"
                fieldOfView="30deg"
              />
            ) : (
              <img
                src={collectible.image}
                alt={collectible.name}
                className="w-full h-auto mb-4"
              />
            )}
          </div>
        </div>
      )}

      {/* Video Overlay */}
      {showVideo && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <video
            ref={videoRef}
            onEnded={handleVideoEnded}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none', backgroundColor: 'transparent' }}
            playsInline
            autoPlay
            muted={false}
          >
            <source src="/cacti.webm" type="video/webm" />
            {/* Optional fallback for browsers that don't support WebM transparency */}
            {/* <source src="/your_video.mp4" type="video/mp4" /> */}
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default RedeemPage;
