import { useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function ProfileField({ label, value, onChange }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const toggleEdit = () => {
    if (editing) {
      onChange(inputValue); 
    }
    setEditing(!editing);
  };

  return (
    <div
      className="
        bg-green-200/70 border border-green-300 
        rounded-xl px-4 py-3 flex justify-between items-center
      "
    >
      {editing ? (
        <input
          className="bg-transparent outline-none text-gray-800 w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span className="text-gray-800">{value}</span>
      )}

      {editing ? (
        <CheckIcon
          className="w-5 text-green-700 cursor-pointer"
          onClick={toggleEdit}
        />
      ) : (
        <PencilIcon
          className="w-5 text-gray-700 cursor-pointer"
          onClick={toggleEdit}
        />
      )}
    </div>
  );
}
