"use client";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import MainLayout from "@/layouts/Layout";
import NextImage from "@/components/NextImage";
import PlanDetailCard from "./components/PlanDetailCard";
import useGetAllClass, {
  useAddPlanSetting,
  useDeletePlanSetting,
} from "./hooks/mutations";
import useGetPlanDetail from "./hooks/getDetail";
import { useParams } from "next/navigation";

type ClassItem = {
  id: string;
  name: string;
  dosen: string;
  date: string; // waktu
  dayName: string; // nama hari
  classroom: string;
};

export default function AddPlanningKelas() {
  const params = useParams();
  const planId = params.id as string;
  const { data: dataAllClass } = useGetAllClass();

  const { data: planDetailData, isLoading: isPlanLoading } =
    useGetPlanDetail(planId);

  const [searchTerm, setSearchTerm] = useState("");

  const classes: ClassItem[] = useMemo(() => {
    if (!dataAllClass) return [];
    return dataAllClass.map((item) => {
      const start = item.start_time.slice(0, 5);
      const end = item.end_time.slice(0, 5);

      const dayMap: Record<string, string> = {
        monday: "Senin",
        tuesday: "Selasa",
        wednesday: "Rabu",
        thursday: "Kamis",
        friday: "Jumat",
        saturday: "Sabtu",
        sunday: "Minggu",
      };

      const dayName = dayMap[item.day.toLowerCase()] || item.day;

      return {
        id: item.id,
        name: item.name,
        dosen: item.lecturer,
        classroom: item.classroom,
        dayName,
        date: `${start} - ${end}`,
      };
    });
  }, [dataAllClass]);

  // --- Filter classes berdasarkan search term ---
  const filteredClasses = useMemo(() => {
    if (!searchTerm) return classes;
    return classes.filter(
      (cls) =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.dosen.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [classes, searchTerm]);

  // --- Group classes by dayName ---
  const groupedClasses = useMemo(() => {
    const groups: Record<string, ClassItem[]> = {};
    filteredClasses.forEach((cls) => {
      if (!groups[cls.dayName]) groups[cls.dayName] = [];
      groups[cls.dayName].push(cls);
    });
    return groups;
  }, [filteredClasses]);

  // --- Helper untuk convert day dari planDetail (API) ke dayName bahasa Indonesia ---
  const convertDayToDayName = (day: string) => {
    const dayMap: Record<string, string> = {
      monday: "Senin",
      tuesday: "Selasa",
      wednesday: "Rabu",
      thursday: "Kamis",
      friday: "Jumat",
      saturday: "Sabtu",
      sunday: "Minggu",
    };
    return dayMap[day.toLowerCase()] || day;
  };

  const { mutate: addPlanSetting } = useAddPlanSetting();
  const { mutate: deletePlanSetting } = useDeletePlanSetting();
  const plannedClassIds = new Set(
    (planDetailData?.plan_settings ?? []).map((ps) => ps.class.id),
  );

  return (
    <MainLayout withNavbar withFooter={false}>
      <section className="px-[52px] py-[32px] overflow-x-hidden min-h-screen">
        <div className="flex justify-between -mr-[52px]  pb-10">
          {/* HEADER SECTION*/}
          <div className="flex flex-col gap-3">
            <Typography variant="h5" className="font-bold text-3xl">
              Kelas Semester 3
            </Typography>

            {/* SEARCH INPUT */}
            <div className="relative mb-4">
              <Search className="absolute top-1/2 right-3 h-5 w-5 text-gray-400 transform -translate-y-1/2" />
              <input
                type="text"
                className="block md:w-[450px] lg:w-[528px] w-full pl-4 pr-3 py-2 border-slate-900 bg-transparent text-black border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none  sm:text-sm"
                placeholder="Cari kelas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="w-2/5 relative hidden md:block">
            <NextImage
              src="/plan-detail/header-section.svg"
              alt="Image Description"
              width={500}
              height={500}
              className=" absolute md:-top-8 md:-right-10 lg:-top-10 lg:-right-32  w-full object-cover -z-10"
            />
          </div>
        </div>

        {/* CLASS DETAIL SECTION */}
        <div className="overflow-x-auto [transform:rotateX(180deg)] px-4 mt-6">
          <div className="flex flex-wrap gap-6 w-max [transform:rotateX(180deg)] pb-5">
            {Object.entries(groupedClasses).map(([dayName, classList]) => (
              <div
                key={dayName}
                className="flex flex-col gap-3 bg-white pt-3 min-w-[280px]"
              >
                <Typography variant="h5" className="font-bold mb-3 text-3xl">
                  {dayName}
                </Typography>

                {/* Tampilkan plan detail dengan status "on_plan" di atas <hr /> */}
                {isPlanLoading ? (
                  <Typography variant="p">Loading plan detail...</Typography>
                ) : (
                  (planDetailData?.plan_settings ?? [])
                    .filter(
                      (ps) => convertDayToDayName(ps.class.day) === dayName,
                    )
                    .map((ps) => (
                      <PlanDetailCard
                        key={ps.id}
                        id={ps.class.id}
                        name={ps.class.name}
                        dosen={ps.class.lecturer}
                        classroom={ps.class.classroom}
                        date={`${ps.class.start_time.slice(
                          0,
                          5,
                        )} - ${ps.class.end_time.slice(0, 5)}`}
                        status="on_plan"
                        OnClick={() => deletePlanSetting(ps.id)}
                      />
                    ))
                )}

                <hr className="border-2" />

                {/* Tampilkan kelas lainnya yang status "not_plan" */}
                {classList
                  .filter((cls) => !plannedClassIds.has(cls.id)) // hindari duplikat dengan on_plan
                  .map((cls) => (
                    <PlanDetailCard
                      key={cls.id}
                      {...cls}
                      status="not_plan"
                      OnClick={() =>
                        addPlanSetting({
                          plan_id: planId,
                          class_id: cls.id,
                        })
                      }
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
