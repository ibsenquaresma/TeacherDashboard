import { students } from "@/lib/students";

interface Props {
  selected: string;
  onChange: (id: string) => void;
}

const StudentSelect = ({ selected, onChange }: Props) => (
  <div>
    <label className="block font-semibold mb-1">Select student:</label>
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    >
      <option value="">-- Choose a student --</option>
      {students.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  </div>
);

export default StudentSelect;
