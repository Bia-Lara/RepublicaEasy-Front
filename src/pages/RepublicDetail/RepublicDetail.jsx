import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import RepublicDetailCard from "../../components/RepublicDetailCard";
import { get } from "../../services/ApiCLient";

export default function RepublicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [republica, setRepublica] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepublicaDetail = async () => {
      try {
        const response = await get(`/republica/${id}`);

        const r = response.data;

        setRepublica({
          nome: r.name,
          descricao: r.description,
          localizacao: r.localization,
          imagem: r.imageUrl,
          vagas: r.users ? `${r.users.length}/${r.limitSpot}` : `0/${r.limitSpot}`,
          contato: r.contact,
        });

      } catch (error) {
        console.error("Erro ao buscar detalhes da república:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepublicaDetail();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!republica) {
    return <div className="min-h-screen flex items-center justify-center">República não encontrada</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <main className="flex-1 flex justify-center px-4 md:px-10 py-10 ml-72">
        <div className="w-full max-w-5xl animate-fadeIn">
          <RepublicDetailCard republica={republica} navigate={navigate} />
        </div>
      </main>
    </div>
  );
}
