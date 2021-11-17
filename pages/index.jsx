import Symptoms from '@/components/Home/Symptoms';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Medical Street</title>
        <meta name="description" content="Medical Street application" />
      </Head>
      <div>
        <Symptoms sex={'female'} />
      </div>
    </div>
  );
}
