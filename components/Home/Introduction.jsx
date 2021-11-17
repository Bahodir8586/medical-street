export default function Introduction() {
  return (
    <div className="flex flex-col">
      <div className="flex py-2 h-108">
        <div className="w-full pl-4">
          <h3 className="font-medium text-2xl mb-4 mt-20">Hello</h3>
          <p className="text-gray-700 text-sm mb-8">
            You’re about to use a short (3 min), safe and anonymous health checkup. Your answers
            will be carefully analyzed and you’ll learn about possible causes of your symptoms.
          </p>
        </div>
        <div className="w-full"></div>
      </div>
      <div className="border-t flex justify-end items-center py-4">
        <button className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Next
        </button>
      </div>
    </div>
  );
}
