import { useState } from "react";
import TaskList from "./TaskList";
import EditSection from "./EditSection";

import TaskModalCreate from "./Modals/TaskModalCreate";
import TaskModalEdit from "./Modals/TaskModalEdit";

export default function RepublicDashboard() {
  const [openEdit, setOpenEdit] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [openTaskEdit, setOpenTaskEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tarefas = [
    { id: 1, titulo: "Tirar o lixo", responsavel: "Maria", userId: 1, finalizada: false },
    { id: 2, titulo: "Organizar sala", responsavel: "Clara", userId: 2, finalizada: false },
    { id: 3, titulo: "Regar as plantas", responsavel: "Maria", userId: 1, finalizada: false },
    { id: 4, titulo: "Lavar banheiro", responsavel: "Amanda", userId: 3, finalizada: true },
  ];

  const users = [
    { id: 1, nome: "Maria" },
    { id: 2, nome: "Clara" },
    { id: 3, nome: "Amanda" },
  ];

  const republicId = 10; // mock por enquanto

  return (
    <div className="animate-fadeIn w-full">

      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        República <span className="text-green-700">Dauhma</span>
      </h1>

      {/* LISTA DE TAREFAS */}
      <TaskList
        tarefas={tarefas}
        onCreate={() => setOpenCreate(true)}
        onEdit={(task) => {
          setSelectedTask(task);
          setOpenTaskEdit(true);
        }}
      />

      {/* SEÇÃO DE EDIÇÃO */}
      <EditSection open={openEdit} setOpen={setOpenEdit} membros={users.map(u => u.nome)} />

      {/* MODAL Criar tarefa */}
      <TaskModalCreate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        users={users}
        republicId={republicId}
        onCreate={(data) => {
          console.log("Cadastrar tarefa:", data);
        }}
      />

      {/* MODAL Editar tarefa */}
      <TaskModalEdit
        open={openTaskEdit}
        onClose={() => setOpenTaskEdit(false)}
        users={users}
        tarefa={selectedTask}
        onSave={(data) => {
          console.log("Salvar alterações:", data);
        }}
      />
    </div>
  );
}
