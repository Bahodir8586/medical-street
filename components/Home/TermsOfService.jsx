import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import Link from 'next/link';

const termsOfService = ['terms 1', 'terms 2', 'terms 3'];
export default function TermsOfService({ submit }) {
  const { t, lang } = useTranslation('common');
  const [accepted, setAccepted] = useState(false);
  const submitTerms = () => {
    if (!accepted) {
      return;
    }
    submit();
  };
  return (
    <div className="flex flex-col">
      <div className="flex py-2 min-h-108">
        <div className="w-full pl-4">
          <h3 className="font-medium text-2xl mb-4">{t('terms and conditions')}</h3>
          <p className="text-gray-700 text-sm mb-8">{t('terms text')}</p>
          <ul className="list-disc pl-8 mb-8">
            {termsOfService.map((el, index) => (
              <li key={index} className="text-sm mb-3">
                {t(el)}
              </li>
            ))}
          </ul>
          <div className="relative flex items-center">
            <div className="flex items-center h-5">
              <input
                id="privacyPolicy"
                name="privacyPolicy"
                type="checkbox"
                onChange={() => setAccepted(!accepted)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-base">
              <label htmlFor="privacyPolicy" className="text-gray-900">
                {t('I read and accept')}{' '}
                <Link href="/" passHref={true}>
                  <a className="text-blue-600 hover:text-blue-400">{t('terms and conditions')}</a>
                </Link>{' '}
                {t('and')}{' '}
                <Link href="/" passHref={true}>
                  <a className="text-blue-600 hover:text-blue-400">{t('Privacy Policy')}</a>
                </Link>
                .
              </label>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-full"></div>
      </div>
      <div className="border-t flex justify-end items-center py-4">
        <button
          onClick={submitTerms}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 capitalize"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
}
