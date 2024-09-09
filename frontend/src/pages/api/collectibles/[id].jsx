import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetcher } from '@/lib/fetch';
import { LoadingDots } from '../../components/LoadingDots';
import styles from './Collectible.module.css';

const CollectibleDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [collectible, setCollectible] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetcher(`/api/collectibles/${id}`)
        .then((data) => {
          setCollectible(data.collectible);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <LoadingDots>Loading...</LoadingDots>;
  }

  if (!collectible) {
    return <div>Collectible not found</div>;
  }

  return (
    <div className={styles.collectible}>
      <h1>{collectible.name}</h1>
      <img src={collectible.image} alt={collectible.name} className={styles.image} />
      <p>{collectible.description}</p>
    </div>
  );
};

export default CollectibleDetail;
