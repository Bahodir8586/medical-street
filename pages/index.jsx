import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import Interview from '@/components/Home/Interview';
import Introduction from '@/components/Home/Introduction';
import Patient from '@/components/Home/Patient';
import Results from '@/components/Home/Results';
import Symptoms from '@/components/Home/Symptoms';
import TermsOfService from '@/components/Home/TermsOfService';
import Layout from '@/components/Layouts/HomeLayout';
import axios from '@/utils/axios';

export default function Home() {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  const locale = useMemo(() => router.locale, [router.locale]);
  const [showIntro, setShowIntro] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showPatient, setShowPatient] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendedSpecialist, setRecommendedSpecialist] = useState(undefined);
  const [activeSidebar, setActiveSidebar] = useState(0);

  useEffect(() => {
    if (showIntro || showTerms) {
      setActiveSidebar(0);
    } else if (showPatient) {
      setActiveSidebar(1);
    } else if (showSymptoms) {
      setActiveSidebar(2);
    } else if (showInterview) {
      setActiveSidebar(3);
    } else if (showResults) {
      setActiveSidebar(4);
    }
  }, [showIntro, showTerms, showPatient, showSymptoms, showInterview, showResults]);

  const [sex, setSex] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [patientQuestions, setPatientQuestions] = useState([
    {
      id: 'p_236',
      choice_id: 'present',
      source: 'initial',
    },
  ]);
  const [symptoms, setSymptoms] = useState([]);
  const [initialInterview, setInitialInterview] = useState({});
  const [conditions, setConditions] = useState([
    {
      id: 'c_15',
      name: 'Celiac disease',
      common_name: 'Celiac disease',
      sex_filter: 'both',
      categories: ['Gastroenterology'],
      prevalence: 'very_rare',
      acuteness: 'chronic_with_exacerbations',
      severity: 'moderate',
      extras: {
        icd10_code: 'K90.0',
        hint: 'Please consult a gastroenterologist.',
      },
      triage_level: 'consultation',
      recommended_channel: 'personal_visit',
    },
  ]);

  const submitIntro = () => {
    setShowIntro(false);
    setShowTerms(true);
  };
  const submitTerms = () => {
    setShowTerms(false);
    setShowPatient(true);
  };
  const submitPatient = (sex, age, questions) => {
    setSex(sex);
    setAge(age);
    setPatientQuestions([...patientQuestions, ...questions]);
    setShowPatient(false);
    setShowSymptoms(true);
  };
  const submitSymptoms = (symptoms) => {
    setShowSymptoms(false);
    setShowInterview(true);
    setSymptoms(symptoms);
    setInitialInterview({
      sex: sex,
      age: {
        value: age,
      },
      evidence: [...patientQuestions, ...symptoms],
    });
  };
  const submitInterview = async (cons, symps) => {
    const recSpec = await axios.post(`/recommend_specialist`, symps, {
      headers: { Model: `infermedica-${locale}` },
    });
    const newCons = await Promise.all(
      cons.map(async (el) => {
        return await axios.get(`/conditions/${el.id}?age.value=${age}`, {
          headers: { Model: `infermedica-${locale}` },
        });
      })
    );
    const actualCons = newCons.map((el, index) => {
      return { ...el.data, probability: cons[index].probability };
    });
    setRecommendedSpecialist(recSpec.data);
    setConditions(actualCons);
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
        <Layout activeEl={activeSidebar}>
          {showIntro && <Introduction submit={submitIntro} />}
          {showTerms && <TermsOfService submit={submitTerms} />}
          {showPatient && <Patient submit={submitPatient} />}
          {showSymptoms && <Symptoms sex={sex} age={age} submit={submitSymptoms} />}
          {showInterview && (
            <Interview submit={submitInterview} initialInterview={initialInterview} />
          )}
          {showResults && (
            <Results
              submit={submitResults}
              recommendedSpecialist={recommendedSpecialist}
              conditions={conditions}
            />
          )}
        </Layout>
      </div>
    </div>
  );
}
