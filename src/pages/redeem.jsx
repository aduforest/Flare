// pages/redeem.jsx
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useCurrentUser } from '../../lib/user';
import { fetcher } from '../../lib/fetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Text } from '../components/Text';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import RedeemAnimation from '../components/RedeemAnimation';

const RedeemPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [collectible, setCollectible] = useState(null);
  const router = useRouter();

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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-500 to-indigo-700 text-white">
      {/* Form and Animation Container */}
      <div className="mt-10 w-full flex flex-col items-center">
      {!showAnimation && !collectible && (
          // Form Container
          <div className="bg-black rounded-lg shadow-lg p-8 w-full max-w-lg">
            <form onSubmit={onRedeem} className="flex flex-col">
              <label
                htmlFor="code"
                className="text-gray-700 font-semibold mb-2"
              >
                Redeem Your Collectible
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
          <div className="flex flex-col items-center mt-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className=" rounded-lg shadow-lg p-6 w-full max-w-lg text-gray-800"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                {collectible.name}
              </h2>
              <img
                src={collectible.image}
                alt={collectible.name}
                className="w-full h-auto mb-4"
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedeemPage;
