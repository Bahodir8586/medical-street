import { symptoms } from './symptoms';

export default function PopupBody({ coorX, coorY, organ }) {
  const listOfSymptoms = symptoms[organ];
  console.log(listOfSymptoms);
  return (
    <div
      style={{ position: 'absolute', top: coorY, left: coorX }}
      className="w-40 h-40 bg-green border"
    >
      {listOfSymptoms?.map((el, index) => (
        <li key={index}>{el}</li>
      ))}
    </div>
  );
}
