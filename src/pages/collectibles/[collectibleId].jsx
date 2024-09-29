// pages/collectibles/[collectibleId].jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetcher } from '@/lib/fetch';
import { Wrapper } from '../../components/Layout';
import { Text } from '../../components/Text';
import '@google/model-viewer'; // Import the model-viewer library
import dynamic from 'next/dynamic';

const ModelViewer = dynamic(
  () => import('@google/model-viewer'),
  { ssr: false }
);

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
          <model-viewer
            src="/cacti.glb"
            alt={collectible.name}
            style={{ width: '100%', height: '100%' }}
            camera-controls
            auto-rotate
            ar
            poster="/path/to/loading-image.png" // Optional: Placeholder image while the model loads
          ></model-viewer>
        </div>
      </div>
    </div>
  );
};

export default CollectibleDetailPage;
