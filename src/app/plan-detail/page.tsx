"use client";

import Typography from "@/components/Typography";
import SearchInput from "@/components/ui/search-input";
import MainLayout from "@/layouts/Layout";
import PlanDetailCard from "./components/PlanDetailCard";
import NextImage from "@/components/NextImage";
import Button from "@/components/buttons/Button";
import { RiSave3Line } from "react-icons/ri";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useState } from "react";

function ClassDetail() {
  const [open, setOpen] = useState(false);

  return (
    <MainLayout withNavbar withFooter={false}>
      <section className="px-[52px] py-[32px]">
        {/* HEADER SECTION*/}
        <div className="flex justify-between -mr-[52px] border-b-2 border-slate-400 pb-10">
          <div className="flex flex-col gap-3 ">
            <Typography variant="h5" className="font-bold text-3xl">
              Kelas Semester 3
            </Typography>
            <Typography variant="p" className="text-slate-700">
              Created by Sadam
            </Typography>
            <SearchInput />
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
        <div className="flex flex-col gap-3 bg-white pt-3">
          <Typography variant="h5" className="font-bold mb-3 text-3xl">
            Senin
          </Typography>
          <PlanDetailCard />
          <PlanDetailCard />
          <PlanDetailCard />
        </div>

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
