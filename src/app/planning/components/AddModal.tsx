"use client";

import Input from "@/components/form/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { Dispatch, SetStateAction } from "react";
import {
  useCreatePlanMutation,
  usePlansQuery,
  useWorkspaceQuery,
} from "../hooks/mutation";
import toast from "react-hot-toast";
import { CreatePlan } from "@/types/planning/plan";

type TambahPlanModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TambahPlanModal({
  open,
  setOpen,
}: TambahPlanModalProps) {
  const methods = useForm<CreatePlan>({
    mode: "onTouched",
  });

  const { handleSubmit, reset } = methods;

  const {
    mutate: createPlan,
    isPending,
    data,
  } = useCreatePlanMutation({
    reset: () => {
      reset();
      setOpen(false);
      console.log("Response dari backend:", data);
    },
  });

  const { data: workspaceData, isLoading: isWorkspaceLoading } =
    useWorkspaceQuery();

  const onSubmit = (data: CreatePlan) => {
    console.log("berhasil");
    const workspace_id = workspaceData?.data?.[0]?.id;
    if (!workspace_id) {
      toast.error("Workspace belum tersedia");
      return;
    }

    createPlan({ name: data.name, workspace_id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-start">
            <Typography font="Poppins" variant="h5" weight="semibold">
              Tambah Plan Baru
            </Typography>
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              setOpen(false);
            })}
          >
            <div className="space-y-4">
              <Input
                id="name"
                name="name"
                label="Nama Plan"
                placeholder="Masukkan nama plan"
              />
              <Button className="w-full mt-2" type="submit">
                Tambah Plan Baru
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
