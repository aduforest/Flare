import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import { Wrapper } from '../../components/Layout';
import { Text } from '../../components/Text';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCurrentUser } from '@/lib/user';

// Dynamically import ModelViewer with SSR disabled
const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
});

const UserCollectibles = ({ user }) => {
  const [collectibles, setCollectibles] = useState(null);
  const { data: currentUserData } = useCurrentUser();

  useEffect(() => {
    if (user) {
      fetcher(`/api/collectibles/user?userId=${user._id}`).then((data) => {
        setCollectibles(data.collectibles);
      });
    }
  }, [user]);

  if (!collectibles) {
    return (
      <Wrapper>
        <Text>Loading...</Text>
      </Wrapper>
    );
  }

  const isCurrentUser = currentUserData?.user?.username === user?.username;

  return (
    <div>
      {isCurrentUser ? (
        <h1 className="text-2xl font-bold mb-6 ml-6">Your flares</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-6 ml-6">{user.username}'s flares</h1>
      )}
      
      {collectibles.length === 0 ? (
        <div className="ml-6">
          {isCurrentUser ? (
            <Text>You have no flares.</Text>
          ) : (
            <Text>{user.username} has no flares.</Text>
          )}
        </div>
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
                        autoRotateDelay = "3000"
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

export default UserCollectibles;
