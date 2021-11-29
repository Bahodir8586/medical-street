import useTranslation from 'next-translate/useTranslation';
export default function Results({ submit, conditions, recommendedSpecialist }) {
  const { t, lang } = useTranslation('common');
  console.log(conditions);
  return (
    <div className="flex flex-col">
      {conditions?.length === 0 || !conditions ? (
        <div className="flex flex-col items-center justify-center h-108 capitalize">
          {t('loading')}...
        </div>
      ) : (
        <div className="flex py-2 flex-col mb-8">
          <div className="mb-3 flex flex-col md:flex-row md:items-center">
            {t('Recommended specialist')}:{' '}
            <span className="ml-2 font-medium text-xl capitalize">
              {recommendedSpecialist.recommended_specialist.name}
            </span>
          </div>
          <div className="mb-3 flex flex-col md:flex-row md:items-center">
            {t('Recommended visit type')}:{' '}
            <span className="ml-2 font-medium text-xl capitalize">
              {recommendedSpecialist.recommended_channel?.replaceAll('_', ' ')}
            </span>
          </div>
          {conditions.map((el, index) => (
            <div key={el.id} className="w-full mb-4">
              <div className="flex flex-col md:flex-row">
                <h3 className="text-lg md:text-xl font-semibold md:pl-6 mb-2 w-full">
                  {index + 1} {el.common_name}
                </h3>
                <div className="w-full flex items-center justify-start">
                  <div className="relative w-20 md:w-40 h-4 bg-gray-200 rounded">
                    <div
                      className="absolute top-0 h-4 left-0 bg-blue-500 rounded"
                      style={{ width: `${100 * el.probability}%` }}
                    ></div>
                  </div>
                  <span className="ml-4">
                    {t('Probability')}: {(el.probability * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex capitalize flex-col md:flex-row">
                <div className="w-full px-3">
                  <li className="capitalize">
                    {t('Prevalence')}: {el.prevalence.replaceAll('_', ' ')}
                  </li>
                  <li>
                    {t('Categories')}:{' '}
                    {el.categories.map((cat, ind) => (
                      <span key={ind}>{cat}</span>
                    ))}
                  </li>
                  <li>
                    {t('Severity')}: {el.severity.replaceAll('_', ' ')}
                  </li>
                  <li>
                    {t('Acuteness')}: {el.acuteness.replaceAll('_', ' ')}
                  </li>
                </div>
                <div className="w-full px-3">
                  <li>
                    {t('Triage level')}: {el.triage_level.replaceAll('_', ' ')}
                  </li>
                  <li>
                    {t('Recommended channel')}: {el.recommended_channel.replaceAll('_', ' ')}
                  </li>
                  <li>
                    {t('Hint')}: {el.extras?.hint}
                  </li>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t flex justify-end items-center pt-4">
        <button
          onClick={submit}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 capitalize"
        >
          {t('finish')}
        </button>
      </div>
    </div>
  );
}
