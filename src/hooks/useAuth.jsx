import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }

    setLoading(false);
  }, []);

  async function login({ email, password }) {
    try {
      const resp = await api.post(`${API_BASE}/api/v1/auth/login`, {
        email,
        password,
      });

      const token = resp.data.token;
      const user = resp.data.user;

      if (!token) throw new Error("Backend não retornou token");

      localStorage.setItem("token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setUser(user);

      return { ok: true };
    } catch (err) {
      let message = "Não foi possível realizar o login.";
      console.log(err);

      if (err.response?.status === 401 || err.response?.status === 403)
        message = "Email ou senha inválidos.";

      return { ok: false, message };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  }

  function updateUser(newUserData) {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,  
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
