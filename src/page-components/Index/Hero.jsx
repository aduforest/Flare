// page-components/Index/Hero.jsx

import { ButtonLink } from '../../components/Button';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
});

const Fireworks = dynamic(() => import('../../components/Fireworks'), {
  ssr: false,
});

const Hero = () => {
  const [triggerFireworks, setTriggerFireworks] = useState(false);

  useEffect(() => {
    let gsap;
    let ScrollTrigger;

    (async () => {
      const module = await import('gsap');
      gsap = module.gsap || module.default;
      const plugin = await import('gsap/ScrollTrigger');
      ScrollTrigger = plugin.ScrollTrigger || plugin.default;

      gsap.registerPlugin(ScrollTrigger);

      // Animate the title and buttons on mount
      gsap.fromTo(
        `.${styles.title}`,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
      );
      gsap.fromTo(
        `.${styles.buttons}`,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.5,
          ease: 'power4.out',
        }
      );

      // Parallax effect for the title
      gsap.to(`.${styles.parallax}`, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: `.${styles.parallax}`,
          start: 'top top',
          end: '+=300',
          scrub: true,
        },
      });

      // Animate sections on scroll
      gsap.utils.toArray(`.${styles.section}`).forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: false,
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Trigger fireworks when the user scrolls down to the cannons section
      ScrollTrigger.create({
        trigger: `.${styles.cannonsSection}`,
        start: 'top center',
        onEnter: () => setTriggerFireworks(true),
        onLeaveBack: () => setTriggerFireworks(false),
      });
    })();
  }, []);

  return (
    <Wrapper className={styles.heroWrapper}>
      <div className={styles.heroBackground}></div>
      <h1 className={`${styles.title} ${styles.parallax}`}>
        <span className={styles.nextjs}>Flare</span>
        <span className={styles.mongodb}>Collectibles</span>
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

      {/* Gallery Section */}
      <section className={styles.section}>
        <div className={styles.gallery}>
          <div className={styles.galleryItem}>
            <ModelViewer
              src="/collectibles/cacti.glb"
              alt="Cacti"
              autoRotate={true}
              autoRotateDelay="3000"
              rotationPerSecond="60deg"
              cameraControls={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className={styles.galleryItem}>
            <ModelViewer
              src="/collectibles/marchand.glb"
              alt="Marchand"
              autoRotate={true}
              autoRotateDelay="3000"
              rotationPerSecond="60deg"
              cameraControls={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* Future Collaborations Section */}
      <section className={`${styles.section} ${styles.collaborationSection}`}>
        <h2 className={styles.sectionTitle}>
          Future Collaborations
          <span role="img" aria-label="Microphone">
            🎤
          </span>
        </h2>
        <p className={styles.sectionContent}>
          Stay tuned for exciting collaborations with top artists and sports
          leagues. We're bringing you exclusive collectibles and experiences you
          won't want to miss!
        </p>
      </section>

      {/* Fireworks and Cannons Section */}
      <section className={`${styles.section} ${styles.cannonsSection}`}>
        <h2 className={styles.sectionTitle}>
          🎇 Cannons Ready 🎇
        </h2>
        <div className={styles.cannons}>
          <span role="img" aria-label="Cannon" className={styles.cannonEmoji}>
            🧨
          </span>
          <span role="img" aria-label="Cannon" className={styles.cannonEmoji}>
            🧨
          </span>
        </div>

        {/* Fireworks Triggered on Scroll */}
        <div className={styles.fireworksContainer}>
          <Fireworks triggerFireworks={triggerFireworks} />
        </div>
      </section>
    </Wrapper>
  );
};

export default Hero;
