// pages/admin/dashboard.js
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import { Wrapper } from '../../components/Layout';
import { Text } from '../../components/Text';

const AdminDashboard = () => {
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    fetcher('/api/admin/collectibles').then((data) => {
      setCollectibles(data.collectibles);
    });
  }, []);

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">All Collectibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collectibles.map((collectible) => (
            <div key={collectible._id} className="p-4 shadow rounded-lg">
              <img
                src={collectible.image}
                alt={collectible.name}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <Text className="text-lg font-semibold">{collectible.name}</Text>
              <Text className="text-sm">Owned by: {collectible.owner.name}</Text>
              <Text className="text-sm">Description: {collectible.description}</Text>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
