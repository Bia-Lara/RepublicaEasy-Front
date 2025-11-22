import { PencilIcon } from "@heroicons/react/24/outline";

export default function InputEditable({ value }) {
  return (
    <div
      className="
        bg-green-200/70 border border-green-300 
        rounded-xl px-4 py-3 flex justify-between items-center
      "
    >
      <span className="text-gray-800">{value}</span>
      <PencilIcon className="w-5 text-gray-700 cursor-pointer" />
    </div>
  );
}
