export default function SelectQuestion({ title, options }) {
  console.log(title, options);
  return (
    <div className="flex flex-col items-center justify-center h-108">
      <h2 className="text-3xl font-semibold text-center mb-8">{title}</h2>
      <div className="flex justify-center items-center">
        {options.map((el) => (
          <div
            key={el.id}
            className="mx-3 rounded-md border shadow-md bg-gray-50 w-36 h-36 flex justify-center items-center cursor-pointer text-lg hover:bg-gray-100"
          >
            {el.label}
          </div>
        ))}
      </div>
    </div>
  );
}
