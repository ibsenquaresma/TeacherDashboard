'use client';

import { useState } from "react";
import StudentRow from "./StudentRow";
import AddStudentModal from "./AddStudentModal";
import type { StudentRowProps } from "@/types/student";

const StudentTable = () => {
  const [students, setStudents] = useState<StudentRowProps[]>([
    { id: "1", name: "Alice Johnson", email: "alice@example.com", phone: "+15818499958" },
    { id: "2", name: "Bruno Silva", email: "bruno@example.com", phone: "5555555678" },
    { id: "3", name: "Camila Torres", email: "camila@example.com", phone: "5555555678" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleAddStudent = (newStudent: Omit<StudentRowProps, 'id'>) => {
    const studentWithId: StudentRowProps = {
      ...newStudent,
      id: Date.now().toString(),
    };
    setStudents((prev) => [...prev, studentWithId]);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Students</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          + Add Student
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow key={student.id} {...student} />
          ))}
        </tbody>
      </table>

      <AddStudentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddStudent}
      />
    </div>
  );
};

export default StudentTable;
