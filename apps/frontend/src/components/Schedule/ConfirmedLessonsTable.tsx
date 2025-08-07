'use client';

import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { ScheduledLesson } from "../../types/scheduleLesson";
import { students } from "@/lib/students";

interface Props {
  lessons: ScheduledLesson[];
  onDelete: (index: number) => void;
}

export default function ConfirmedLessonsTable({ lessons, onDelete }: Props) {
  const [filterStudent, setFilterStudent] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filtered = lessons.filter((lesson) => {
    const matchStudent = !filterStudent || lesson.studentId === filterStudent;
    const matchDate = !filterDate || lesson.date === filterDate;
    return matchStudent && matchDate;
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-10">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        📋 Confirmed Lessons
      </h3>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={filterStudent}
          onChange={(e) => setFilterStudent(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring-2 ring-blue-200"
        >
          <option value="">All Students</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring-2 ring-blue-200"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="overflow-auto">
          <table className="w-full text-sm text-left border">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="p-3">👤 Student</th>
                <th className="p-3">📆 Date</th>
                <th className="p-3">⏰ Time</th>
                <th className="p-3 text-center">❌</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lesson, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3">{lesson.studentName}</td>
                  <td className="p-3">{lesson.date}</td>
                  <td className="p-3">{lesson.time}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => onDelete(index)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No lessons found for the selected filters.</p>
      )}
    </div>
  );
}