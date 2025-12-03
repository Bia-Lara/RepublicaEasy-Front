import { useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import ProfileField from "./ProfileField";
import PhotoModal from "../Modals/PhotoModal";

export default function ProfileCard({ user }) {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("************");
  const [photo, setPhoto] = useState(user?.photo);

  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  const handleSave = () => {
    console.log("Salvar perfil:", {
      name,
      email,
      password,
      photo,
    });
  };

  const handlePhotoSave = (newUrl) => {
    setPhoto(newUrl);
  };

  return (
    <div
      className="
        bg-white/70 backdrop-blur-xl 
        border border-white/40 rounded-3xl shadow-xl 
        p-10 flex flex-col gap-8
      "
    >
      <div className="flex flex-col md:flex-row gap-10 items-center">

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Nome</label>
          <ProfileField value={name} onChange={setName} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 font-medium">Email</label>
        <ProfileField value={email} onChange={setEmail} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 font-medium">Senha</label>
        <ProfileField value={password} onChange={setPassword} />
      </div>

      <div className="flex justify-end gap-6 mt-4">
        <button
          onClick={() => setOpenPhotoModal(true)}
          className="
            px-8 py-3 cursor-pointer rounded-xl border border-gray-800 
            hover:bg-gray-200 transition font-semibold
          "
        >
          Alterar foto
        </button>

        <button
          onClick={handleSave}
          className="
            px-8 py-3 cursor-pointer bg-gray-900 text-white rounded-xl 
            font-semibold shadow-md hover:brightness-110 transition
          "
        >
          Editar
        </button>
      </div>
      <PhotoModal
        open={openPhotoModal}
        onClose={() => setOpenPhotoModal(false)}
        onSave={handlePhotoSave}
      />
    </div>
  );
}
