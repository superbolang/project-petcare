import { LandingPage } from '@/components/LandingPage';
import { Navbar } from '@/components/Navbar';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function Home() {
  return (
    <>
      <Navbar />
      <LandingPage config={serverRuntimeConfig} />
    </>
  );
}
