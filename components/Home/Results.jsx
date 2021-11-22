export default function Results({ submit, conditions }) {
  console.log(conditions[0]);
  return (
    <div className="flex flex-col">
      <div className="flex py-2 h-108">
        {conditions.map((el) => (
          <div key={el.id} className="w-full">
            <h3 className="text-xl font-semibold pl-6 mb-2">{el.common_name}</h3>
            <div className="flex capitalize">
              <div className="w-full px-3">
                <li className="capitalize">Prevalence: {el.prevalence.replaceAll('_', ' ')}</li>
                <li>
                  Categories:{' '}
                  {el.categories.map((cat, ind) => (
                    <span key={ind}>{cat}</span>
                  ))}
                </li>
                <li>Severity: {el.severity.replaceAll('_', ' ')}</li>
              </div>
              <div className="w-full px-3">
                <li>Acuteness: {el.acuteness}</li>
                <li>Triage level: {el.triage_level.replaceAll('_', ' ')}</li>
                <li>Recommended channel: {el.recommended_channel.replaceAll('_', ' ')}</li>
                <li>Hint: {el.extras?.hint}</li>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t flex justify-end items-center py-4">
        <button
          onClick={submit}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
