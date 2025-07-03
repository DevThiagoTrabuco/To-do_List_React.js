import { Calendar, ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import Title from "../components/Title";
import { useMemo } from "react";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("id");

  const task = useMemo(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return tasks.find(t => String(t.id) === String(taskId));
  }, [taskId]);

  function parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

  const isDue = task => {
    const today = new Date();
    const dueDate = new parseLocalDate(task.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  }

  const isToday = task => {
    const today = new Date();
    const dueDate = new parseLocalDate(task.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  }

  function onBackClick() {
    navigate(-1);
  }

  if (!task) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-500">
        <div className="bg-white p-6 rounded shadow">Tarefa não encontrada.</div>
      </div>
    );
  }

  const formattedDate = new Date(task.dueDate).toLocaleDateString("pt-BR");

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={onBackClick}
            className="absolute left-0 top-0 bottom-0">
            <ChevronLeftIcon/>
          </button>
          <Title>Detalhes da Tarefa</Title>
        </div>

        <div className="bg-slate-200 p-4 rounded-md">
          <h2 className="text-xl text-slate-600 font-bold flex justify-between items-center">
            <span>{task.title}</span>
            <span className="flex items-center gap-2"><Calendar/>{formattedDate}</span>
          </h2>
          <p className="text-slate-600">{task.description}</p>
          {task.isCompleted ? (
            <p className="text-green-700 mt-2">
              Tarefa concluída
            </p>
          ) : isToday(task) ? (
            <p className="text-yellow-400 mt-2">
              Tarefa para hoje
            </p>
          ) : !isDue(task) ? (
            <p className="text-blue-700 mt-2">
              Tarefa pendente
           </p>
          ) : (
            <p className="text-red-600 mt-2">
              Tarefa atrasada      
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskPage;