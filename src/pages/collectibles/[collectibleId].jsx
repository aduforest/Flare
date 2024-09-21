// pages/collectibles/[collectibleId].jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import { Wrapper } from '../../components/Layout';
import { Text } from '../../components/Text';

const CollectibleDetailPage = () => {
  const router = useRouter();
  const { collectibleId } = router.query;
  const [collectible, setCollectible] = useState(null);

  useEffect(() => {
    if (collectibleId) {
      fetcher(`/api/collectibles/${collectibleId}`).then((data) => {
        setCollectible(data.collectible);
      });
    }
  }, [collectibleId]);

  if (!collectible) {
    return (
      <Wrapper>
        <Text>Loading...</Text>
      </Wrapper>
    );
  }

  return (
    <div>
      <div className="max-w-xl mx-auto rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">{collectible.name}</h1>
        <img
          src={collectible.image}
          alt={collectible.name}
          className="w-full h-148 mb-4"
        />
        <Text className="text-lg">{collectible.description}</Text>
      </div>
    </div>
  );
};

export default CollectibleDetailPage;
