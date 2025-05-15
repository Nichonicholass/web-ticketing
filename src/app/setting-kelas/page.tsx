"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import withAuth from "@/components/hoc/withAuth";
import MainLayout from "@/layouts/Layout";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import TambahKelasModal from "./components/AddModal";
import CardSetting from "./components/CardSetting";

type ClassItem = {
  id: string;
  name: string;
  dosen: string;
  date: string;
  description?: string;
};

export default withAuth(SettingKelas, "user");
function SettingKelas() {
  const [open, setOpen] = useState(false);
  //   === DUMMY DATA ===
  const [classes] = useState<ClassItem[]>([
    {
      id: "1",
      name: "PWEB F",
      dosen: "Ir. M.M. Irfan Subakti, S.Kom., M.Sc.Eng., M.Phil., IPM ",
      date: "Kamis, 13.00 -15.00",
    },
    {
      id: "2",
      name: "PWEB A",
      dosen: "Nicho",
      date: "Kamis, 13.00 -15.00",
    },
    {
      id: "3",
      name: "Chemistry Basics",
      dosen: "Sadam",
      date: "Kamis, 13.00 -15.00",
    },
    {
      id: "4",
      name: "Biology Fundamentals",
      dosen: "Rayhan",
      date: "Kamis, 13.00 -15.00",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // === FILTER FUNCTION
  const filteredClasses = useMemo(() => {
    if (!searchTerm) return classes;
    return classes.filter(
      (cls) =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.dosen.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [classes, searchTerm]);

  return (
    <MainLayout withNavbar withFooter={false}>
      <section className="bg-gray-100 min-h-screen ">
        <div className="mx-auto px-6 py-6 lg:px-14 lg:py-8 bg-white rounded-lg shadow-sm mb-4">
          <Typography
            font="Poppins"
            variant="h4"
            weight="bold"
            className="text-5xl mb-4"
          >
            Setting Kelas
          </Typography>

          {/* DESCRIPTION SECTION */}
          <div className="relative mb-8 py-14 bg-[#0F172A] text-white p-4 rounded-lg flex flex-col lg:flex-row overflow-hidden">
            <div className="relative w-2/5">
              <NextImage
                src="/seting-kelas/header-section.png"
                alt="Image Description"
                width={600}
                height={600}
                className="hidden md:block w-full absolute -top-36 -left-4 object-cover"
              />
            </div>

            <div className="md:w-3/5 pl-4">
              <Typography
                font="Poppins"
                variant="h4"
                weight="bold"
                className="text-2xl mb-2 text-white"
              >
                Atur Kelas yang Kamu Mau!
              </Typography>
              <Typography
                font="Poppins"
                variant="p"
                weight="regular"
                className="text-lg mb-2 text-white"
              >
                Tambahkan, Ubah, Sesuaikan kelas semaumu.
              </Typography>
            </div>
          </div>

          {/* SEARCH BAR AND CLASSES SECTION */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Typography
                font="Poppins"
                variant="t"
                weight="bold"
                className="text-lg text-black"
              >
                Semua Kelas
              </Typography>
            </div>

            {/* SEARCH BAR */}
            <div className="relative mb-6 flex flex-col lg:flex-row lg:justify-between">
              <div className="relative ">
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 mb-4 text-black border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Cari kelas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Search className="absolute top-2 left-2 h-5 w-5 text-gray-400" />

              {/* Create New Class Button */}
              <div className="">
                <Button
                  variant="slate"
                  leftIcon={Plus}
                  leftIconClassName="h-5 w-5"
                  className="flex w-full lg:justify-end justify-normal"
                  onClick={() => setOpen(true)}
                >
                  Buat Kelas Baru
                </Button>
                <TambahKelasModal open={open} setOpen={setOpen} />
              </div>
            </div>

            {/* FILTERED CLASSES LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredClasses.map((card) => (
                <CardSetting key={card.id} {...card} />
              ))}
              {filteredClasses.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Tidak ada kelas yang ditemukan
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
