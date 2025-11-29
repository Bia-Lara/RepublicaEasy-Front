import { useState } from "react";
import ModalBase from "./ModalBase";

export default function AddMemberModal({ open, onClose, onSave }) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) return alert("Informe o email do membro!");
    onSave(email);
    setEmail("");
    onClose();
  };

  return (
    <ModalBase open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Adicionar Membro
      </h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email do usuário"
        className="w-full border rounded-xl px-4 py-3 bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none"
      />

      <button
        onClick={handleSubmit}
        className="
          mt-6 w-full cursor-pointer py-3 rounded-xl bg-green-600 text-white 
          font-semibold hover:brightness-110 transition
        "
      >
        Adicionar
      </button>
    </ModalBase>
  );
}
