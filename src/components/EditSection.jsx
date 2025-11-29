import { PencilIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import InputEditable from "./InputEditable";
import { useState } from "react";

export default function EditSection({
  open,
  setOpen,
  republica,
  membros,
  onSave,
  onChangePhoto,
  setOpenAddMember
}) {

  const [form, setForm] = useState({
    name: republica.name,
    description: republica.description,
    localization: republica.localization,
    contact: republica.contact,
    limitSpot: republica.limitSpot
  });

  const handleInput = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(form); 
  };

  return (
    <section
      className="
        bg-white/70 backdrop-blur-xl 
        border border-white/40 rounded-3xl shadow-xl p-8
      "
    >

      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h2 className="text-2xl font-bold text-gray-800">Editar Dados</h2>
        <ChevronDownIcon
          className={`w-7 text-gray-700 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div>
         
          <div className="flex items-center gap-5 mt-6">
            <img
              src={republica.imageUrl || "https://via.placeholder.com/150"}
              alt="Foto"
              className="w-24 h-24 rounded-full object-cover shadow-md cursor-pointer"
              onClick={onChangePhoto}
            />

            <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              {republica.name}
              <PencilIcon className="w-5 text-gray-700 cursor-pointer" />
            </div>
          </div>

         
          <div className="mt-8 flex flex-col gap-4">
            <InputEditable
              value={form.localization}
              onChange={(v) => handleInput("localization", v)}
            />

            <InputEditable
              value={form.description}
              onChange={(v) => handleInput("description", v)}
            />

            <InputEditable
              value={form.limitSpot}
              onChange={(v) => handleInput("limitSpot", v)}
            />

            <InputEditable
              value={form.contact}
              onChange={(v) => handleInput("contact", v)}
            />
          </div>

        
          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-3">Membros</h3>

          <div className="flex flex-col gap-3">
            {membros.map((nome, index) => (
              <div
                key={index}
                className="
                  bg-green-200/60 text-gray-800 border border-green-300 
                  rounded-xl px-4 py-3 flex justify-between items-center
                "
              >
                {nome}
                <XMarkIcon className="w-6 h-6 cursor-pointer text-gray-700" />
              </div>
            ))}
          </div>

          
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={onChangePhoto}
              className="
                px-6 py-2 cursor-pointer rounded-xl border border-gray-700 
                hover:bg-gray-200 transition font-medium
              "
            >
              Alterar foto
            </button>

            <button
              onClick={handleSubmit}
              className="
                px-6 py-3 cursor-pointer bg-gray-900 text-white rounded-xl 
                font-semibold shadow-md hover:brightness-110 transition
              "
            >
              Editar
            </button>


            <button
              onClick={() => setOpenAddMember(true)}
              className="
                mt-2 px-4 py-2 cursor-pointer rounded-xl bg-green-600 text-white 
                font-semibold hover:brightness-110 transition
              "
            >
              + Adicionar membro
            </button>

  
          </div>
        </div>
      )}
    </section>
  );
}
