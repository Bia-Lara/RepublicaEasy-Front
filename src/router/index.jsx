import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import RepublicaUser from "../pages/RepublicaUser/RepublicaUser"; 
import ProtectedRoute from "../components/ProtectedRoute";

import RegisterUser from "../pages/RegisterUser/RegisterUser";
import RegisterRepublica from "../pages/RegisterRepublica/RegisterRepublica";
import RepublicDetail from "../pages/RepublicDetail/RepublicDetail";
import Home from "../pages/Home/Home";

export default function Router() {
  return (
    <Routes>

    <Route path="/cadastro" element={<RegisterUser />} />
      <Route path="/cadastro-republica" element={<RegisterRepublica />} />

    <Route path="/login" element={<LoginPage />} />
      <Route
        path="/republicaUser"
        element={
          <ProtectedRoute>
            <RepublicaUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/republica/:id" 
        element={
          <ProtectedRoute>
            <RepublicDetail />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
