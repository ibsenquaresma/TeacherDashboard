import type { StatCardProps } from "../types/statCard";

const StatCard = ({ title, value, color = "bg-blue-100" }: StatCardProps) => (
  <div className={`p-4 rounded-xl shadow ${color}`}>
    <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatCard;
