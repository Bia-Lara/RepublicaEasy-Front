import { useState } from "react";
import ModalBase from "./ModalBase";

export default function PhotoModal({ open, onClose, onSave }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.length > 255) {
      setError("A URL deve ter no máximo 255 caracteres.");
      return;
    }

    setError("");
    setUrl(value);
  };

  const handleSave = () => {
    if (!error) {
      onSave(url);
      onClose();
    }
  };

  return (
    <ModalBase open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Alterar Foto
      </h2>

      <div className="flex flex-col gap-4">
        <label className="text-gray-700 text-sm font-semibold">
          URL da Foto (máx 255 caracteres)
        </label>

        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.jpg"
          maxLength={255}
          className={`
            w-full border rounded-xl px-4 py-3 bg-gray-100 
            focus:ring-2 outline-none
            ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-green-500"}
          `}
        />

        
        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        
        {url && !error && (
          <img
            src={url}
            alt="Preview"
            className="w-32 h-32 mx-auto rounded-full object-cover shadow-md mt-4"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={error || !url}
        className={`
          mt-6 w-full py-3 rounded-xl font-semibold
          transition
          ${error || !url
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-600 text-white hover:brightness-110"}
        `}
      >
        Salvar Foto
      </button>
    </ModalBase>
  );
}
