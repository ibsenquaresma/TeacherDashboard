'use client';

interface Props {
  times: string[];
  onSelect: (time: string) => void;
  selected: string | null;
}

const TimeSlots = ({ times, onSelect, selected }: Props) => (
  <div className="grid grid-cols-2 gap-3 mt-4">
    {times.map((time) => (
      <button
        key={time}
        onClick={() => onSelect(time)}
        className={`py-2 px-4 rounded border ${
          selected === time ? "bg-blue-600 text-white" : "bg-white"
        }`}
      >
        {time}
      </button>
    ))}
  </div>
);

export default TimeSlots;
