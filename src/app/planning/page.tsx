"use client";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CardPlanning from "./components/CardPlanning";
import TambahPlanModal from "./components/AddModal";
import { usePlansByWorkspaceQuery, useWorkspaceQuery } from "./hooks/mutation";
import MainLayout from "@/layouts/Layout";
import Navbar from "@/layouts/Navbar";

export default function PlanningKelas() {
  const [open, setOpen] = useState(false);

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(
    null,
  );

  const { data: plansData } = usePlansByWorkspaceQuery(
    selectedWorkspaceId ?? "",
  );

  const classes = plansData?.data ?? [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClasses = useMemo(() => {
    if (!searchTerm) return classes;
    return classes.filter((cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [classes, searchTerm]);

  const { data: workspaceListData } = useWorkspaceQuery();

  useEffect(() => {
    const storedId = localStorage.getItem("selectedWorkspaceId");
    if (storedId && !selectedWorkspaceId) {
      setSelectedWorkspaceId(storedId);
    } else if (!storedId && workspaceListData?.data?.length) {
      setSelectedWorkspaceId(workspaceListData.data[0].id);
      localStorage.setItem("selectedWorkspaceId", workspaceListData.data[0].id);
    }
  }, [workspaceListData, selectedWorkspaceId]);

  return (
    <MainLayout withFooter={false} withNavbar>
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
              {classes.map((card) => (
                <CardPlanning key={card.id} {...card} />
              ))}
              {classes.length === 0 && (
                <div className="text-center py-4 text-gray-500 col-span-full"></div>
              )}

              {/* Create New Class Button */}
              <div className="min-h-[132px]">
                <Button
                  variant="slate"
                  leftIcon={Plus}
                  leftIconClassName="h-5 w-5"
                  className="flex w-full h-full items-center justify-center"
                  onClick={() => setOpen(true)}
                >
                  Buat Plan Baru
                </Button>
                <TambahPlanModal open={open} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
