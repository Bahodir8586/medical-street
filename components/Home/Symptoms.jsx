import { useState } from 'react';

import BodyFrontMale from '@/components/Body/FrontBody/BodyMale';
import BodyFrontFemale from '@/components/Body/FrontBody/BodyFemale';
import BodyBackMale from '@/components/Body/BackBody/BodyMale';
import BodyBackFemale from '@/components/Body/BackBody/BodyFemale';
import PopupBody from '../Body/PopupBody';
import axios from '@/utils/axios';

export default function Symptoms({ sex, age, submit }) {
  const [showFront, setShowFront] = useState(true);
  const [organ, setOrgan] = useState(undefined);
  const [showPopup, setShowPopup] = useState(false);
  const [coorX, setCoorX] = useState(undefined);
  const [coorY, setCoorY] = useState(undefined);
  const [symptoms, setSymptoms] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timeOutId, setTimeOutId] = useState(undefined);

  const chooseBodyPart = (e, val) => {
    //   Triggered when body part is clicked
    setShowPopup(true);
    console.log(`Y: ${e.pageY}`, `X: ${e.pageX}`);
    if (screen.width > 640) {
      setCoorX(+e.pageX + 40);
      setCoorY(+e.pageY - 140);
    } else {
      setCoorX(40);
      setCoorY(+e.pageY + 40);
    }
    setOrgan(val);
  };
  const onSelectSymptom = (symptom) => {
    if (!symptom) {
      setShowPopup(false);
      setSearchValue('');
      setShowResults(false);
      return;
    }
    const alreadyExist = Boolean(symptoms.find((el) => el.id === symptom.id));
    if (alreadyExist) {
      return;
    }
    setSearchValue('');
    setShowResults(false);
    setShowPopup(false);
    setSymptoms([...symptoms, symptom]);
  };
  const removeSymptom = (symptomId) => {
    const symptom = symptoms.find((el) => el.id === symptomId);
    if (!symptom) {
      return;
    }
    const index = symptoms.indexOf(symptom);
    const newSymptoms = [...symptoms];
    newSymptoms.splice(index, 1);
    setSymptoms(newSymptoms);
  };

  const search = async () => {
    console.log('running');
    try {
      const response = await axios.get(
        `/search?phrase=${searchValue}&age.value=${age}&sex=${sex}&max_results=25&types=symptom`
      );
      setSearchResults(response.data);
      setShowResults(true);
    } catch (e) {
      console.log(e);
    }
  };
  const submitSymptoms = () => {
    if (symptoms.length === 0) {
      return;
    }
    const submittedSymptoms = symptoms.map((el) => {
      return { id: el.id, choice_id: 'present', source: 'initial' };
    });
    submit(submittedSymptoms);
  };

  return (
    <div className="flex flex-col">
      {showPopup && (
        <PopupBody sex={sex} coorX={coorX} coorY={coorY} organ={organ} onSelect={onSelectSymptom} />
      )}
      <div className="flex flex-col md:flex-row py-0 md:py-8 min-h-108">
        <div className="w-full pl-4">
          {/* TODO: Title input and badges of symptoms */}
          <h3 className="font-medium text-2xl mb-2">Add Symptoms</h3>
          <p className="text-gray-700 text-sm">
            Please use the search or click on the body. Add as many symptoms as you can for the most
            accurate results.
          </p>
          <div className="mt-4 relative">
            <input
              type="text"
              name="text"
              value={searchValue}
              onChange={(e) => {
                clearTimeout(timeOutId);
                const funcId = setTimeout(() => {
                  search();
                }, 2000);
                setSearchValue(e.target.value);
                setTimeOutId(funcId);
              }}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Search, e.g. headache"
            />
            {showResults && (
              <div className="w-full h-56 bg-gray-100 absolute top-10 overflow-auto">
                {searchResults.map((el) => (
                  <li
                    onClick={() => onSelectSymptom(el)}
                    key={el.id}
                    className="list-none px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {el.label}
                  </li>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 h-48 w-full bg-gray-200 rounded overflow-auto">
            {symptoms.length === 0 ? (
              <p className="mx-auto py-20 text-center">Please try to add more symptoms</p>
            ) : (
              <div className="py-2 px-1">
                {symptoms.map((el) => (
                  <span
                    key={el.id}
                    className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-blue-500 text-white mx-1 mb-1"
                  >
                    {el.label}
                    <button
                      onClick={() => removeSymptom(el.id)}
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
        <div className="w-full flex flex-col justify-center items-center my-4 md:my-0">
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
          onClick={() => submitSymptoms()}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
