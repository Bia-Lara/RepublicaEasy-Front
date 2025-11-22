import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RepublicCard from "./RepublicCard";

export default function RepublicList({ user }) {
  const [search, setSearch] = useState("");

  const republicas = [
    { id: 1, nome: "Rep. Scooby-Doo", imagem: "https://i.pinimg.com/236x/21/7a/14/217a14fa40c8de56cc0552d6f757aaf3.jpg" },
    { id: 2, nome: "Rep Princess", imagem: "https://recreio.com.br/wp-content/uploads/disney/princesas.jpeg" },
    { id: 3, nome: "Rep. Caverna do Dragão", imagem: "https://aosugo.com/wp-content/uploads/2011/11/caverna20131.jpg" },
  ];

  const navigate = useNavigate();

  const filteredRepublicas = republicas.filter((rep) =>
    rep.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full animate-fadeIn">
      
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">
        Bem-vindo(a), <span className="text-indigo-600">{user?.name}</span> 👋
      </h2>

      <div className="backdrop-blur-lg bg-white/70 border border-white/40 p-8 rounded-3xl shadow-xl max-w-5xl mx-auto">
        
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Pesquisar repúblicas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full px-5 py-3 rounded-2xl bg-gray-100 
              border border-gray-300 focus:ring-4 focus:ring-indigo-300 
              focus:outline-none text-gray-700 placeholder-gray-500 transition-all
            "
          />
          <span className="absolute right-5 top-3.5 text-gray-500 text-xl pointer-events-none">
            🔎
          </span>
        </div>

        {filteredRepublicas.length === 0 ? (
          <p className="text-center text-gray-600 py-8">
            Nenhuma república encontrada 😕
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredRepublicas.map((rep) => (
              <RepublicCard
                key={rep.id}
                nome={rep.nome}
                imagem={rep.imagem}
                onClick={() => navigate(`/republica/${rep.id}`)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
