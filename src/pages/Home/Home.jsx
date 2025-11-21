import Sidebar from "../../components/Sidebar";
import CreateRepublicForm from "../../components/CreateRepublicForm";
import RepublicList from "../../components/RepublicList";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  const hasRepublic = !!user?.republicId;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <main
        className="
          flex-1 flex justify-center px-4 md:px-10 py-10 
          ml-72   /* Compensa a sidebar fixa */
        "
      >
        <div className="w-full max-w-5xl">
          
          {hasRepublic ? (
            <RepublicList user={user} />
          ) : (
            <CreateRepublicForm />
          )}
        </div>
      </main>
    </div>
  );
}
