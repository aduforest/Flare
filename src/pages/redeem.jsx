// pages/redeem.jsx

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useCurrentUser } from '../../lib/user';
import { fetcher } from '../../lib/fetch';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Text } from '../components/Text';
import RedeemAnimation from '../components/RedeemAnimation';
import dynamic from 'next/dynamic';

// Dynamically import ModelViewer with SSR disabled
const ModelViewer = dynamic(() => import('../components/ModelViewer'), {
  ssr: false,
});

const RedeemPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [collectible, setCollectible] = useState(null);

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

        // Show the animation
        setShowAnimation(true);
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

  const handleAnimationComplete = () => {
    setShowAnimation(false);
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
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-500 to-indigo-700 text-white">
      {/* Form and Animation Container */}
      <div className="relative z-10 mt-10 w-full flex flex-col items-center">
        {!showAnimation && !collectible && (
          // Form Container
          <div className="bg-black bg-opacity-75 rounded-lg shadow-lg p-8 w-full max-w-lg">
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

        {/* Animation */}
        {showAnimation && (
          <RedeemAnimation onAnimationComplete={handleAnimationComplete} />
        )}

        {/* Collectible Display */}
        {collectible && !showAnimation && (
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
                  style={{ width: '100%', height: '100%' }}
                  exposure="1.5"
                  cameraOrbit="0deg 90deg 1m" // Adjust camera settings if needed
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
      </div>
    </div>
  );
};

export default RedeemPage;
