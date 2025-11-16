export default function Input({ label, ...props }) {
    return (
        <div className="text-left">
            <label className="block text-sm mb-1 font-medium">{label}</label>
            <input
            {...props}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
        );
    }