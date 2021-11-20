import { XIcon } from '@heroicons/react/outline';
import { symptoms } from './symptoms';

export default function PopupBody({ sex, coorX, coorY, organ, onSelect }) {
  const listOfSymptoms = symptoms[organ];
  return (
    <div
      style={{ position: 'absolute', top: coorY, left: coorX }}
      className="w-72 h-56 border  bg-white rounded"
    >
      <div className="h-12 flex justify-between items-center px-3 text-lg font-semibold py-3 bg-gray-50 capitalize">
        {organ.replace('_', ' ')}
        <XIcon className="w-4 h-4 cursor-pointer" onClick={() => onSelect(null)} />
      </div>
      <div className="h-44 overflow-auto">
        <div>
          {listOfSymptoms?.map((el) => (
            <li
              onClick={() => onSelect(el)}
              className="px-3 py-1 cursor-pointer mb-2 hover:bg-gray-200 list-none"
              key={el.id}
            >
              {el.label}
            </li>
          ))}
        </div>
        <div className="rounded-lg text-sm bg-blue-100 text-blue-700 px-3 py-2 m-3">
          Can&apos;t find your symptom? Please try to use the search box
        </div>
      </div>
    </div>
  );
}
