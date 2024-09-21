import { ButtonLink } from '../../components/Button';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper>
      <h1 className={styles.title}>
        <span className={styles.nextjs}>Universal</span>
        <span className={styles.mongodb}>Collectibles</span>
        <span>App</span>
      </h1>
      <Container justifyContent="center" className={styles.buttons}>
        <Container>
          <Link passHref href="/redeem">
            <ButtonLink className={styles.button}>Redeem Flare</ButtonLink>
          </Link>
        </Container>
        <Spacer axis="horizontal" size={1} />
        <Container>
          <Link passHref href="/collectibles">
            <ButtonLink className={styles.button}>View Your Flares</ButtonLink>
          </Link>
        </Container>
      </Container>
      <p className={styles.subtitle}>Digital Sports Collectibles Reimagined</p>
    </Wrapper>
  );
};

export default Hero;
