'use client';

import { useState } from 'react';
import { Task, TaskType } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

const TaskCreateForm = () => {
  const [form, setForm] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    type: 'text',
    module: '',
    theme: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = { id: uuidv4(), ...form };
    const existing = JSON.parse(localStorage.getItem('tasks') || '[]');
    localStorage.setItem('tasks', JSON.stringify([...existing, newTask]));
    alert('Tarefa criada!');
    setForm({ title: '', description: '', dueDate: '', type: 'text', module: '', theme: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Nova Tarefa</h2>

      <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full p-2 border rounded" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" className="w-full p-2 border rounded" />
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full p-2 border rounded" required />
      <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="text">Texto</option>
        <option value="upload">Upload</option>
        <option value="multiple-choice">Múltipla Escolha</option>
      </select>
      <input name="module" value={form.module} onChange={handleChange} placeholder="Módulo" className="w-full p-2 border rounded" />
      <input name="theme" value={form.theme} onChange={handleChange} placeholder="Tema" className="w-full p-2 border rounded" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Salvar</button>
    </form>
  );
};

export default TaskCreateForm;
