"use client";

import Typography from "@/components/Typography";
import MainLayout from "@/layouts/Layout";
import PlanDetailCard from "./components/PlanDetailCard";
import NextImage from "@/components/NextImage";
import Button from "@/components/buttons/Button";
import { RiSave3Line } from "react-icons/ri";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useMemo, useState } from "react";
import useGetMe from "../dashboard/hooks/useGetMe";
import { Search } from "lucide-react";

function ClassDetail() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dummyData = [
    {
      hari: "Senin",
      plans: [
        {
          id: "1",
          name: "PWEB F",
          dosen: "Ir. M.M. Irfan Subakti, S.Kom., M.Sc.Eng., M.Phil., IPM",
          date: "Senin, 08.00 - 10.00",
        },
        {
          id: "2",
          name: "ASD A",
          dosen: "Dr. Eng. Mochamad Hariadi, S.T., M.Sc.",
          date: "Senin, 10.00 - 12.00",
        },
      ],
    },
    {
      hari: "Selasa",
      plans: [
        {
          id: "3",
          name: "Basis Data M",
          dosen: "Dr. Riza Satria Perdana, S.Kom., M.T.",
          date: "Selasa, 13.00 - 15.00",
        },
        {
          id: "4",
          name: "Matematika Diskrit C",
          dosen: "Dr. Fitri Utaminingrum, S.Si., M.Si.",
          date: "Selasa, 15.00 - 17.00",
        },
      ],
    },
    {
      hari: "Rabu",
      plans: [
        {
          id: "5",
          name: "Sistem Operasi B",
          dosen: "Dr. T.A. Fauzi, S.Kom., M.Comp.Sc.",
          date: "Rabu, 09.00 - 11.00",
        },
      ],
    },
    {
      hari: "Kamis",
      plans: [
        {
          id: "6",
          name: "Sistem Operasi F",
          dosen: "Dr. T.A. Fauzi, S.Kom., M.Comp.Sc.",
          date: "Rabu, 09.00 - 11.00",
        },
      ],
    },
    {
      hari: "Jumat",
      plans: [
        {
          id: "7",
          name: "Sistem Operasi A",
          dosen: "Dr. T.A. Fauzi, S.Kom., M.Comp.Sc.",
          date: "Rabu, 09.00 - 11.00",
        },
      ],
    },
  ];

  const { data: me } = useGetMe();

  // === FILTER FUNCTION
  const filteredClasses = useMemo(() => {
    if (!searchTerm) return dummyData;

    return dummyData
      .map((day) => {
        const filteredPlans = day.plans.filter((plan) =>
          plan.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        return {
          ...day,
          plans: filteredPlans,
        };
      })
      .filter((day) => day.plans.length > 0);
  }, [dummyData, searchTerm]);

  return (
    <MainLayout withNavbar withFooter={false}>
      <section className="px-[52px] py-[32px] overflow-x-hidden min-h-screen">
        <div className="flex justify-between -mr-[52px] border-b-2 border-slate-400 pb-10">
          {/* HEADER SECTION*/}
          <div className="flex flex-col gap-3">
            <Typography variant="h5" className="font-bold text-3xl">
              Kelas Semester 3
            </Typography>
            <Typography variant="p" className="text-slate-700">
              Created by {me?.personal_info.username}
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
        {/* TODO INTEGRATING WITH PLAN DETAIL API */}
        <div className="overflow-x-auto [transform:rotateX(180deg)]">
          <div className="flex flex-wrap gap-6 w-max [transform:rotateX(180deg)] pb-5">
            {filteredClasses.map((day) => (
              <div
                key={day.hari}
                className="flex flex-col gap-3 bg-white pt-3 min-w-[280px]"
              >
                <Typography variant="h5" className="font-bold mb-3 text-3xl">
                  {day.hari}
                </Typography>
                {day.plans.map((plan) => (
                  <PlanDetailCard
                    key={plan.id}
                    id={plan.id}
                    kelas={plan.name}
                    dosen={plan.dosen}
                    date={plan.date}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON SIMPAN PERUBAHAN */}
        <Button
          className="fixed bottom-6 right-6 bg-slate-900 border-slate-900 px-[48px] py-[8px] hover:bg-slate-800 active:bg-slate-700"
          leftIcon={RiSave3Line}
          onClick={() => {
            setOpen(true);
          }}
        >
          Simpan Perubahan
        </Button>
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          title="Yakin Merubah Plan"
          description="Perubahan planning kelas akan dirubah, yakin akan merubahnya?"
          cancelbutton="Batal"
          acceptbutton="Ya, Yakin"
        />
      </section>
    </MainLayout>
  );
}

export default ClassDetail;
