import { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/outline';

export default function Slider({ title, onChange }) {
  const [sliderValue, setSliderValue] = useState(25);

  const subtract = () => {
    if (sliderValue === 18) {
      return;
    }
    setSliderValue(sliderValue - 1);
  };
  const add = () => {
    if (sliderValue === 130) {
      return;
    }
    setSliderValue(+sliderValue + 1);
  };
  useEffect(() => {
    onChange(sliderValue);
  }, [onChange, sliderValue]);
  return (
    <div className="flex flex-col items-center justify-center h-108">
      <h2 className="text-3xl font-semibold text-center mb-8">{title}</h2>
      <div className="w-3/4 mx-auto">
        <div className="text-2xl font-medium ml-12 mb-6">{sliderValue}</div>
        <div className="flex">
          <button
            onClick={subtract}
            className="p-4 bg-gray-50 rounded-full mr-2 border hover:bg-gray-100 cursor-pointer"
          >
            <MinusIcon className="w-6 h-6" />
          </button>
          <input
            className="w-full cursor-pointer"
            type="range"
            min={18}
            max={130}
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
          />
          <button
            onClick={add}
            className="p-4 bg-gray-50 rounded-full ml-2 border hover:bg-gray-100 cursor-pointer"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
