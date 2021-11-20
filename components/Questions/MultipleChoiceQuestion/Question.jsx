export default function MultipleChoiceQuestion({ title, questions, onChange }) {
  return (
    <div className="flex flex-col items-center justify-center h-108">
      <h2 className="text-3xl font-semibold text-center mb-8">{title}</h2>
      <div className="flex flex-col justify-center items-center w-3/4 mx-auto">
        {questions.map((el) => (
          <div key={el.id} className="flex justify-between mb-4 border-b pb-2 w-full">
            <label className="mr-8">{el.name}</label>
            <div className="flex">
              {el.choices.map((opt) => (
                <div key={opt.id} className="mx-2">
                  <input type="radio" name={el.id} onChange={() => onChange(el.id, opt.id)} />
                  <label className="mx-1">{opt.label}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
