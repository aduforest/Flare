import Head from 'next/head';
import Footer from './Footer';
import styles from './Layout.module.css';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Universal Collectibles App</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Universal Collectibles (in dev)"
        />
        <meta property="og:title" content="Universal Collectibles App" />
        <meta
          property="og:description"
          content="In development"
        />
        <meta
          property="og:image"
          content="/images/main.jpg"
        />
      </Head>
      <Nav />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
