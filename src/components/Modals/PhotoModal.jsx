import { useState } from "react";
import ModalBase from "./ModalBase";

export default function PhotoModal({ open, onClose, onSave }) {
  const [url, setUrl] = useState("");

  const handleSave = () => {
    onSave(url); 
    onClose();
  };

  return (
    <ModalBase open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Alterar Foto
      </h2>

      <div className="flex flex-col gap-4">
        <label className="text-gray-700 text-sm font-semibold">
          URL da Foto
        </label>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          className="
            w-full border rounded-xl px-4 py-3 bg-gray-100 
            focus:ring-2 focus:ring-green-500 outline-none
          "
        />

        {url && (
          <img
            src={url}
            alt="Preview"
            className="w-32 h-32 mx-auto rounded-full object-cover shadow-md mt-4"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        className="
          mt-6 w-full py-3 rounded-xl 
          bg-green-600 text-white font-semibold
          hover:brightness-110 transition
        "
      >
        Salvar Foto
      </button>
    </ModalBase>
  );
}
