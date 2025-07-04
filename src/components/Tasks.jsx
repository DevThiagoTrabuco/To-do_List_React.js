import {
  AlarmClock,
  CheckIcon,
  ChevronRightIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("id", task.id);
    navigate(`/task?${query.toString()}`);
  }

  function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const isDue = (task) => {
    const today = new Date();
    const dueDate = new parseLocalDate(task.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const isToday = (task) => {
    const today = new Date();
    const dueDate = new parseLocalDate(task.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  };

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className="bg-slate-400 w-full p-2 text-white rounded-md text-left hover:cursor-pointer"
          >
            {task.title}
          </button>
          <Button>
            {task.isCompleted ? (
              <CheckIcon className="text-green-700" />
            ) : isToday(task) ? (
              <AlarmClock className="text-yellow-400" />
            ) : !isDue(task) ? (
              <AlarmClock className="text-blue-500" />
            ) : (
              <XIcon className="text-red-600" />
            )}
          </Button>
          <Button onClick={() => onSeeDetailsClick(task)}>
            <ChevronRightIcon />
          </Button>
          <Button onClick={() => onDeleteTaskClick(task.id)}>
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
