import SelectQuestion from '@/components/Questions/SelectQuestion/Question';

export default function Patient() {
  return (
    <div className="flex flex-col">
      <SelectQuestion
        title="What is your sex"
        options={[
          { id: 'female', label: 'Female' },
          { id: 'male', label: 'Male' },
        ]}
      />
      <div className="border-t flex justify-end items-center py-4">
        <button className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Next
        </button>
      </div>
    </div>
  );
}
