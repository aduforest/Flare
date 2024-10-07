// page-components/Index/Hero.jsx

import { ButtonLink } from '../../components/Button';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ModelViewer with SSR disabled
const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
});

const Hero = () => {
  useEffect(() => {
    let gsap;
    let ScrollTrigger;

    // Dynamically import gsap and ScrollTrigger on the client-side
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
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: `.${styles.parallax}`,
          start: 'top top',
          end: 'bottom top',
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
    })();
  }, []);

  return (
    <Wrapper className={styles.heroWrapper}>
      <div className={styles.heroBackground}>
        {/* Background remains black */}
      </div>
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

      {/* Updated Gallery Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle} role="img" aria-label="Fire">
          🔥
        </h2>
        <div className={styles.gallery}>
          {/* GLB Models */}
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
          <div className={styles.galleryItem}>
            <ModelViewer
              src="/collectibles/lebron.glb"
              alt="LeBron"
              autoRotate={true}
              autoRotateDelay="3000"
              rotationPerSecond="60deg"
              cameraControls={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Hero;
