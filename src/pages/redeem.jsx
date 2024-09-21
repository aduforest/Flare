// pages/redeem.jsx
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Wrapper } from '../components/Layout';
import { useCurrentUser } from '../../lib/user';
import { fetcher } from '../../lib/fetch';
import { useState } from 'react';
import { Text } from '../components/Text';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'; // Import useRouter

const RedeemPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize router

  const onRedeem = async (e) => {
    e.preventDefault();
    console.log('Redeem function called');
    console.log('Code:', code);
    if (!code) return;

    setIsLoading(true);
    try {
      const response = await fetcher('/api/collectibles/redeem', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the response contains the collectibleId
      if (response.collectibleId) {
        toast.success('Collectible redeemed successfully');
        setCode('');

        // Redirect to the collectible's page
        router.push(`/collectibles/${response.collectibleId}`);
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

  if (!user) {
    return (
      <Wrapper>
        <Text>You must be logged in to redeem a code.</Text>
      </Wrapper>
    );
  }

  return (
    <div>
      <Text
        style={{ marginBottom: '1rem', marginTop: '1rem', marginLeft: '1rem' }}
      >
        Redeem your collectible.
      </Text>
      <form onSubmit={onRedeem}>
        <Input
          placeholder="Enter your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          ariaLabel="Code"
        />
        <Button type="success" loading={isLoading}>
          Redeem
        </Button>
      </form>
    </div>
  );
};

export default RedeemPage;
