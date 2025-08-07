'use client';

import { useState } from "react";

interface Props {
  onDateSelect: (date: string) => void;
}

const Calendar = ({ onDateSelect }: Props) => {
  const [selected, setSelected] = useState("");

  const today = new Date();
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <div className="space-y-2">
      {dates.map((date) => {
        const d = date.toISOString().split("T")[0];
        return (
          <button
            key={d}
            onClick={() => {
              setSelected(d);
              onDateSelect(d);
            }}
            className={`block w-full text-left px-4 py-2 rounded ${
              selected === d ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {date.toDateString()}
          </button>
        );
      })}
    </div>
  );
};

export default Calendar;
