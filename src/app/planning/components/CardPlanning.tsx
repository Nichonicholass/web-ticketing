"use client";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { CardPlanProps } from "@/types/planning/plan";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDeletePlanMutation } from "../hooks/mutation";

const CardPlanning: React.FC<CardPlanProps> = ({ name, id }) => {
  const [openDelete, setOpenDelete] = useState(false);

  const { mutate: deletePlan } = useDeletePlanMutation();
  const handleDelete = (planId: string) => {
    deletePlan(planId);
  };

  return (
    <div
      className={`
        max-w-md rounded-lg overflow-hidden shadow-lg 
        transition-transform duration-300 hover:scale-105 
        border-[1px] border-slate-300
      `}
    >
      {/* === CARD === */}
      <div className="p-6 relative">
        {/* === TITTLE === */}
        <h3 className="text-xl font-bold  text-black">{name}</h3>
        <IconButton
          variant="ghost"
          size="sm"
          icon={Trash2}
          iconClassName="w-6 h-6"
          className="absolute top-3 right-3 text-red-500 hover:text-red-300"
          onClick={() => setOpenDelete(true)}
        />
        <ConfirmModal
          open={openDelete}
          setOpen={setOpenDelete}
          title="Yakin Menghapus Plan"
          description={`Planning kelas ${name} akan dihapus, apakah kamu yakin?`}
          cancelbutton="Batal"
          acceptbutton="Ya, Yakin"
          variant="red"
          onConfirm={() => handleDelete(id)}
        />

        {/* Tombol/Aksi */}
        <Button variant="slate" className="mt-4">
          <Typography
            font="Poppins"
            variant="c1"
            weight="semibold"
            className="text-sm text-white hover:text-slate-900 min-w-36"
          >
            Lihat Plan
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default CardPlanning;
