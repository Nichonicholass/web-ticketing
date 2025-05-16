"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { Dispatch, SetStateAction } from "react";

type TambahKelasModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  acceptbutton: string;
  cancelbutton: string;
  variant?: "default" | "red";
  onConfirm?: () => void;
};

export default function ConfirmModal({
  open,
  setOpen,
  title,
  description,
  cancelbutton,
  acceptbutton,
  variant = "default",
  onConfirm,
}: TambahKelasModalProps) {
  const titleColorClass = variant === "red" ? "text-red-500" : "text-slate-900";
  const acceptButtonVariant = variant === "red" ? "red" : "slate";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full px-16 py-8 rounded-3xl">
        <DialogHeader className="mb-5">
          <DialogTitle>
            <Typography
              font="Poppins"
              variant="h4"
              weight="semibold"
              className={`w-full ${titleColorClass}`}
            >
              {title}
            </Typography>
          </DialogTitle>
          <Typography font="Poppins" variant="t" weight="semibold">
            {description}
          </Typography>
        </DialogHeader>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            {cancelbutton}
          </Button>
          <Button
            variant={acceptButtonVariant}
            className="w-full"
            onClick={onConfirm}
          >
            {acceptbutton}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
