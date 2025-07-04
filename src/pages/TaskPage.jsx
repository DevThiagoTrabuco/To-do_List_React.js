import { Calendar, ChevronLeftIcon, XIcon, CheckIcon, PencilIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import Title from "../components/Title";
import { useMemo, useState } from "react";
import EditTask from "../components/EditTask";
import Button from "../components/Button";

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
  
  const today = new Date();
  const lastDay = new parseLocalDate(task.dueDate);
  const formattedDate = lastDay.toLocaleDateString("pt-BR");
  const isDue = lastDay => {return lastDay.getDate() < today.getDate()};
  const isToday = lastDay => {return lastDay.getDate() === today.getDate()};
  
  let [isFormHidden, setIsFormHidden] = useState(true);
  function showOrHideForm() {
    isFormHidden = !isFormHidden;
    return setIsFormHidden(isFormHidden);
  }

  function onEditTaskSubmit(title, description, dueDate) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTasks = tasks.map(t => {
      if (String(t.id) === String(taskId)) {
        return {
          ...t,
          title,
          description,
          dueDate,
        };
      } else {
        return t;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    window.location.reload();
  }

  function updateTaskStatus() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTasks = tasks.map(t => {
      if (String(t.id) === String(taskId)) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      } else {
        return t;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    window.location.reload();
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

  return (
    <div className="max-w-screen min-h-screen bg-slate-500 flex justify-center p-6">
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
          <div className="flex justify-between">
            {task.isCompleted ? (
              <p className="text-green-700 mt-2">
                Tarefa concluída
              </p>
            ) : isToday(lastDay) ? (
              <p className="text-yellow-400 mt-2">
                Tarefa para hoje
              </p>
            ) : !isDue(lastDay) ? (
              <p className="text-blue-700 mt-2">
                Tarefa pendente
            </p>
            ) : (
              <p className="text-red-600 mt-2">
                Tarefa atrasada      
              </p>
            )}
            <div className=" flex gap-2">
              <Button
                onClick={() => updateTaskStatus()}>
                {task.isCompleted ?
                  <XIcon className="text-red-600" /> :
                  <CheckIcon className="text-green-700" />
                }
              </Button>
              <Button
                onClick={() => showOrHideForm()}>
                {isFormHidden ?
                  <PencilIcon className="text-black" /> :
                  <XIcon className="text-red-600" />
                }
              </Button>
            </div>
          </div>
        </div>
        <EditTask 
          onEditTaskSubmit={onEditTaskSubmit}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          isFormHidden={isFormHidden}
          setIsFormHidden={setIsFormHidden}
        />
      </div>
    </div>
  );
}

export default TaskPage;