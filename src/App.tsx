import PlanningCalendar from "@/components/calendar/PlanningCalendar";
import planningData from "@/out/planning.json";

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      <main className="flex-1 p-2 sm:p-4 overflow-hidden h-full">
          <PlanningCalendar events={planningData} />
      </main>
    </div>
  );
}

export default App;
