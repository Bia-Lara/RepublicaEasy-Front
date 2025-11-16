// src/pages/Login/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const resp = await login({ username, password });
    if (resp.ok) {
      navigate("/dashboard");
    } else {
      setError(resp.message || "Credenciais inválidas");
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
        <p className="text-gray-600 mt-2">Conecte-se com sua república</p>

        <Tabs tabs={["Login", "Cadastro"]} />

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-sm text-red-600">{error}</div>}

          <Input
            label="Usuário ou email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  );
}
