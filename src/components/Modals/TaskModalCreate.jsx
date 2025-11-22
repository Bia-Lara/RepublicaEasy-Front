import { useState } from "react";
import ModalBase from "./ModalBase";

export default function TaskModalCreate({ open, onClose, onCreate, users, republicId }) {
  const [titulo, setTitulo] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = () => {
    onCreate({
      titulo,
      userId,
      republicId,
      finalizada: false
    });
    onClose();
  };

  return (
    <ModalBase open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Criar Tarefa
      </h2>

      <div className="flex flex-col gap-4">

        <div>
          <label className="text-sm text-gray-700 font-medium">Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Tirar o lixo"
            className="mt-1 w-full border rounded-xl px-4 py-3 bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">Responsável</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 w-full border rounded-xl px-4 py-3 bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option value="">Selecione...</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.nome}</option>
            ))}
          </select>
        </div>

      </div>

      <button
        onClick={handleSubmit}
        className="
          mt-6 w-full cursor-pointer py-3 rounded-xl bg-green-600 text-white 
          font-semibold hover:brightness-110 transition
        "
      >
        Criar Tarefa
      </button>
    </ModalBase>
  );
}
