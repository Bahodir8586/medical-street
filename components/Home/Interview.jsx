export default function Interview({ submit, initialInterview }) {
  console.log(initialInterview);
  return (
    <div className="flex flex-col">
      <div className="border-t flex justify-end items-center py-4">
        <button
          onClick={submit}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
