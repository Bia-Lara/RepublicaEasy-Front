import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("O campo email é obrigatório.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    if (!password) {
      setError("O campo senha é obrigatório.");
      return;
    }

    if (password.length < 4) {
      setError("A senha deve ter no mínimo 4 caracteres.");
      return;
    }

    const resp = await login({ email, password });
    if (resp.ok) {
      navigate("/Home");
    } else {
      setError(resp.message || "Credenciais inválidas");
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
        <p className="text-gray-600 mt-2">Conecte-se com sua república</p>

        <Tabs tabs={["Login", "Cadastro"]} />

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-sm text-red-600">{error}</div>}

          <Input
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  );
}
