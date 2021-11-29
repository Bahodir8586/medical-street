import useTranslation from 'next-translate/useTranslation';
export default function Introduction({ submit }) {
  const { t, lang } = useTranslation('common');
  return (
    <div className="flex flex-col">
      <div className="flex py-2 h-108">
        <div className="w-full pl-4">
          <h3 className="font-medium text-2xl mb-4 md:mt-20 capitalize">{t('hello')}</h3>
          <p className="text-gray-700 text-sm mb-8">{t('intro text')}</p>
        </div>
        <div className="hidden md:block w-full"></div>
      </div>
      <div className="border-t flex justify-end items-center py-4">
        <button
          onClick={submit}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 capitalize"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
}
