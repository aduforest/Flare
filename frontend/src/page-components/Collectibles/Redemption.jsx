import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import { fetcher } from '@/lib/fetch';
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import styles from './Redemption.module.css';

const Redemption = () => {
  const codeRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const onSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     try {
  //       setIsLoading(true);
  //       const response = await fetcher('/api/collectibles/redeem', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ code: codeRef.current.value }),
  //       });

  //       if (response.collectible) {
  //         toast.success('Collectible redeemed successfully');
  //         // Redirect to the collectible detail page
  //         router.push(`/collectibles/${response.collectible._id}`);
  //       } else {
  //         toast.error('Invalid code or collectible not found');
  //       }
  //     } catch (e) {
  //       toast.error(e.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [router]
  // );

  return (
    <div className={styles.root}>
    <Spacer size={1} axis="vertical" />
    <div >
      <h1 className={styles.title}>Redeem Your Collectible</h1>
      {/* <form onSubmit={onSubmit}>
        <Input
          ref={codeRef}
          htmlType="text"
          placeholder="Enter your redemption code"
          ariaLabel="Redemption Code"
          size="large"
          required
        />
        <Spacer size={0.5} axis="vertical" />
        <Button
          htmlType="submit"
          className={styles.submit}
          type="success"
          size="large"
          loading={isLoading}
        >
          Redeem
        </Button>
      </form> */}
    </div>
  </div>
  );
};

export default Redemption;
