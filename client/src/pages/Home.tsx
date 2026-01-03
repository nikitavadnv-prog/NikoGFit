import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Dumbbell, Calendar, User } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();

  const menuItems = [
    {
      icon: Calendar,
      label: "Расписание",
      path: "/schedule",
      color: "from-slate-700 to-slate-800",
    },
    {
      icon: Dumbbell,
      label: "Упражнения",
      path: "/exercises",
      color: "from-slate-700 to-slate-800",
    },
    {
      icon: Users,
      label: "Клиенты",
      path: "/clients",
      color: "from-slate-700 to-slate-800",
    },
    {
      icon: User,
      label: "Профиль",
      path: "/profile",
      color: "from-slate-700 to-slate-800",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`h-32 flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br ${item.color} hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white font-semibold hover:from-slate-800 hover:to-slate-900`}
              >
                <Icon size={32} />
                <span className="text-sm text-center">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
