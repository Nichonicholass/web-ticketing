import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { CardProps } from "@/types/setting-kelas/card";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDeleteClassMutation } from "../hook/useDeleteClass";
import EditKelasModal from "./EditModal";

const CardSetting: React.FC<CardProps> = ({
  id,
  name,
  dosen,
  date,
  classroom,
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { mutate: deleteClass } = useDeleteClassMutation();

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
        <h3 className="text-xl font-bold mb-2 text-black">{name}</h3>
        <IconButton
          variant="ghost"
          size="sm"
          icon={Trash2}
          iconClassName="w-8 h-8"
          className="absolute top-3 right-3 text-red-500 hover:text-red-300"
          onClick={() => setOpenDelete(true)}
        />
        <ConfirmModal
          open={openDelete}
          setOpen={setOpenDelete}
          title="Yakin Menghapus Kelas"
          description="Planning kelas PWEB F akan dihapus, apakah kamu yakin?"
          cancelbutton="Batal"
          acceptbutton="Ya, Yakin"
          variant="red"
          onConfirm={() => {
            deleteClass(id);
          }}
          // isLoading={deleting}
        />

        {/* === DOSEN === */}
        <p className="text-gray-900 mb-2">{dosen}</p>
        <p className="text-gray-900 mb-2">{classroom}</p>

        {/* === DATE === */}
        <div className="mb-6">
          <Typography
            font="Poppins"
            variant="c1"
            weight="regular"
            className="text-sm text-slate-900 px-2 py-1 border-black border-[1px] rounded-xl w-fit"
          >
            {date}
          </Typography>
        </div>

        {/* ACTION BUTTON === */}
        <Button
          variant="slate"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Typography
            font="Poppins"
            variant="c1"
            weight="semibold"
            className="text-sm text-white hover:text-slate-900"
          >
            Edit Kelas
          </Typography>
        </Button>
        <EditKelasModal open={open} setOpen={setOpen} classId={id} />
      </div>
    </div>
  );
};

export default CardSetting;
