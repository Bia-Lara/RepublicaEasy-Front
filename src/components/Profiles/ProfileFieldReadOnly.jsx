export default function ProfileFieldReadOnly({ value }) {
  return (
    <div
      className="
        bg-green-200/70 border border-green-300 
        rounded-xl px-4 py-3
      "
    >
      <span className="text-gray-800">{value}</span>
    </div>
  );
}