import styles from './User.module.css';
import UserHeader from './UserHeader';
import UserCollectibles from './UserCollectibles';

export const User = ({ user }) => {
  return (
    <div className={styles.root}>
      <UserHeader user={user} />
      <UserCollectibles user={user} />
    </div>
  );
};
