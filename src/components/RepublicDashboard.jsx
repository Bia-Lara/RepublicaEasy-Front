import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { get, post, put } from "../services/ApiCLient";
import TaskList from "./TaskList";
import EditSection from "./EditSection";
import TaskModalCreate from "./Modals/TaskModalCreate";
import TaskModalEdit from "./Modals/TaskModalEdit";
import PhotoModal from "./Modals/PhotoModal";
import AddMemberModal from "./Modals/AddMemberModal";

export default function RepublicDashboard() {
  const { user } = useAuth();
  const republicaId = user?.republicaId;

  const [republica, setRepublica] = useState(null);
  const [tarefas, setTarefas] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openTaskEdit, setOpenTaskEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const [openAddMember, setOpenAddMember] = useState(false);

  
  function formatLocation(loc) {
    if (!loc) return "Localização não informada";

    return `
      ${loc.street || ""} ${loc.number || ""}, 
      ${loc.neighborhood || ""}, 
      ${loc.city || ""} - ${loc.state || ""}, 
      CEP ${loc.cep || ""}
    `
      .replace(/\s+/g, " ")
      .replace(/,\s*,/g, ",")
      .trim();
  }

  // ============= Fetch inicial ======================
  useEffect(() => {
    if (!republicaId) return;

    const loadData = async () => {
      try {
        const repResp = await get(`/republica/${republicaId}`);

        setRepublica({
          ...repResp.data,
          locationFormatted: formatLocation(repResp.data.localization),
        });

        const tasksResp = await get(
          `/republica/${republicaId}/tarefas/ativas`
        );
        setTarefas(tasksResp.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    loadData();
  }, [republicaId]);

  
  async function handleCreateTask(data) {
    try {
      const resp = await post(
        `/republica/${republicaId}/tarefa/${data.userId}`,
        { titulo: data.titulo, finalizada: false }
      );

      setTarefas((prev) => [...prev, resp.data]);
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
    }
  }


  async function handleEditRepublic(data) {
    try {
      const updatedData = {
        ...republica,
        ...data,
        imageUrl: newPhoto || republica.imageUrl,
      };

      const resp = await put(`/republica/${republicaId}`, updatedData);

      setRepublica({
        ...resp.data,
        locationFormatted: formatLocation(resp.data.localization),
      });

      alert("República atualizada!");
    } catch (err) {
      console.error("Erro ao editar república:", err);
    }
  }


  async function handleEditTask(data) {
    try {
      const resp = await put(`/republica/tarefa/${data.id}`, data);

      const updated = resp.data;

      if (updated.finalizada) {
        setTarefas((prev) => prev.filter((t) => t.id !== updated.id));
        return;
      }

      setTarefas((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );

    } catch (err) {
      console.error("Erro ao editar tarefa:", err);
    }
  }

  if (!republica) {
    return <div className="text-center mt-10">Carregando...</div>;
  }
  
async function handleAddMember(email) {
  try {
    const resp = await post(`/republica/addUser`, {
      email,
      republicaId
    });

   
    const addedUser = resp.data.data;

    setRepublica(prev => ({
      ...prev,
      users: [...(prev.users || []), addedUser]
    }));

    alert("Membro adicionado com sucesso!");
  } catch (err) {
    console.error("Erro ao adicionar membro:", err);
    alert("Erro ao adicionar membro. Verifique se o email está correto.");
  }
}


  const users = republica.users?.map((u) => ({
    id: u.id,
    nome: u.name
  })) || [];

  return (
    <div className="animate-fadeIn w-full">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        República <span className="text-green-700">{republica.name}</span>
      </h1>

      <TaskList
        tarefas={tarefas}
        onCreate={() => setOpenCreate(true)}
        onEdit={(t) => {
          setSelectedTask(t);
          setOpenTaskEdit(true);
        }}
      />

      <EditSection
        open={true}
        setOpen={() => {}}
        membros={users.map((u) => u.nome)}
        republica={republica}
        onSave={handleEditRepublic}
        onChangePhoto={() => setOpenPhotoModal(true)}
        setOpenAddMember={() => setOpenAddMember(true)}
      />

      <PhotoModal
        open={openPhotoModal}
        onClose={() => setOpenPhotoModal(false)}
        onSave={(url) => {
          setNewPhoto(url);
          setOpenPhotoModal(false);
        }}
      />

      <AddMemberModal
        open={openAddMember}
        onClose={() => setOpenAddMember(false)}
        onSave={handleAddMember}
      />

      <TaskModalCreate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        users={users}
        republicId={republicaId}
        onCreate={handleCreateTask}
      />

      <TaskModalEdit
        open={openTaskEdit}
        onClose={() => setOpenTaskEdit(false)}
        users={users}
        tarefa={selectedTask}
        onSave={handleEditTask}
      />
    </div>
  );
}
