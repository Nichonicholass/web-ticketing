"use client";

import ConfirmModal from "@/components/modal/ConfirmModal";
import Typography from "@/components/Typography";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function PlanDetailCard() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-fit text-black rounded-[6px] pb-7 relative">
      <RxCross2
        className="text-black text-xl absolute top-4 right-3 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        title="Yakin Menghapus Plan"
        description="Planning kelas PWEB F akan dihapus, apakah kamu yakin?"
        cancelbutton="Batal"
        acceptbutton="Ya, Yakin"
        variant="red"
      />

      <CardHeader>
        <Typography variant="h6" className="font-bold">
          PWEB F
        </Typography>
        <CardDescription className="text-black">
          Ir. M.M. Irfan Subakti, S.Kom., M.Sc.Eng., M.Phil., IPM{" "}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between border border-black w-fit h-fit py-[4px] px-[12px] rounded-[4px] ml-6 ">
        <Typography variant="p">Kamis, 13.00 -15.00</Typography>
      </CardFooter>
    </Card>
  );
}

export default PlanDetailCard;
