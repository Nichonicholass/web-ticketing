"use client";

import Button from "@/components/buttons/Button";
import ConfirmModal from "@/components/modal/ConfirmModal";
import Typography from "@/components/Typography";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

type PlanDetailCardProps = {
  id: string;
  kelas: string;
  dosen: string;
  date: string;
  status: string;
};

function PlanDetailCard({
  id,
  kelas,
  dosen,
  date,
  status,
}: PlanDetailCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-[300px] px-4 md:w-[434px] text-black rounded-[6px] pb-4 relative hover:scale-105 transition-transform duration-300">
      {status === "on_plan" ? (
        <RxCross2
          className="text-black text-xl absolute top-4 right-3 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : (
        ""
      )}

      <ConfirmModal
        open={open}
        setOpen={setOpen}
        title="Yakin Menghapus Plan"
        description={`Planning kelas ${kelas} akan dihapus, apakah kamu yakin?`}
        cancelbutton="Batal"
        acceptbutton="Ya, Yakin"
        variant="red"
      />

      <CardHeader>
        <Typography variant="h6" className="font-bold">
          {kelas}
        </Typography>
        <CardDescription className="text-black">{dosen}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between border border-black w-fit h-fit py-[4px] px-[12px] rounded-[4px] ml-6 ">
        <Typography variant="p">{date}</Typography>
      </CardFooter>

      {status === "not_plan" ? (
        <Button
          variant="slate"
          leftIcon={Plus}
          leftIconClassName="h-5 w-5"
          className="flex w-full h-fit items-center justify-center mt-6"
          // onClick={() => setOpen(true)}
        />
      ) : (
        ""
      )}
    </Card>
  );
}

export default PlanDetailCard;
