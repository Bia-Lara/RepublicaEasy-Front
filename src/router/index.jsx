import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home"; 
import ProtectedRoute from "../components/ProtectedRoute";

import RegisterUser from "../pages/RegisterUser/RegisterUser";
import RegisterRepublica from "../pages/RegisterRepublica/RegisterRepublica";

export default function Router() {
  return (
    <Routes>

    <Route path="/cadastro" element={<RegisterUser />} />
      <Route path="/cadastro-republica" element={<RegisterRepublica />} />

    <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
