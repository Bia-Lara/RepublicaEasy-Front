export default function RepublicCard({ nome, imagem, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl p-5 bg-white shadow-md border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={imagem}
          alt={nome}
          className="w-28 h-28 rounded-2xl object-cover shadow-md group-hover:scale-105 transition"
        />

        <span className="mt-4 text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
          {nome}
        </span>
      </div>
    </div>
  );
}
