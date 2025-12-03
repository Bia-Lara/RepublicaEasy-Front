import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function RepublicDetailCard({ republica, navigate }) {

  const loc = republica.localizacao || {};

  const enderecoFormatado = `
    ${loc.street || ""} ${loc.number || ""}, 
    ${loc.neighborhood || ""}, 
    ${loc.city || ""} - ${loc.state || ""}, 
    CEP ${loc.cep || ""}
  `.replace(/\s+,/g, ",").replace(/,\s+,/g, ",").trim();

  return (
    <div
      className="
        bg-white/70 backdrop-blur-xl border border-white/40 
        rounded-3xl shadow-xl p-10
      "
    >
      <div className="flex items-center gap-5 mb-6">
        <img
          src={republica.imagem}
          alt={republica.nome}
          className="w-20 h-20 rounded-full shadow-md object-cover"
        />

        <h1 className="text-3xl font-bold text-gray-800">
          {republica.nome}
        </h1>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">
        {republica.descricao}
      </p>

      <div className="flex justify-between text-gray-800 font-medium mb-8">
        <p>
          <span className="font-semibold">Localização:</span>{" "}
          {enderecoFormatado}
        </p>

        <p>
          <span className="font-semibold">Vagas:</span>{" "}
          {republica.vagas}
        </p>
      </div>

      <p className="text-gray-800 font-medium mb-10">
        <span className="font-semibold">Contato:</span>{" "}
        {republica.contato}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="
          px-6 py-3 rounded-xl cursor-pointer 
          bg-gray-200 hover:bg-gray-300 
          text-gray-700 font-semibold 
          shadow-md 
          flex items-center gap-2
          transition-all duration-300
        "
      >
        <ArrowLeftIcon className="w-5" />
        Voltar
      </button>
    </div>
  );
}
