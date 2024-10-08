// src/pages/_app.jsx
import '@/assets/base.css';
import '../../styles/globals.css';
import { Layout } from '../components/Layout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </ThemeProvider>
  );
}
