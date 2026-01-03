import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trash2, Edit2, Clock } from "lucide-react";

interface ScheduleItem {
  id: string;
  time: string;
  name: string;
  duration: string;
  description: string;
}

export default function Schedule() {
  const [, navigate] = useLocation();
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [formData, setFormData] = useState({
    time: "",
    name: "",
    duration: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load schedule from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ngfit_schedule");
    if (saved) {
      setSchedule(JSON.parse(saved));
    }
  }, []);

  // Save schedule to localStorage
  const saveSchedule = (newSchedule: ScheduleItem[]) => {
    setSchedule(newSchedule);
    localStorage.setItem("ngfit_schedule", JSON.stringify(newSchedule));
  };

  const handleAddItem = () => {
    if (!formData.time || !formData.name || !formData.duration) {
      alert("Заполните обязательные поля");
      return;
    }

    if (editingId) {
      const updated = schedule.map((s) =>
        s.id === editingId ? { ...s, ...formData } : s
      );
      saveSchedule(updated);
      setEditingId(null);
    } else {
      const newItem: ScheduleItem = {
        id: Date.now().toString(),
        ...formData,
      };
      saveSchedule([...schedule, newItem]);
    }

    setFormData({
      time: "",
      name: "",
      duration: "",
      description: "",
    });
  };

  const handleEdit = (item: ScheduleItem) => {
    setFormData({
      time: item.time,
      name: item.name,
      duration: item.duration,
      description: item.description,
    });
    setEditingId(item.id);
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить из расписания?")) {
      saveSchedule(schedule.filter((s) => s.id !== id));
    }
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
          <h1 className="text-3xl font-bold text-white">Расписание</h1>
        </div>

        {/* Form */}
        <Card className="bg-white/95 backdrop-blur p-6 mb-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            {editingId ? "Редактировать" : "Добавить тренировку"}
          </h2>

          <div className="space-y-3">
            <Input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="bg-gray-50"
            />
            <Input
              placeholder="Название тренировки"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-50"
            />
            <Input
              placeholder="Длительность (например: 60 мин)"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="bg-gray-50"
            />
            <textarea
              placeholder="Описание (опционально)"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm resize-none"
              rows={3}
            />

            <Button
              onClick={handleAddItem}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold"
            >
              {editingId ? "Сохранить" : "Добавить"}
            </Button>
          </div>
        </Card>

        {/* Schedule List */}
        <div className="space-y-3">
          {schedule.length === 0 ? (
            <Card className="bg-white/95 backdrop-blur p-8 text-center rounded-2xl">
              <Clock className="mx-auto mb-3 text-gray-400" size={32} />
              <p className="text-gray-600">Расписание пусто</p>
            </Card>
          ) : (
            schedule
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((item) => (
                <Card
                  key={item.id}
                  className="bg-white/95 backdrop-blur p-4 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-blue-600">
                          {item.time}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {item.duration}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Edit2 size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
