export default function MultipleChoiceQuestion({ title, questions, onChange }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-108">
      <h2 className="text-2xl font-semibold text-center mb-8">{title}</h2>
      <div className="flex flex-col justify-center items-center w-full md:w-10/12 mx-auto">
        {questions.map((el) => (
          <div
            key={el.id}
            className="flex flex-wrap justify-between mb-4 border-b pb-2 w-full items-center"
          >
            <label className="pr-8 w-96">{el.name}</label>
            <div className="flex w-64">
              {el.choices.map((opt) => (
                <div key={opt.id} className="mx-2 mt-2 md:mt-0 ">
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
