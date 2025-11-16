export default function Button({ children, ...props }) {
    return (
        <button
            {...props}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition cursor-pointer"
            >
            {children}
        </button>
    );
}