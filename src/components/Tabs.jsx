import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tabs({ tabs }) {
  const [selected, setSelected] = useState(tabs[0]);
  const navigate = useNavigate();

  // Mapeamento das rotas por nome da aba
  const routeMap = {
    "Login": "/login",
    "Cadastro": "/cadastro",
    "República": "/cadastro-republica"
  };

  const handleClick = (tab) => {
    setSelected(tab);
    const route = routeMap[tab];
    if (route) navigate(route);
  };

  return (
    <div className="flex bg-gray-300 rounded-xl p-1 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={`w-1/2 py-2 cursor-pointer rounded-xl font-medium transition ${
            selected === tab ? "bg-white" : "opacity-60"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}