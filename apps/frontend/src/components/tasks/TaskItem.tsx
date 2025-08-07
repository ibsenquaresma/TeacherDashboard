'use client';

import { Task } from '@/types/task';
import { useState } from 'react';

const TaskItem = ({ task }: { task: Task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    const updated = JSON.parse(localStorage.getItem('tasks') || '[]').filter((t: Task) => t.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.location.reload();
  };

  const handleSave = () => {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updated = tasks.map((t) => (t.id === task.id ? form : t));
    localStorage.setItem('tasks', JSON.stringify(updated));
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded bg-gray-100 space-y-2">
      {isEditing ? (
        <>
          <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full p-2 border rounded" />
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Salvar</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold text-lg">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm"><strong>Prazo:</strong> {task.dueDate}</p>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Excluir</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
