import TaskCreateForm from "@/components/tasks/TaskCreateForm";
import TaskListTeacher from "@/components/tasks/TaskListTeacher";

export default function TasksPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Gerenciar Tarefas</h1>
      <TaskCreateForm />
      <TaskListTeacher />
    </main>
  );
}