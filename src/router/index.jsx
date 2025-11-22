import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import RepublicUser from "../pages/RepublicUser/RepublicUser"; 
import ProtectedRoute from "../components/ProtectedRoute";

import RegisterUser from "../pages/RegisterUser/RegisterUser";
import RegisterRepublic from "../pages/RegisterRepublic/RegisterRepublic";
import RepublicDetail from "../pages/RepublicDetail/RepublicDetail";
import ProfilePage from "../pages/Profile/ProfilePage";
import Home from "../pages/Home/Home";

export default function Router() {
  return (
    <Routes>

    <Route path="/cadastro" element={<RegisterUser />} />
      <Route path="/cadastro-republica" element={<RegisterRepublic />} />

    <Route path="/login" element={<LoginPage />} />
      <Route
        path="/republicaUser"
        element={
          <ProtectedRoute>
            <RepublicUser />
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
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
