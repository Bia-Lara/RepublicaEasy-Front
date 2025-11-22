import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";
import logo from "../../assets/images/logo.png";

export default function RegisterRepublic() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [localization, setLocalization] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [limitSpot, setLimitSpot] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  const API_URL = API_BASE + "/api/v1/republica";



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Nome da república é obrigatório.");
      return;
    }


    const limit = limitSpot ? parseInt(limitSpot, 10) : 0;
    const contactNum = contact ? parseInt(contact.replace(/\D/g, ""), 10) : 0;

    const payload = {
      name,
      description: description || null,
      localization: localization || null,
      imageUrl: imageUrl || null,
      limitSpot: limit || 0,
      contact: contactNum || 0,
    };

    try {
      setLoading(true);
      const headers = { "Content-Type": "application/json" };
      const token = localStorage.getItem("token");
      if (token) headers["Authorization"] = "Bearer " + token;

      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const text = await res.text().catch(() => null);

      if (res.ok) {
        
        navigate("/home");
      } else {
        setError(text || "Erro ao cadastrar república.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl w-full max-w-2xl rounded-2xl p-8 relative text-center">
        <img
          src={logo}
          alt="Mascote"
          className="w-28 h-28 object-contain absolute -top-16 left-1/2 transform -translate-x-1/2"
        />
        <h1 className="text-3xl font-bold text-green-700 mt-12">Cadastro de República</h1>
        <p className="text-gray-600 mt-2">Crie uma república e convide membros</p>

        <Tabs tabs={["República"]} />

        <form className="mt-6 space-y-4 text-left" onSubmit={handleSubmit}>
          {error && <div className="text-sm text-red-600">{error}</div>}

          <Input label="Nome da República" type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <div>
            <label className="text-sm text-gray-700 block mb-1">Descrição</label>
            <textarea
              className="w-full rounded-md border border-gray-200 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Input label="Localização (cidade/bairro)" type="text" value={localization} onChange={(e) => setLocalization(e.target.value)} />
            <Input label="URL da imagem" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="Limite de vagas" type="number" value={limitSpot} onChange={(e) => setLimitSpot(e.target.value)} />
            </div>
            <div style={{ width: 200 }}>
              <Input label="Contato (telefone)" type="tel" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
          </div>

          <div className="text-right">
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Cadastrar República"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
