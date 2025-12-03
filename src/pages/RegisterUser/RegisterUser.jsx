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
      return setError("As senhas não conferem.");
    }

    const payload = {
      name,
      email,
      password
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
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-green-400 via-yellow-300 to-green-200 p-4">
      <div className="bg-white shadow-xl w-full max-w-md rounded-2xl p-8 relative text-center">
        <img
          src={logo}
          alt="Mascote"
          className="w-48 h-48 object-contain absolute -top-20 left-1/2 transform -translate-x-1/2"
        />
        <h1
          className="text-3xl mt-10 text-green-700"
          style={{ fontFamily: "'BROSE', sans-serif" }}
        >
          RepúblicaEasy
        </h1>
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

          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
