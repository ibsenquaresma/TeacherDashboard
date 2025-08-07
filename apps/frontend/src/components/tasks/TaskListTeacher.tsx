'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/task';
import TaskItem from './TaskItem';

const TaskListTeacher = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tarefas Criadas</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa criada ainda.</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskListTeacher;
