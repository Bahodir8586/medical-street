import { useState } from 'react';
export default function SelectQuestion({ title, choices, onChange }) {
  const [selectedValue, setSelectedValue] = useState(undefined);
  return (
    <div className="flex flex-col items-center justify-center h-108">
      <h2 className="text-3xl font-semibold text-center mb-4">{title}</h2>
      <div className="text-xl font-medium text-center mb-4">{selectedValue}</div>
      <div className="flex justify-center items-center">
        {choices?.map((el) => (
          <div
            key={el.id}
            onClick={() => {
              setSelectedValue(el.label);
              onChange(el.id);
            }}
            className="mx-3 rounded-md border shadow-md bg-gray-50 w-36 h-36 flex justify-center items-center cursor-pointer text-lg hover:bg-gray-100 capitalize"
          >
            {el.label}
          </div>
        ))}
      </div>
    </div>
  );
}
