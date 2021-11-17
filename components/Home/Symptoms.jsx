import { useState } from 'react';

import BodyFrontMale from '@/components/Body/FrontBody/BodyMale';
import BodyFrontFemale from '@/components/Body/FrontBody/BodyFeMale';
import BodyBackMale from '@/components/Body/BackBody/BodyMale';
import BodyBackFemale from '@/components/Body/BackBody/BodyFeMale';

export default function Symptoms({ sex }) {
  const [showFront, setShowFront] = useState(true);
  const [symptoms, setSymptoms] = useState([]);
  return (
    <>
      {sex === 'female' && showFront && <BodyFrontFemale />}
      {sex === 'female' && !showFront && <BodyBackFemale />}
      {sex === 'male' && showFront && <BodyFrontMale />}
      {sex === 'male' && showFront && <BodyBackMale />}
      <button onClick={() => setShowFront(!showFront)}>Rotate model</button>
    </>
  );
}
