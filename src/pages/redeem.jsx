// pages/redeem.jsx
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Wrapper } from '../components/Layout';
import { useCurrentUser } from '../../lib/user';
import { fetcher } from '../../lib/fetch';
import { useState } from 'react';
import { Text } from '../components/Text';
import toast from 'react-hot-toast';

const RedeemPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onRedeem = async (e) => {
    e.preventDefault();
    console.log('Redeem function called');
    console.log('Code:', code);
    if (!code) return;

    setIsLoading(true);
    try {
      await fetcher('/api/collectibles/redeem', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Collectible redeemed successfully');
      setCode('');
    } catch (e) {
      console.error(e);
      toast.error(e.message);
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
