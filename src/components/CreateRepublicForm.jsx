import { useState, useRef } from "react";
import Input from "./Input";

export default function CreateRepublicForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Você não pertence a uma república
      </h2>

      <div className="
        bg-white/60 backdrop-blur-xl
        w-full max-w-xl p-10 rounded-3xl shadow-xl 
        border border-white/40
      ">
        <h3 className="text-center text-xl font-semibold text-green-700 mb-8">
          Crie sua própria república e conecte-se com outros usuários
        </h3>

        {/* FOTO */}
        <div className="flex flex-col items-center mb-8">
          {/* INPUT OCULTO */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />

          {/* CÍRCULO CLICÁVEL */}
          <div
            onClick={openFilePicker}
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

        {/* FORM */}
        <form className="flex flex-col gap-5">
          <Input label="Nome da República" placeholder="Ex: República Sol Nascente" />
          <Input label="CEP" placeholder="00000-000" />
          <Input label="Rua" placeholder="Nome da rua" />
          <Input label="Bairro" placeholder="Nome do bairro" />
          <Input label="Número" placeholder="123" />
          <Input label="Cidade" placeholder="Cidade" />
          <Input label="Estado" placeholder="Estado" />

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
              placeholder="Fale um pouco sobre a república"
            ></textarea>
          </div>

          <button className="
            bg-gradient-to-r from-green-600 to-emerald-500
            text-white font-semibold py-3 rounded-xl
            mt-6 
            shadow-md hover:shadow-lg 
            hover:brightness-110 
            transition-all duration-300
          ">
            Cadastrar República
          </button>
        </form>
      </div>
    </div>
  );
}
