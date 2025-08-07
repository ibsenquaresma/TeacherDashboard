import ScheduleLesson from "@/components/Schedule/ScheduleLesson";

const Schedule = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col h-full">
        <main className="p-6 overflow-auto flex-1 bg-gray-50">
          <ScheduleLesson />
        </main>
      </div>
    </div>
  );
};

export default Schedule;
