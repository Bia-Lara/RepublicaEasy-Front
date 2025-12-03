import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });

    setTimeout(() => setToast(null), 3000); 
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast */}
      {toast && (
        <div
          className={`
            fixed top-6 left-1/2 -translate-x-1/2
            px-6 py-3 rounded-xl shadow-xl text-white
            z-[9999]
            animate-toast-enter
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
          `}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
