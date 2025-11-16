// src/hooks/useAuth.js
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

/**
 * AuthProvider + useAuth hook
 * - Login envia credentials para /login (Spring Security)
 * - Espera um token (JWT) no campo data.token (ajuste conforme seu backend)
 * - Guarda token em localStorage e configura header Authorization em axios
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // recuperar token e user do storage ao iniciar
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(rawUser ? JSON.parse(rawUser) : { token }); // ajuste conforme payload
    }
    setLoading(false);
  }, []);

  async function login({ username, password }) {
    // ajuste endpoint /login conforme Spring (pode ser /api/auth/login etc)
    // e campo retornado (token) conforme sua implementação do Spring
    try {
      const resp = await api.post("/login", {
        username,
        password,
      });
      // Exemplo esperado: resp.data = { token: 'jwt...', user: { id, name, ... } }
      const { token, user: returnedUser } = resp.data;
      if (!token) throw new Error("token not returned from backend");

      // salvar e configurar axios
      localStorage.setItem("token", token);
      if (returnedUser) localStorage.setItem("user", JSON.stringify(returnedUser));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(returnedUser || { token });
      return { ok: true };
    } catch (err) {
      // devolve mensagem para UI tratar
      const message =
        err?.response?.data?.message || err.message || "Erro ao autenticar";
      return { ok: false, message };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
