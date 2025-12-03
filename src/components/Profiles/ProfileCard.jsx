import { useState } from "react";
import ProfileField from "./ProfileField";
import ProfileFieldReadOnly from "./ProfileFieldReadOnly";
import { put } from "../../services/ApiCLient";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../Modals/Toast";

export default function ProfileCard({ user }) {
  const { updateUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name);

  const handleSave = async () => {
    try {
      await put(`/user/${user.id}`, {
        name: name,
      });

      updateUser({
        ...user,
        name,
      });

      showToast("Nome atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar nome:", err);
      showToast("Erro ao atualizar nome.");
    }
  };

  return (
    <div
      className="
        bg-white/70 backdrop-blur-xl 
        border border-white/40 rounded-3xl shadow-xl 
        p-10 flex flex-col gap-10
      "
    >
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Nome</label>
          <ProfileField value={name} onChange={setName} />
        </div>

       
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Email</label>
          <ProfileFieldReadOnly value={user.email} />
        </div>

        
        {user.localization && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 font-medium">Cidade</label>
              <ProfileFieldReadOnly value={user.localization.city} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 font-medium">Estado</label>
              <ProfileFieldReadOnly value={user.localization.state} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 font-medium">Rua</label>
              <ProfileFieldReadOnly value={user.localization.street} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 font-medium">Bairro</label>
              <ProfileFieldReadOnly value={user.localization.neighborhood} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 font-medium">Número</label>
              <ProfileFieldReadOnly value={user.localization.number} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 font-medium">CEP</label>
              <ProfileFieldReadOnly value={user.localization.cep} />
            </div>
          </>
        )}

      </div>

  
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="
            px-8 py-3 cursor-pointer bg-gray-900 text-white rounded-xl 
            font-semibold shadow-md hover:brightness-110 transition
          "
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
