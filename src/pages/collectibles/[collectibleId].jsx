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
      <div className="max-w-2xl mx-auto rounded-lg shadow p-4">
        <h1 className="text-2xl font-bold text-center">
          {collectible.name}
        </h1>
        {/* 3D Model Viewer */}
        <div className="w-full" style={{ height: '80vh' }}>
          <ModelViewer src={collectible.glb} alt={collectible.name} autoRotate={true} />
        </div>
      </div>
    </div>
  );
};

export default CollectibleDetailPage;
