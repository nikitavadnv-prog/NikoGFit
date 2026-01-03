import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  age: string;
}

export default function Profile() {
  const [, navigate] = useLocation();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    age: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ngfit_profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("ngfit_profile", JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen w-full p-4 relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-3xl font-bold text-white">Профиль</h1>
        </div>

        {/* Profile Card */}
        <Card className="bg-white/95 backdrop-blur p-8 rounded-2xl">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {profile.name ? profile.name[0].toUpperCase() : "U"}
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Имя
              </label>
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="bg-gray-50"
                />
              ) : (
                <p className="text-lg text-gray-900 font-semibold">
                  {profile.name || "Не указано"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="bg-gray-50"
                />
              ) : (
                <p className="text-gray-600">{profile.email || "Не указано"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Возраст
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={profile.age}
                  onChange={(e) =>
                    setProfile({ ...profile, age: e.target.value })
                  }
                  className="bg-gray-50"
                />
              ) : (
                <p className="text-gray-600">{profile.age || "Не указано"}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">0</p>
              <p className="text-xs text-gray-600 mt-1">Тренировок</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">0</p>
              <p className="text-xs text-gray-600 mt-1">Упражнений</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">0</p>
              <p className="text-xs text-gray-600 mt-1">Клиентов</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            {isEditing ? (
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
                >
                  Сохранить
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold"
              >
                Редактировать профиль
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
