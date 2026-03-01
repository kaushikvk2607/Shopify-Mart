import React from 'react';
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { Layout } from '../components'
import { StateContext } from '@/context/StateContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { initMixpanel, trackEvent } from '../lib/mixpanel';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    initMixpanel();
  }, []);

  // Track page views — wait for router to be ready so path is never empty
  useEffect(() => {
    if (router.isReady) {
      trackEvent('Page View', { path: router.asPath || window.location.pathname });
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      trackEvent('Page View', { path: url });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}
export default MyApp