"use client";

import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Typography from "@/components/Typography";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

type PlanDetailCardProps = {
  id: string;
  name: string;
  dosen: string;
  date: string;
  classroom: string;
  status: "on_plan" | "not_plan" | string;
  OnClick: (event: React.MouseEvent<HTMLButtonElement | SVGSVGElement>) => void;
};

function PlanDetailCard({
  id,
  name,
  dosen,
  date,
  classroom,
  status,
  OnClick,
}: PlanDetailCardProps) {
  return (
    <Card className="w-[300px] px-4 md:w-[434px] text-black rounded-[6px] pb-4 relative hover:scale-105 transition-transform duration-300">
      {status === "on_plan" && (
        <IconButton
          icon={X}
          className="absolute top-4 right-3 text-black"
          onClick={OnClick}
          variant="ghost"
          size="sm"
          aria-label="Hapus plan"
        />
      )}

      <CardHeader>
        <Typography variant="h6" className="font-bold">
          {name}
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
          onClick={OnClick}
        >
          Add to Plan
        </Button>
      ) : null}
    </Card>
  );
}

export default PlanDetailCard;
