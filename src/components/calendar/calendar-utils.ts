export interface PlanningEvent {
  id: string;
  start: string;
  end: string;
  title: string;
  room?: string;
  subject?: string;
  courseType?: string;
  teacher?: string;
}

export const getEventStyles = (type: string | undefined) => {
  const t = (type || "").toUpperCase();

  if (
    t.includes("EXAM") ||
    t.includes("DS") ||
    t.includes("PARTIEL") ||
    t.includes("INTERRO") ||
    t.includes("CC")
  )
    return {
      bg: "bg-rose-500",
      border: "border-rose-600",
      light: "bg-rose-50 text-rose-700",
    };

  if (t.includes("TP"))
    return {
      bg: "bg-orange-500",
      border: "border-orange-600",
      light: "bg-orange-50 text-orange-700",
    };

  if (t.includes("TD"))
    return {
      bg: "bg-blue-500",
      border: "border-blue-600",
      light: "bg-blue-50 text-blue-700",
    };

  if (t.includes("CM"))
    return {
      bg: "bg-violet-500",
      border: "border-violet-600",
      light: "bg-violet-50 text-violet-700",
    };

  if (t.includes("AUTO"))
    return {
      bg: "bg-emerald-500",
      border: "border-emerald-600",
      light: "bg-emerald-50 text-emerald-700",
    };

  return {
    bg: "bg-slate-500",
    border: "border-slate-600",
    light: "bg-slate-50 text-slate-700",
  };
};
