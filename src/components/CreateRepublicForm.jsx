import { useState } from "react";
import Input from "./Input";
import PhotoModal from "./Modals/PhotoModal"; 
import { post } from "../services/ApiCLient";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function CreateRepublicForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
    cidade: "",
    estado: "",
    vagas: "",
    descricao: "",
  });

  const handleChange = (field, value) => {
    let v = value;

    if (field === "cep") {
      v = value.replace(/\D/g, "").slice(0, 8);
      if (v.length > 5) v = `${v.slice(0, 5)}-${v.slice(5)}`;
    }

    if (field === "numero") {
      v = value.replace(/\D/g, "").slice(0, 6);
    }

    if (field === "estado") {
      v = value.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
    }

    setForm((prev) => ({ ...prev, [field]: v }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      
      const localization = {
        city: form.cidade,
        state: form.estado,
        neighborhood: form.bairro,
        street: form.rua,
        number: Number(form.numero),
        cep: form.cep.replace(/\D/g, ""),
      };

      const body = {
        name: form.nome,
        description: form.descricao || null,
        localization,
        imageUrl: imagePreview || null,
        limitSpot: Number(form.vagas),
        contact: user.email,
      };

      console.log("📦 Enviando payload:", body);

      const resp = await post("/republica", body);
      const republicaCriada = resp.data.data;

      await post("/republica/addUser", {
        email: user.email,
        republicaId: republicaCriada.id,
      });

      updateUser({
        ...user,
        republicaId: republicaCriada.id,
      });

      navigate("/republica-user");

      alert("República criada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar república:", err);
      alert("Erro ao criar república");
    }
  }

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Você não pertence a uma república
      </h2>

      <div
        className="
          bg-white/60 backdrop-blur-xl
          w-full max-w-xl p-10 rounded-3xl shadow-xl 
          border border-white/40
        "
      >
        <h3 className="text-center text-xl font-semibold text-green-700 mb-8">
          Crie sua própria república e conecte-se com outros usuários
        </h3>

        {/* FOTO */}
        <div className="flex flex-col items-center mb-8">
          <div
            onClick={() => setOpenPhotoModal(true)}
            className="
              w-32 h-32 rounded-full 
              bg-gradient-to-br from-green-200 to-emerald-100
              border-2 border-green-300
              shadow-md
              flex items-center justify-center
              cursor-pointer hover:scale-105 hover:shadow-lg
              transition-all duration-300
              overflow-hidden
            "
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-green-700 text-sm font-medium">
                Adicionar foto
              </span>
            )}
          </div>
        </div>

        <PhotoModal
          open={openPhotoModal}
          onClose={() => setOpenPhotoModal(false)}
          onSave={(url) => setImagePreview(url)}
        />

        {/* FORM */}
        <form className="flex flex-col gap-5">
          <Input label="Nome da República" value={form.nome} onChange={(e) => handleChange("nome", e.target.value)} />
          <Input label="CEP" value={form.cep} onChange={(e) => handleChange("cep", e.target.value)} />
          <Input label="Rua" value={form.rua} onChange={(e) => handleChange("rua", e.target.value)} />
          <Input label="Bairro" value={form.bairro} onChange={(e) => handleChange("bairro", e.target.value)} />
          <Input label="Número" value={form.numero} onChange={(e) => handleChange("numero", e.target.value)} />
          <Input label="Cidade" value={form.cidade} onChange={(e) => handleChange("cidade", e.target.value)} />
          <Input label="Estado (UF)" value={form.estado} onChange={(e) => handleChange("estado", e.target.value)} />
          <Input label="Vagas" value={form.vagas} onChange={(e) => handleChange("vagas", e.target.value)} />

          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              className="
                w-full border-b-2 border-gray-300 
                focus:border-green-500 outline-none 
                bg-transparent py-2
              "
              rows={3}
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              placeholder="Fale um pouco sobre a república"
            ></textarea>
          </div>

          <button
            onClick={handleSubmit}
            className="
              bg-gradient-to-r from-green-600 to-emerald-500
              text-white font-semibold py-3 rounded-xl
              mt-6 shadow-md hover:shadow-lg 
              hover:brightness-110 transition-all duration-300
            "
          >
            Cadastrar República
          </button>
        </form>
      </div>
    </div>
  );
}
