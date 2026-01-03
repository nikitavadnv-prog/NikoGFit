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
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Dumbbell,
      label: "Упражнения",
      path: "/exercises",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      label: "Клиенты",
      path: "/clients",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: User,
      label: "Профиль",
      path: "/profile",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 mb-4 shadow-2xl">
            <span className="text-4xl font-bold text-white">NG</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">NGFit Pro</h1>
          <p className="text-gray-300 text-sm">Управление тренировками</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`h-32 flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br ${item.color} hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white font-semibold`}
              >
                <Icon size={32} />
                <span className="text-sm text-center">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-400 text-xs">
          <p>Версия 1.0.0</p>
          <p>Для использования в Telegram</p>
        </div>
      </div>
    </div>
  );
}
