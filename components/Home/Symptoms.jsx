import { useState } from 'react';

import BodyFrontMale from '@/components/Body/FrontBody/BodyMale';
import BodyFrontFemale from '@/components/Body/FrontBody/BodyFeMale';
import BodyBackMale from '@/components/Body/BackBody/BodyMale';
import BodyBackFemale from '@/components/Body/BackBody/BodyFeMale';
import PopupBody from '../Body/PopupBody';

export default function Symptoms({ sex, submit }) {
  const [showFront, setShowFront] = useState(true);
  const [organ, setOrgan] = useState(undefined);
  const [showPopup, setShowPopup] = useState(false);
  const [coorX, setCoorX] = useState(undefined);
  const [coorY, setCoorY] = useState(undefined);
  const [symptoms, setSymptoms] = useState([]);

  const chooseBodyPart = (e, val) => {
    //   Triggered when body part is clicked
    setShowPopup(true);
    setCoorX(+e.clientX + 40);
    setCoorY(+e.clientY - 20);
    setOrgan(val);
  };
  const onSelectSymptom = (symptom) => {
    setShowPopup(false);
    if (symptoms.indexOf(symptom) !== -1 || !symptom) {
      return;
    }
    setSymptoms([...symptoms, symptom]);
  };
  const removeSymptom = (symptom) => {
    const index = symptoms.indexOf(symptom);
    if (index > -1) {
      setSymptoms([...symptoms.splice(index, 1)]);
    }
  };
  
  return (
    <div className="flex flex-col">
      {showPopup && (
        <PopupBody coorX={coorX} coorY={coorY} organ={organ} onSelect={onSelectSymptom} />
      )}
      <div className="flex py-8 h-108">
        <div className="w-full pl-4">
          {/* TODO: Title input and badges of symptoms */}
          <h3 className="font-medium text-2xl mb-2">Add Symptoms</h3>
          <p className="text-gray-700 text-sm">
            Please use the search or click on the body. Add as many symptoms as you can for the most
            accurate results.
          </p>
          <div className="mt-4">
            <input
              type="text"
              name="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Search, e.g. headache"
            />
          </div>
          <div className="mt-4 h-48 w-full bg-gray-200 rounded overflow-auto">
            {symptoms.length === 0 ? (
              <p className="mx-auto py-20 text-center">Please try to add more symptoms</p>
            ) : (
              <div className="py-2 px-1">
                {symptoms.map((el, index) => (
                  <span
                    key={index}
                    className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-blue-500 text-white mx-1"
                  >
                    {el}
                    <button
                      onClick={() => removeSymptom(el)}
                      type="button"
                      className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-700 hover:bg-blue-600 hover:text-white focus:outline-none focus:bg-blue-300 focus:text-white"
                    >
                      <span className="sr-only">Remove large option</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          {sex === 'female' && showFront && (
            <BodyFrontFemale onClick={(e, val) => chooseBodyPart(e, val)} />
          )}
          {sex === 'female' && !showFront && (
            <BodyBackFemale onClick={(e, val) => chooseBodyPart(e, val)} />
          )}
          {sex === 'male' && showFront && (
            <BodyFrontMale onClick={(e, val) => chooseBodyPart(e, val)} />
          )}
          {sex === 'male' && !showFront && (
            <BodyBackMale onClick={(e, val) => chooseBodyPart(e, val)} />
          )}
          <div className="mt-4">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowFront(!showFront)}
            >
              Rotate model
            </button>
          </div>
        </div>
      </div>
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
