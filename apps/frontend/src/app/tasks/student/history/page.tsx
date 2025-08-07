'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/task';

export default function StudentHistoryPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});
  const [responses, setResponses] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    const fb = localStorage.getItem('feedbacks');
    const rsp = localStorage.getItem('responses');

    if (stored) setTasks(JSON.parse(stored));
    if (fb) setFeedbacks(JSON.parse(fb));
    if (rsp) setResponses(JSON.parse(rsp));
  }, []);

  const completedTasks = tasks.filter((t) => responses[t.id]);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Histórico de Tarefas</h1>

      {completedTasks.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa concluída ainda.</p>
      ) : (
        completedTasks.map((task) => (
          <div key={task.id} className="bg-white shadow p-4 rounded space-y-2">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p><strong>Resposta:</strong> {responses[task.id]}</p>
            <p className="bg-green-100 text-green-800 p-2 rounded">
              <strong>Feedback:</strong> {feedbacks[task.id] || 'Aguardando avaliação...'}
            </p>
          </div>
        ))
      )}
    </main>
  );
}
