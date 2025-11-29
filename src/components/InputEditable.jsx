import { useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function InputEditable({ value, onChange }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  const handleSave = () => {
    setEditing(false);
    onChange(temp);  
  };

  return (
    <div
      className="
        bg-gray-100 border border-gray-300 
        rounded-xl px-4 py-3 flex items-center justify-between
      "
    >
      {editing ? (
        <input
          className="w-full bg-transparent outline-none text-gray-800"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          autoFocus
        />
      ) : (
        <span className="text-gray-800">{value}</span>
      )}

      {editing ? (
        <CheckIcon
          className="w-5 text-green-600 cursor-pointer ml-3"
          onClick={handleSave}
        />
      ) : (
        <PencilIcon
          className="w-5 text-gray-700 cursor-pointer ml-3"
          onClick={() => setEditing(true)}
        />
      )}
    </div>
  );
}
