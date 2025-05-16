"use client";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { CardPlanProps } from "@/types/planning/plan";
import { Trash2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const CardPlanning: React.FC<CardPlanProps> = ({ name, id }) => {
  const router = useRouter(); // Inisialisasi router

  return (
    <div
      className={`
        w-[434px] rounded-lg overflow-hidden shadow-lg 
        transition-transform duration-300 hover:scale-105 
        border-[1px] border-slate-300
      `}
    >
      {/* === CARD === */}
      <div className="p-6 relative">
        {/* === TITLE === */}
        <h3 className="text-xl font-bold  text-black">{name}</h3>

        {/* Tombol/Aksi */}
        <Button
          variant="slate"
          className="mt-4"
          onClick={() => router.push(`/planning/add/${id}`)}
        >
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
