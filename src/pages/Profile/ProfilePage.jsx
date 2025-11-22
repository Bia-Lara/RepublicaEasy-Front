import Sidebar from "../../components/Sidebar";
import ProfileCard from "../../components/Profiles/ProfileCard";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <main
        className="
          flex-1 flex justify-center px-4 md:px-10 py-10 
          ml-72
        "
      >
        <div className="w-full max-w-5xl animate-fadeIn">

          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Olá, <span className="text-green-700">{user?.name}</span>!
          </h1>

          <h2 className="text-3xl font-bold text-green-900 mb-8">
            Editar Dados
          </h2>

          <ProfileCard user={user} />
        </div>
      </main>
    </div>
  );
}
