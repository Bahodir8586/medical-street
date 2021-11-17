import { useState } from 'react';

import BodyFrontMale from '@/components/Body/FrontBody/BodyMale';
import BodyFrontFemale from '@/components/Body/FrontBody/BodyFeMale';
import BodyBackMale from '@/components/Body/BackBody/BodyMale';
import BodyBackFemale from '@/components/Body/BackBody/BodyFeMale';

export default function Symptoms({ sex }) {
  const [showFront, setShowFront] = useState(true);
  const [symptoms, setSymptoms] = useState([]);

  const chooseBodyPart = (val) => {
    //   Triggered when body part is clicked
    //   TODO: handle to show symptoms related to that part
    console.log(val);
  };
  return (
    <>
      {sex === 'female' && showFront && <BodyFrontFemale onClick={(val) => chooseBodyPart(val)} />}
      {sex === 'female' && !showFront && <BodyBackFemale onClick={(val) => chooseBodyPart(val)} />}
      {sex === 'male' && showFront && <BodyFrontMale onClick={(val) => chooseBodyPart(val)} />}
      {sex === 'male' && showFront && <BodyBackMale onClick={(val) => chooseBodyPart(val)} />}
      <button onClick={() => setShowFront(!showFront)}>Rotate model</button>
    </>
  );
}
