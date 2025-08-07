'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/task';

export default function StudentTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filtered, setFiltered] = useState<Task[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState({ module: '', theme: '' });

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    const storedResponses = localStorage.getItem('responses');
    const storedFeedbacks = localStorage.getItem('feedbacks');

    if (stored) {
      const parsed: Task[] = JSON.parse(stored);
      setTasks(parsed);
      setFiltered(parsed);
    }

    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }

    if (storedFeedbacks) {
      setFeedbacks(JSON.parse(storedFeedbacks));
    }
  }, []);

  useEffect(() => {
    const result = tasks.filter(
      (t) =>
        (!filters.module || (t.module || '').toLowerCase().includes(filters.module.toLowerCase())) &&
        (!filters.theme || (t.module || '').toLowerCase().includes(filters.module.toLowerCase()))
    );
    setFiltered(result);
  }, [filters, tasks]);

  const handleChange = (taskId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleSubmit = (taskId: string) => {
    const updatedResponses = { ...responses };
    const updatedFeedbacks = { ...feedbacks };

    updatedFeedbacks[taskId] = `Bom trabalho! Vamos revisar sua resposta sobre "${tasks.find(t => t.id === taskId)?.theme}" em nossa próxima aula.`;

    setFeedbacks(updatedFeedbacks);
    setResponses(updatedResponses);

    localStorage.setItem('responses', JSON.stringify(updatedResponses));
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Minhas Tarefas</h1>

      <div className="flex gap-4 mb-4">
        <input
          placeholder="Filtrar por módulo..."
          className="p-2 border rounded w-1/2"
          value={filters.module}
          onChange={(e) => setFilters({ ...filters, module: e.target.value })}
        />
        <input
          placeholder="Filtrar por tema..."
          className="p-2 border rounded w-1/2"
          value={filters.theme}
          onChange={(e) => setFilters({ ...filters, theme: e.target.value })}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
      ) : (
        filtered.map((task) => {
          const answered = !!responses[task.id];

          return (
            <div key={task.id} className="bg-white shadow p-4 rounded space-y-2">
              <h2 className="font-semibold text-lg flex justify-between items-center">
                {task.title}
                <span className={`text-sm px-2 py-1 rounded ${answered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
                  {answered ? 'Concluído' : 'Pendente'}
                </span>
              </h2>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm">
                <strong>Módulo:</strong> {task.module} | <strong>Tema:</strong> {task.theme}
              </p>

              <textarea
                placeholder="Sua resposta..."
                className="w-full p-2 border rounded mt-2"
                value={responses[task.id] || ''}
                onChange={(e) => handleChange(task.id, e.target.value)}
              />

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                onClick={() => handleSubmit(task.id)}
              >
                Enviar Resposta
              </button>

              {feedbacks[task.id] && (
                <p className="mt-2 text-green-700 font-medium bg-green-100 p-2 rounded">
                  💬 Feedback: {feedbacks[task.id]}
                </p>
              )}
            </div>
          );
        })
      )}
    </main>
  );
}
