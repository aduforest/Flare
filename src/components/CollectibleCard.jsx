// components/CollectibleCard.jsx
import { Text } from '@/components/Text';
import styles from './CollectibleCard.module.css';

const CollectibleCard = ({ collectible }) => (
  <div className={styles.card}>
    <img
      src={collectible.image}
      alt={collectible.name}
      className={styles.image}
    />
    <Text variant="h4">{collectible.name}</Text>
    <Text>{collectible.description}</Text>
  </div>
);

export default CollectibleCard;
