import {
  HomeIcon,
  UserIcon,
  BuildingStorefrontIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const menu = [
    { label: "Página Inicial", icon: HomeIcon, to: "/home" },
    { label: "República", icon: BuildingStorefrontIcon, to: "/republica" },
    { label: "Perfil", icon: UserIcon, to: "/perfil" },
  ];

  return (
    <>
    
      <button
        className="lg:hidden fixed top-4 cursor-pointer left-4 z-50 p-2 bg-white/30 backdrop-blur-xl rounded-xl shadow-lg border border-white/20"
        onClick={() => setOpen(true)}
      >
        <Bars3Icon className="w-7 text-green-700" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

    
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 
          bg-white/20 backdrop-blur-2xl 
          border-r border-white/30 
          shadow-[8px_0_30px_-10px_rgba(0,0,0,0.25)]
          flex flex-col justify-between p-6
          transition-transform duration-300 
          z-50
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        
        <button
          className="lg:hidden cursor-pointer absolute top-4 right-4 p-1"
          onClick={() => setOpen(false)}
        >
          <XMarkIcon className="w-7 text-green-700" />
        </button>

       
        <div className="flex flex-col items-center mb-10 select-none">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-400 p-[4px] shadow-xl">
            <div className="h-full w-full rounded-3xl bg-white flex items-center justify-center">
              <img src={logo} alt="logo" className="w-14" />
            </div>
          </div>

          <h1
            className="text-green-700 text-xl mt-4"
            style={{ fontFamily: "'BROSE', sans-serif" }}
          >
            RepúblicaEasy
          </h1>
        </div>

        <nav className="flex flex-col gap-4">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`
                  group flex items-center gap-4 px-5 py-3 rounded-xl 
                  relative overflow-hidden
                  transition-all duration-300 
                  ${
                    active
                      ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
                      : "text-gray-800 hover:bg-gray-100/60"
                  }
                `}
              >
                {!active && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-gray-200 to-white pointer-events-none"></div>
                )}

                <Icon
                  className={`w-6 z-10 ${
                    active ? "text-white" : "text-gray-700 group-hover:text-gray-900"
                  }`}
                />

                <span className="font-medium z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-white/40">
          <button
                onClick={logout}
                className="
                    w-full cursor-pointer flex items-center justify-center gap-3 
                    bg-red-600 text-white py-3 rounded-xl
                    font-semibold tracking-wide
                    hover:bg-red-700 transition-all duration-300
                    shadow-lg hover:shadow-red-300/40
                "
                >
                <ArrowRightOnRectangleIcon className="w-6" />
                Sair
            </button>
        </div>
      </aside>
    </>
  );
}
