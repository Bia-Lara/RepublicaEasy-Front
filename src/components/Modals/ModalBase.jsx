export default function ModalBase({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 w-full max-w-lg animate-fadeIn">
        
        {children}

        <button
          onClick={onClose}
          className="mt-6 w-full cursor-pointer py-3 rounded-xl bg-gray-300 hover:bg-gray-400 transition text-gray-800 font-semibold"
        >
          Fechar
        </button>
      </div>

    </div>
  );
}
