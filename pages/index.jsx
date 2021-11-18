import Interview from '@/components/Home/Interview';
import Introduction from '@/components/Home/Introduction';
import Patient from '@/components/Home/Patient';
import Results from '@/components/Home/Results';
import Symptoms from '@/components/Home/Symptoms';
import TermsOfService from '@/components/Home/TermsOfService';
import Layout from '@/components/Layouts/HomeLayout';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Medical Street</title>
        <meta name="description" content="Medical Street application" />
      </Head>
      <div>
        <Layout activeEl={2}>
          {/* <Introduction /> */}
          {/* <TermsOfService /> */}
          <Patient />
          {/* <Symptoms sex={'male'} /> */}
          <Interview />
          <Results />
        </Layout>
      </div>
    </div>
  );
}
