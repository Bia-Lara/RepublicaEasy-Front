import { useState } from "react";


export default function Tabs({ tabs }) {
    const [selected, setSelected] = useState(tabs[0]);


    return (
        <div className="flex bg-gray-300 rounded-xl p-1 mt-6">
            {tabs.map((tab) => (
            <button
                key={tab}
                onClick={() => setSelected(tab)}
                className={`w-1/2 py-2 rounded-xl font-medium transition ${
                selected === tab ? "bg-white" : "opacity-60"
                }`}
                >
                {tab}
            </button>
            ))}
        </div>
    );
}