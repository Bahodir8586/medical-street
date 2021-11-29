import useTranslation from 'next-translate/useTranslation';

const elements = ['introduction', 'patient', 'symptoms', 'interview', 'results'];
export default function Sidebar({ activeIndex }) {
  const { t, lang } = useTranslation('common');
  return (
    <div className="px-8 mt-8">
      <ul>
        {elements.map((el, index) => (
          <li
            key={el}
            className={`capitalize ${
              activeIndex === index
                ? 'text-gray-900'
                : activeIndex < index
                ? 'text-gray-500'
                : 'text-gray-400'
            } font-medium mb-2`}
          >
            {t(el)}
          </li>
        ))}
      </ul>
    </div>
  );
}
