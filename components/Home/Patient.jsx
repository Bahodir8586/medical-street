import SelectQuestion from '@/components/Questions/SelectQuestion';
import MultipleChoiceQuestion from '@/components/Questions/MultipleChoiceQuestion';
import Slider from '@/components/Questions/Slider';

const questions = [
  {
    id: 1,
    label: "I'm overweight or obese",
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
    id: 1,
    label: 'I have high cholesterol',
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
];

export default function Patient() {
  return (
    <div className="flex flex-col">
      {/* <SelectQuestion
        title="What is your sex?"
        options={[
          { id: 'female', label: 'Female' },
          { id: 'male', label: 'Male' },
        ]}
      /> */}
      {/* <Slider title="How old are you?" /> */}
      <MultipleChoiceQuestion
        questions={questions}
        title="Please check all the statements below that apply to you."
      />
      <div className="border-t flex justify-end items-center py-4">
        <button className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Next
        </button>
      </div>
    </div>
  );
}
