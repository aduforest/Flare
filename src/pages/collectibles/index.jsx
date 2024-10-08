// pages/collectibles/index.jsx
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/lib/user';
import { fetcher } from '@/lib/fetch';
import { Wrapper } from '../../components/Layout';
import { Text } from '../../components/Text';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import ModelViewer with SSR disabled
const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
});

const UserCollectiblesPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const [collectibles, setCollectibles] = useState(null);

  useEffect(() => {
    if (user) {
      fetcher('/api/collectibles/user').then((data) => {
        setCollectibles(data.collectibles);
      });
    }
  }, [user]);

  if (!user) {
    return (
      <Wrapper>
        <Text>You must be logged in to view your collectibles.</Text>
      </Wrapper>
    );
  }

  if (!collectibles) {
    return (
      <Wrapper>
        <Text>Loading...</Text>
      </Wrapper>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 ml-4">Your Collectibles</h1>
      {collectibles.length === 0 ? (
        <Text>You have no collectibles.</Text>
      ) : (
        <div className="ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collectibles.map((item) => (
            <Link
              href={`/collectibles/${item.collectible._id}`}
              key={item.collectible._id}
            >
              <a className="block shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center">
                  <div className="w-full h-80">
                    {item.collectible.glb ? (
                      <ModelViewer
                        src={item.collectible.glb}
                        alt={item.collectible.name}
                        autoRotate={true}
                        rotationPerSecond="60deg"
                        cameraControls={false}
                        style={{ width: '100%', height: '100%' }}
                      />
                    ) : (
                      <img
                        src={item.collectible.image}
                        alt={item.collectible.name}
                        className="h-80 w-full object-cover rounded-t-lg"
                      />
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <Text className="text-lg font-semibold">
                      {item.collectible.name}
                    </Text>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCollectiblesPage;
