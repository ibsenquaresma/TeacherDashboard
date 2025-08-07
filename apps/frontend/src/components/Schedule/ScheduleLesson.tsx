'use client';

import { useState } from "react";
import Calendar from "./Calendar";
import TimeSlots from "./TimeSlots";
import ConfirmedLessonsTable from "./ConfirmedLessonsTable";
import type { ScheduledLesson } from "../../types/scheduleLesson";
import StudentSelect from "../students/StudentSelect";
import { students } from "@/lib/students";
import { availableTimes } from "@/lib/availableTimes";

export default function ScheduleLesson() {
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [lessons, setLessons] = useState<ScheduledLesson[]>([]);

  const selectedStudent = students.find((s) => s.id === studentId);

  const handleConfirm = () => {
    if (studentId && date && time) {
      const newLesson: ScheduledLesson = {
        studentId,
        studentName: selectedStudent?.name || "",
        date,
        time,
      };
      setLessons((prev) => [...prev, newLesson]);
      setStudentId("");
      setDate("");
      setTime(null);
    }
  };

  const handleDelete = (indexToDelete: number) => {
    setLessons((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📅 Schedule a Lesson
      </h2>

      <div className="space-y-8">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <StudentSelect selected={studentId} onChange={setStudentId} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">1. Choose a date</h3>
            <Calendar onDateSelect={setDate} />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">2. Choose a time</h3>
            {date ? (
              <TimeSlots
                times={availableTimes[date] || []}
                selected={time}
                onSelect={setTime}
              />
            ) : (
              <p className="text-gray-500">Please select a date first.</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleConfirm}
            disabled={!studentId || !date || !time}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow transition disabled:opacity-50"
          >
            ✅ Confirm Lesson
          </button>
        </div>

        <ConfirmedLessonsTable lessons={lessons} onDelete={handleDelete} />
      </div>
    </div>
  );
}
