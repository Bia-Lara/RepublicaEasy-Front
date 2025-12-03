import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Tabs({ tabs }) {
  const navigate = useNavigate();
  const location = useLocation();

  const routeMap = {
    "Login": "/login",
    "Cadastro": "/cadastro",
    "República": "/cadastro-republica"
  };

  
  const detectTabFromRoute = () => {
    const current = Object.entries(routeMap).find(
      ([, route]) => route.toLowerCase() === location.pathname.toLowerCase()
    );
    return current ? current[0] : tabs[0]; 
  };

  const [selected, setSelected] = useState(detectTabFromRoute());

  
  useEffect(() => {
    setSelected(detectTabFromRoute());
  }, [location.pathname]);

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
