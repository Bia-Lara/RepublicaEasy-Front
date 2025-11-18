import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [stateUf, setStateUf] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  const REGISTER_URL = API_BASE + "/api/v1/auth/register";



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha nome, email e senha.");
      return;
    }
    if (password.length < 6) {
      setError("Senha deve ter ao menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    const payload = {
      name,
      email,
      password,
      localization: {
        city: city || null,
        state: stateUf || null,
      },
    };

    try {
      setLoading(true);
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text().catch(() => null);

      if (res.ok) {
        navigate("/login");
      } else {
        setError(text || "Erro no cadastro. Verifique os dados.");
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
      <div className="bg-white shadow-xl w-full max-w-md rounded-2xl p-8 relative text-center">
        <img
          src={logo}
          alt="Mascote"
          className="w-28 h-28 object-contain absolute -top-16 left-1/2 transform -translate-x-1/2"
        />
        <h1 className="text-3xl font-bold text-green-700 mt-12">RepúblicaEasy</h1>
        <p className="text-gray-600 mt-2">Crie sua conta e entre na comunidade</p>

        <Tabs tabs={["Login", "Cadastro"]} />

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-sm text-red-600">{error}</div>}

          <Input label="Nome completo" type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex-1">
              <Input
                label="Confirmar senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="Cidade" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div style={{ width: 120 }}>
              <label className="text-sm text-gray-700 block mb-1">Estado</label>
              <select
                value={stateUf}
                onChange={(e) => setStateUf(e.target.value)}
                className="w-full rounded-md border border-gray-200 p-2 bg-white"
              >
                <option value="">UF</option>
                <option>AC</option>
                <option>AL</option>
                <option>AP</option>
                <option>AM</option>
                <option>BA</option>
                <option>CE</option>
                <option>DF</option>
                <option>ES</option>
                <option>GO</option>
                <option>MA</option>
                <option>MT</option>
                <option>MS</option>
                <option>MG</option>
                <option>PA</option>
                <option>PB</option>
                <option>PR</option>
                <option>PE</option>
                <option>PI</option>
                <option>RJ</option>
                <option>RN</option>
                <option>RS</option>
                <option>RO</option>
                <option>RR</option>
                <option>SC</option>
                <option>SP</option>
                <option>SE</option>
                <option>TO</option>
              </select>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
