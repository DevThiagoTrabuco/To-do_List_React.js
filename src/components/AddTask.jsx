import { useState } from "react";
import Input from "./Input";

function AddTask({ onAddTaskSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    function parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    const isDue = dueDate => {
        const today = new Date();
        const inputDate = new parseLocalDate(dueDate);
        today.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);
        return inputDate < today;
    }

    function clearForm() {
        setTitle('');
        setDescription('');
        setDueDate('');
    }

    function handleToggleForm() {
        if (!isFormVisible) {
            setIsFormVisible(true);
        } else {
            if (!title.trim() || !description.trim() || !dueDate.trim()) {
                return alert("Preencha todos os campos da tarefa.");
            } else if (isDue(dueDate)) {
                return alert("Data de conclusão inferior a data de hoje.");
            }
            onAddTaskSubmit(title, description, dueDate);
            clearForm();
            setIsFormVisible(false);
        }
    }

    return (
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
            <div className={isFormVisible ? 'flex flex-col gap-4' : 'hidden'}>
                <Input
                    type="text"
                    placeholder="Título da tarefa"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
                <Input
                    type="text"
                    placeholder="Descrição da tarefa"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} />
                <p className="text-slate-900 px-4 py-2">Data de conclusão</p>
                <Input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)} />
                <button
                    onClick={() => {
                        clearForm();
                        setIsFormVisible(false);
                    }}
                    className="bg-slate-500 outline-slate-400 px-4 py-2 rounded-md font-medium text-white hover:cursor-pointer">
                    Descartar
                </button>
            </div>
            <button
                onClick={() => handleToggleForm()}
                className="bg-slate-500 outline-slate-400 px-4 py-2 rounded-md font-medium text-white hover:cursor-pointer">
                {isFormVisible ? "Salvar tarefa" : "Adicionar tarefa"}
            </button>
        </div>
    );
}

export default AddTask;