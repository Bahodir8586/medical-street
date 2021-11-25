import useTranslation from 'next-translate/useTranslation';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import SelectQuestion from '@/components/Questions/SelectQuestion';
import MultipleChoiceQuestion from '@/components/Questions/MultipleChoiceQuestion';
import Slider from '@/components/Questions/Slider';
import axios from '@/utils/axios';

export default function Patient({ submit }) {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  const locale = useMemo(() => router.locale, [router.locale]);
  const [sex, setSex] = useState(undefined);
  const [age, setAge] = useState(25);
  const [questions, setQuestions] = useState([]);

  const [showSex, setShowSex] = useState(true);
  const [showAge, setShowAge] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const submitPatient = async () => {
    if (showSex) {
      if (!sex) {
        return;
      }
      setShowSex(false);
      setShowAge(true);
      return;
    }
    if (showAge) {
      const response = await axios.post(
        '/suggest',
        {
          sex,
          age: { value: age },
          suggest_method: 'risk_factors',
        },
        {
          headers: { Model: `infermedica-${locale}` },
        }
      );
      console.log(response.data);
      const newQuestions = response.data.map((el) => {
        return {
          id: el.id,
          name: el.common_name,
          value: '',
          choices: [
            {
              id: 'present',
              label: t('yes'),
            },
            {
              id: 'absent',
              label: t('no'),
            },
            {
              id: 'unknown',
              label: t("don't know"),
            },
          ],
        };
      });
      console.log(newQuestions);
      setQuestions(newQuestions);
      setShowAge(false);
      setShowQuestions(true);
      return;
    }
    let val = true;
    questions.forEach((element) => {
      val = val * Boolean(element.value);
    });
    if (!val) {
      return;
    }
    console.log(`sex: ${sex}`);
    console.log(`age: ${age}`);
    console.log(questions);
    const submitQuestions = questions.map((el) => {
      return { id: el.id, choice_id: el.value };
    });
    submit(sex, age, submitQuestions);
  };

  const multiSelectHandler = (questionId, answerId) => {
    const newQuestions = [...questions];
    const q = newQuestions.find((el) => el.id === questionId);
    q.value = answerId;
    setQuestions(newQuestions);
  };
  return (
    <div className="flex flex-col">
      {showSex && (
        <SelectQuestion
          title="What is your sex?"
          onChange={(val) => {
            setSex(val);
          }}
          choices={[
            { id: 'female', label: 'Female' },
            { id: 'male', label: 'Male' },
          ]}
        />
      )}
      {showAge && <Slider title="How old are you?" onChange={(val) => setAge(val)} />}
      {showQuestions && (
        <MultipleChoiceQuestion
          questions={questions}
          onChange={(questionId, answerId) => multiSelectHandler(questionId, answerId)}
          title="Please check all the statements below that apply to you."
        />
      )}
      <div className="border-t flex justify-end items-center py-4">
        <button
          onClick={submitPatient}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 capitalize"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
}
