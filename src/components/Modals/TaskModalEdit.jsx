import { useState, useEffect } from "react";
import ModalBase from "./ModalBase";

export default function TaskModalEdit({ open, onClose, onSave, users, tarefa }) {
  const [titulo, setTitulo] = useState("");
  const [userId, setUserId] = useState("");
  const [finalizada, setFinalizada] = useState(false);

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setUserId(tarefa.userId);
      setFinalizada(tarefa.finalizada);
    }
  }, [tarefa]);

  const handleSubmit = () => {
    onSave({
      ...tarefa,
      titulo,
      userId,
      finalizada
    });
    onClose();
  };

  return (
    <ModalBase open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Editar Tarefa
      </h2>

      <div className="flex flex-col gap-4">

        <div>
          <label className="text-sm text-gray-700 font-medium">Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
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
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.nome}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={finalizada}
            onChange={() => setFinalizada(!finalizada)}
            className="w-5 h-5"
          />
          <span className="text-gray-800 font-medium">Tarefa finalizada</span>
        </div>

      </div>

      <button
        onClick={handleSubmit}
        className="
          mt-6 w-full cursor-pointer py-3 rounded-xl bg-green-600 text-white 
          font-semibold hover:brightness-110 transition
        "
      >
        Salvar Alterações
      </button>
    </ModalBase>
  );
}
