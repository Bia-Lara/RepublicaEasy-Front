export default function TaskList({ tarefas, onCreate, onEdit }) {
  return (
    <section
      className="
        bg-white/70 backdrop-blur-xl 
        border border-white/40 rounded-3xl shadow-xl p-8 mb-10
      "
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tarefas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {tarefas.map((t) => (
          <div
            key={t.id}
            className="
              bg-white rounded-2xl border border-gray-200 
              shadow-md p-4
            "
          >
            <h3 className="font-semibold text-gray-800">{t.titulo}</h3>
            <p className="text-gray-600 text-sm mb-3">{t.responsavel}</p>

            <button
              onClick={() => onEdit(t)}
              className="
                bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 text-sm 
                px-3 py-1 rounded-xl transition
              "
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onCreate}
        className="
          mt-2 px-6 py-3 cursor-pointer rounded-xl bg-gray-900 text-white 
          font-semibold shadow-md hover:brightness-110 transition
        "
      >
        Adicionar Tarefa
      </button>
    </section>
  );
}

