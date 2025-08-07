'use client';

import { useState } from "react";

type Props = {
  studentId: string;
};

type Lesson = {
  id: number;
  date: string;
  topic: string;
  notes?: string;
};

const StudentDetails = ({ studentId }: Props) => {
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 1, date: "2025-05-10", topic: "Past Simple" },
    { id: 2, date: "2025-05-14", topic: "Future Continuous" },
  ]);

  const [newLesson, setNewLesson] = useState({ date: "", topic: "", notes: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const [student, setStudent] = useState({
    name: "John Smith",
    email: "john@example.com",
  });

  const [editableStudent, setEditableStudent] = useState(student);
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = () => {
    if (!newLesson.date || !newLesson.topic) return;
    const newEntry: Lesson = {
      id: Date.now(),
      date: newLesson.date,
      topic: newLesson.topic,
      notes: newLesson.notes,
    };
    setLessons([...lessons, newEntry]);
    setNewLesson({ date: "", topic: "", notes: "" });
  };

  const handleEdit = (id: number) => {
    const lesson = lessons.find((l) => l.id === id);
    if (lesson) {
      setNewLesson({ date: lesson.date, topic: lesson.topic, notes: lesson.notes ?? "" });
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (editingId === null) return;
    setLessons((prev) =>
      prev.map((l) => (l.id === editingId ? { ...l, ...newLesson } : l))
    );
    setEditingId(null);
    setNewLesson({ date: "", topic: "", notes: "" });
  };

  const handleDelete = (id: number) => {
    setLessons(lessons.filter((l) => l.id !== id));
  };

  const updateStudent = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/students/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableStudent),
      });

      if (!res.ok) throw new Error("Erro ao atualizar");

      setStudent(editableStudent);
      setIsEditingStudent(false);
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      alert("Erro ao salvar aluno.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-2">Student Info</h2>
        {isEditingStudent ? (
          <div className="space-y-2">
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={editableStudent.name}
              onChange={(e) =>
                setEditableStudent({ ...editableStudent, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              className="border p-2 rounded w-full"
              value={editableStudent.email}
              onChange={(e) =>
                setEditableStudent({ ...editableStudent, email: e.target.value })
              }
              placeholder="Email"
            />
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={updateStudent}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setIsEditingStudent(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <button
              className="mt-2 text-blue-600 hover:underline"
              onClick={() => {
                setEditableStudent(student);
                setIsEditingStudent(true);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Lesson History</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="date"
            className="border p-2 rounded flex-1"
            value={newLesson.date}
            onChange={(e) => setNewLesson({ ...newLesson, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Topic"
            className="border p-2 rounded flex-1"
            value={newLesson.topic}
            onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })}
          />
          <input
            type="text"
            placeholder="Notes"
            className="border p-2 rounded flex-1"
            value={newLesson.notes}
            onChange={(e) => setNewLesson({ ...newLesson, notes: e.target.value })}
          />
          {editingId ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>
              Update
            </button>
          ) : (
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAdd}>
              Add
            </button>
          )}
        </div>

        <table className="w-full border table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-2 py-2">Date</th>
              <th className="border px-2 py-2">Topic</th>
              <th className="border px-2 py-2">Notes</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td className="border px-2 py-1">{lesson.date}</td>
                <td className="border px-2 py-1">{lesson.topic}</td>
                <td className="border px-2 py-1">{lesson.notes}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => handleEdit(lesson.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lesson.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No lessons recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
