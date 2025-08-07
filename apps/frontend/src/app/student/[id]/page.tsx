'use client';
import StudentDetails from "@/components/students/StudentDetails";
import { useParams } from "next/navigation";

export default function StudentDetailsPage() {
  const params = useParams();
  const id = params.id;

  if (typeof id !== "string") {
    return <div>Invalid student ID</div>;
  }

  return (
    <div className="p-6">
      <StudentDetails studentId={id} />
    </div>
  );
}
