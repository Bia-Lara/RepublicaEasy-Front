import { PencilIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import InputEditable from "./InputEditable";

export default function EditSection({ open, setOpen, membros }) {
  return (
    <section
      className="
        bg-white/70 backdrop-blur-xl 
        border border-white/40 rounded-3xl shadow-xl p-8
      "
    >
      {/* Header */}
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
          {/* Foto + Nome */}
          <div className="flex items-center gap-5 mt-6">
            <img
              src="https://i.pinimg.com/736x/72/1e/ea/721eea3fa04c4e5d88cdb22c47248289.jpg"
              alt="Foto"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />

            <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              Dauhma
              <PencilIcon className="w-5 text-gray-700 cursor-pointer" />
            </div>
          </div>

          {/* Inputs editáveis */}
          <div className="mt-8 flex flex-col gap-4">
            <InputEditable value="Rua 123" />
            <InputEditable value="Descrição da república" />
            <InputEditable value="1 vez por mês" />
            <InputEditable value="email@email.com" />
          </div>

          {/* Membros */}
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

          {/* Botões */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              className="
                px-6 py-2 cursor-pointer rounded-xl border border-gray-700 
                hover:bg-gray-200 transition font-medium
              "
            >
              Alterar foto
            </button>

            <button
              className="
                px-6 py-3 cursor-pointer bg-gray-900 text-white rounded-xl 
                font-semibold shadow-md hover:brightness-110 transition
              "
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
