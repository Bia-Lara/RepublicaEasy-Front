export default function Input({ label, ...props }) {
  return (
    <div className="text-left">
      <label className="block text-sm mb-1 font-medium">{label}</label>
      <input
        {...props}
        className="
          w-full
          px-0
          py-2
          border-b-2
          border-gray-300
          focus:border-green-500
          focus:ring-0
          outline-none
        "
      />
    </div>
  );
}
