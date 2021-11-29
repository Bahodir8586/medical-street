import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import Sidebar from './Sidebar';

const navigation = [
  { name: 'prices', href: '#' },
  { name: 'company', href: '#' },
  { name: 'terms and conditions', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

export default function Layout({ activeEl, ...props }) {
  const { t, lang } = useTranslation('common');
  return (
    <>
      <header className="bg-indigo-600">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-4 flex items-center justify-between border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <a href="#">
                <span className="sr-only">Medical Street</span>
                <Image
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt="Logo"
                  width={120}
                  height={40}
                />
              </a>
              <div className="hidden ml-10 space-x-8 lg:block">
                {navigation.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base capitalize font-medium text-white hover:text-indigo-50"
                  >
                    {t(link.name)}
                  </a>
                ))}
              </div>
            </div>
            <div className="ml-0 md:ml-10 space-x-4 flex">
              <a
                href="#"
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75 capitalize"
              >
                {t('sign in')}
              </a>
              <a
                href="#"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 capitalize"
              >
                {t('sign up')}
              </a>
            </div>
          </div>
          <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
            {navigation.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base capitalize font-medium text-white hover:text-indigo-50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <main className="container mx-auto max-w-5xl my-4 py-4 flex flex-col md:flex-row min-h-4xl">
        <Sidebar activeIndex={activeEl} />
        <div className="border rounded-lg bg-white w-full p-8">{props.children}</div>
      </main>
    </>
  );
}
