import { useState } from 'react';
import Input from './Input';

function EditTask({ onEditTaskSubmit, title: initialTitle, description: initialDescription, dueDate: initialDueDate, isFormHidden, setIsFormHidden }) {
    const [title, setTitle] = useState(initialTitle || "");
    const [description, setDescription] = useState(initialDescription || "");
    const [dueDate, setDueDate] = useState(initialDueDate || "");


    function parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function clearForm() {
        setTitle('');
        setDescription('');
        setDueDate('');
    }

    const today = new Date();
    const lastDay = dueDate ? parseLocalDate(dueDate) : today;
    const isDue = lastDay => {return lastDay.getDate() < today.getDate()};

    return (
        <div className={`space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col ${isFormHidden ? 'hidden' : ''}`}>
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
                    if (isDue(lastDay)) {
                        return alert("Data de conclusão inferior a data de hoje.");
                    }
                    onEditTaskSubmit(title, description, dueDate);
                    clearForm();
                    setIsFormHidden(true);
                }}
                className="bg-slate-500 outline-slate-400 px-4 py-2 rounded-md font-medium text-white hover:cursor-pointer">
                Finalizar edição
            </button>
        </div>
    )
}

export default EditTask;