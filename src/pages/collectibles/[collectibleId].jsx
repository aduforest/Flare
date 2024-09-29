// pages/collectibles/[collectibleId].jsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetcher } from '@/lib/fetch';
import { Wrapper } from '../../components/Layout';
import { Text } from '../../components/Text';
import dynamic from 'next/dynamic';

const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
});

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
      <div className="max-w-2xl mx-auto rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {collectible.name}
        </h1>
        {/* 3D Model Viewer */}
        <div className="w-full" style={{ height: '50vh' }}>
          <ModelViewer src="/cacti.glb" alt={collectible.name} />
        </div>
        <Text className="text-lg mt-4">{collectible.description}</Text>
      </div>
    </div>
  );
};

export default CollectibleDetailPage;
