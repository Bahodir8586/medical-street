import Head from 'next/head';
import { useState, useEffect } from 'react';

import Interview from '@/components/Home/Interview';
import Introduction from '@/components/Home/Introduction';
import Patient from '@/components/Home/Patient';
import Results from '@/components/Home/Results';
import Symptoms from '@/components/Home/Symptoms';
import TermsOfService from '@/components/Home/TermsOfService';
import Layout from '@/components/Layouts/HomeLayout';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showPatient, setShowPatient] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [sex, setSex] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [patientQuestions, setPatientQuestions] = useState([]);

  const submitIntro = () => {
    setShowIntro(false);
    setShowTerms(true);
  };
  const submitTerms = () => {
    setShowTerms(false);
    setShowPatient(true);
  };
  const submitPatient = (sex, age, questions) => {
    console.log(questions);
    setSex(sex);
    setAge(age);
    setPatientQuestions(questions);
    setShowPatient(false);
    setShowSymptoms(true);
  };
  const submitSymptoms = () => {
    setShowSymptoms(false);
    setShowInterview(true);
  };
  const submitInterview = () => {
    setShowInterview(false);
    setShowResults(true);
  };
  const submitResults = () => {
    setShowResults(false);
    setShowIntro(true);
  };

  return (
    <div>
      <Head>
        <title>Medical Street</title>
        <meta name="description" content="Medical Street application" />
      </Head>
      <div>
        <Layout activeEl={0}>
          {showIntro && <Introduction submit={submitIntro} />}
          {showTerms && <TermsOfService submit={submitTerms} />}
          {showPatient && <Patient submit={submitPatient} />}
          {showSymptoms && <Symptoms sex={sex} submit={submitSymptoms} />}
          {showInterview && <Interview submit={submitInterview} />}
          {showResults && <Results submit={submitResults} />}
        </Layout>
      </div>
    </div>
  );
}
