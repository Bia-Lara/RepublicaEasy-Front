import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function PasswordInput({ label, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-left relative">
      <label className="block text-sm mb-1 font-medium">{label}</label>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full px-0 py-2 border-b-2 border-gray-300 focus:border-green-500 focus:ring-0 outline-none"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
      </button>
    </div>
  );
}
