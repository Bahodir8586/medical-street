export default function Results({ submit, conditions }) {
  console.log(conditions);
  return (
    <div className="flex flex-col">
      <div className="flex py-2 h-108">
        {conditions.map((el) => (
          <div key={el.data.id} className="w-full">
            <h3 className="text-xl font-semibold pl-6 mb-2">{el.data.common_name}</h3>
            <div className="flex capitalize">
              <div className="w-full px-3">
                <li className="capitalize">Prevalence: {el.prevalence.replaceAll('_', ' ')}</li>
                <li>
                  Categories:{' '}
                  {el.data.categories.map((cat, ind) => (
                    <span key={ind}>{cat}</span>
                  ))}
                </li>
                <li>Severity: {el.data.severity.replaceAll('_', ' ')}</li>
              </div>
              <div className="w-full px-3">
                <li>Acuteness: {el.data.acuteness}</li>
                <li>Triage level: {el.data.triage_level.replaceAll('_', ' ')}</li>
                <li>Recommended channel: {el.data.recommended_channel.replaceAll('_', ' ')}</li>
                <li>Hint: {el.data.extras?.hint}</li>
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
