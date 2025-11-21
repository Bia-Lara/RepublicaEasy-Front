import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import RepublicDetailCard from "../../components/RepublicDetailCard";

export default function RepublicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [republica, setRepublica] = useState(null);

  useEffect(() => {

    const mockData = {
      1: {
        nome: "Rep. Scooby-Doo",
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod suscipit felis...",
        localizacao: "Rua Dois",
        vagas: "3/6",
        contato: "scooby@rep.com",
        imagem:
          "https://i.pinimg.com/236x/21/7a/14/217a14fa40c8de56cc0552d6f757aaf3.jpg",
      },
      2: {
        nome: "Rep Princess",
        descricao:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem...",
        localizacao: "Rua das Flores",
        vagas: "6/6",
        contato: "princess@rep.com",
        imagem:
          "https://recreio.com.br/wp-content/uploads/disney/princesas.jpeg",
      },
      3: {
        nome: "Rep. Caverna do Dragão",
        descricao: "At vero eos et accusamus et iusto odio dignissimos ducimus...",
        localizacao: "Av. Central",
        vagas: "0/6",
        contato: "dragao@rep.com",
        imagem:
          "https://aosugo.com/wp-content/uploads/2011/11/caverna20131.jpg",
      },
    };

    setRepublica(mockData[id]);
  }, [id]);

  if (!republica) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Carregando detalhes...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <main
        className="
          flex-1 flex justify-center px-4 md:px-10 py-10 
          ml-72
        "
      >
        <div className="w-full max-w-5xl animate-fadeIn">
          <RepublicDetailCard republica={republica} navigate={navigate} />
        </div>
      </main>
    </div>
  );
}
