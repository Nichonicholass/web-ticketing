"use client";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import CardPlanning from "./components/CardPlanning";

type ClassItem = {
  id: string;
  name: string;
  departement: string;
};

export default function PlanningKelas() {
  const [open, setOpen] = useState(false);
  //   === DUMMY DATA ===
  const [classes] = useState<ClassItem[]>([
    {
      id: "1",
      name: "PWEB F",
      departement: "Teknik Informatika",
    },
    {
      id: "2",
      name: "PWEB A",
      departement: "Teknik Informatika",
    },
    {
      id: "3",
      name: "Chemistry Basics",
      departement: "Teknik Informatika",
    },
    {
      id: "4",
      name: "Biology Fundamentals",
      departement: "Teknik Informatika",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // === FILTER FUNCTION
  const filteredClasses = useMemo(() => {
    if (!searchTerm) return classes;
    return classes.filter(
      (cls) =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.departement.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [classes, searchTerm]);

  return (
    <main className=" min-h-screen">
      <div className="mx-auto px-6 py-6 lg:px-14 lg:py-8 mb-4">
        <div className="flex flex-col">
          <Typography
            font="Poppins"
            variant="h4"
            weight="bold"
            className="text-5xl "
          >
            Semua Planning Kelas
          </Typography>
          <div className="flex justify-between items-center mb-8">
            <Typography
              font="Poppins"
              variant="t"
              weight="semibold"
              className="text-lg text-slate-700"
            >
              Created by you
            </Typography>
          </div>
        </div>

        {/* SEARCH BAR AND CLASSES SECTION */}
        <div className="mb-8">
          {/* SEARCH BAR */}
          <div className="relative mb-6 flex flex-col lg:flex-row lg:justify-between">
            <div className="relative ">
              <input
                type="text"
                className="block min-w-[592px] w-full pl-10 pr-3 py-2 mb-4 text-black border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Cari kelas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Search className="absolute top-2 left-2 h-5 w-5 text-gray-400" />
          </div>

          {/* FILTERED CLASSES LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClasses.map((card) => (
              <CardPlanning key={card.id} {...card} />
            ))}
            {filteredClasses.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                Tidak ada kelas yang ditemukan
              </div>
            )}

            {/* Create New Class Button */}
            <Button
              variant="slate"
              leftIcon={Plus}
              leftIconClassName="h-5 w-5"
              className="flex w-full h-full justify-center"
            >
              Buat Plan Baru
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
