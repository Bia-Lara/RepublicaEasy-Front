import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RepublicCard from "./RepublicCard";
import { get } from "../services/ApiCLient";

export default function RepublicList({ user }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [republicas_api, setRepublicas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepublicas = async () => {
      try {
        const response = await get("/republica");
        setRepublicas(response.data);
      } catch (error) {
        console.error("Erro ao buscar repúblicas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepublicas();
  }, []);

  const filteredRepublicas = republicas_api.filter((rep) =>
    rep.name.toLowerCase().includes(search.toLowerCase())
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
              nome={rep.name}
              imagem={rep.imageUrl}
              onClick={() => navigate(`/republica/${rep.id}`)}
            />
          ))}
        </div>
        )}

      </div>
    </div>
  );
  }
