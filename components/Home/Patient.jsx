import { useState } from 'react';
import SelectQuestion from '@/components/Questions/SelectQuestion';
import MultipleChoiceQuestion from '@/components/Questions/MultipleChoiceQuestion';
import Slider from '@/components/Questions/Slider';

export default function Patient() {
  const [sex, setSex] = useState(undefined);
  const [age, setAge] = useState(25);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      label: "I'm overweight or obese",
      value: '',
      options: [
        {
          id: 'present',
          label: 'Yes',
        },
        {
          id: 'absent',
          label: 'No',
        },
        {
          id: 'unknown',
          label: "Don't know",
        },
      ],
    },
    {
      id: 2,
      label: 'I smoke cigarettes',
      value: '',
      options: [
        {
          id: 'present',
          label: 'Yes',
        },
        {
          id: 'absent',
          label: 'No',
        },
        {
          id: 'unknown',
          label: "Don't know",
        },
      ],
    },
    {
      id: 3,
      label: 'I’ve recently suffered an injury',
      value: '',
      options: [
        {
          id: 'present',
          label: 'Yes',
        },
        {
          id: 'absent',
          label: 'No',
        },
        {
          id: 'unknown',
          label: "Don't know",
        },
      ],
    },
    {
      id: 4,
      label: 'I have high cholesterol',
      value: '',
      options: [
        {
          id: 'present',
          label: 'Yes',
        },
        {
          id: 'absent',
          label: 'No',
        },
        {
          id: 'unknown',
          label: "Don't know",
        },
      ],
    },
    {
      id: 5,
      label: 'I have hypertension',
      value: '',
      options: [
        {
          id: 'present',
          label: 'Yes',
        },
        {
          id: 'absent',
          label: 'No',
        },
        {
          id: 'unknown',
          label: "Don't know",
        },
      ],
    },
  ]);

  const [showSex, setShowSex] = useState(true);
  const [showAge, setShowAge] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const submit = () => {
    if (showSex) {
      if (!sex) {
        return;
      }
      setShowSex(false);
      setShowAge(true);
      return;
    }
    if (showAge) {
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
    // TODO: submit for the index
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
          options={[
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
          onClick={submit}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
