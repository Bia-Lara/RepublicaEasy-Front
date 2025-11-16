import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(rawUser ? JSON.parse(rawUser) : { token }); 
    }
    setLoading(false);
  }, []);

  async function login({ email, password }) {
    try {
      const resp = await api.post("/api/v1/auth/login", {
        email,
        password,
      });

      const { token, user: returnedUser } = resp.data;
      if (!token) throw new Error("token not returned from backend");

      localStorage.setItem("token", token);
      if (returnedUser) localStorage.setItem("user", JSON.stringify(returnedUser));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(returnedUser || { token });
      return { ok: true };
    } catch (err) {
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
