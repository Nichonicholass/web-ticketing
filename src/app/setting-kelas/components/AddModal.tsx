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
import SelectInput from "@/components/form/SelectInput";
import { AddClassForm } from "@/types/setting-kelas/card";
import { Dispatch, SetStateAction } from "react";
import { useAddClassMutation } from "../hook/useAddClassMutation";
import useGetAllCourse from "../hook/useGetAllCourse";

type TambahKelasModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const dayOptions = [
  { label: "Senin", value: "monday" },
  { label: "Selasa", value: "tuesday" },
  { label: "Rabu", value: "wednesday" },
  { label: "Kamis", value: "thursday" },
  { label: "Jumat", value: "friday" },
  { label: "Sabtu", value: "saturday" },
  { label: "Minggu", value: "sunday" },
];

export default function TambahKelasModal({
  open,
  setOpen,
}: TambahKelasModalProps) {
  //   const [open, setOpen] = useState(true) // Ganti ke false jika ingin default tertutup

  const methods = useForm<AddClassForm>({
    mode: "onTouched",
  });
  const { handleSubmit, reset } = methods;

  const { mutate: addClass, isPending } = useAddClassMutation();

  const onSubmit = (data: AddClassForm) => {
    const payload = {
      lecturer: data.lecturer,
      course_id: data.course_id,
      classroom: data.classroom,
      day: data.day,
      start_time: `${data["hour_start"]}:${data["minutes_start"]}:00`,
      end_time: `${data["hour_end"]}:${data["minutes_end"]}:00`,
    };
    addClass(payload);
    // console.log(payload);
    reset();
    // console.log(data);
  };

  const { data: allCourses } = useGetAllCourse();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <Typography font="Poppins" variant="h5" weight="semibold">
              Tambah Kelas
            </Typography>
          </DialogTitle>
        </DialogHeader>
        <Typography font="Poppins" variant="p" weight="regular">
          Masukan data kelas!
        </Typography>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              setOpen(false);
            })}
          >
            <div className="space-y-4">
              <SelectInput
                id="course_id"
                label="Pilih Kelas"
                placeholder="Pilih kelas"
                options={
                  allCourses?.map((course) => ({
                    label: course.name,
                    value: course.id,
                  })) ?? []
                }
                validation={{ required: "Kelas wajib dipilih" }}
              />

              <Input
                id="lecturer"
                label="Nama Dosen"
                placeholder="Masukkan nama dosen"
                validation={{
                  required: "Harus diisi",
                }}
              />
              <Input
                id="classroom"
                label="Ruang Kelas"
                placeholder="Masukkan ruang kelas"
                validation={{
                  required: "Harus diisi",
                }}
              />
              <SelectInput
                id="day"
                label="Hari"
                placeholder="Pilih hari"
                options={dayOptions}
                validation={{ required: "Hari wajib dipilih" }}
              />

              <div>
                <label className="text-md font-semibold text-slate-900">
                  Jam Mulai & Selesai
                </label>
                <span className="text-danger-main">*</span>
                <div className="grid grid-cols-5 gap-2">
                  <Input
                    id="hour_start"
                    type="number"
                    min={0}
                    max={23}
                    placeholder="00"
                    className="text-center"
                    validation={{
                      required: "Harus diisi",
                    }}
                  />
                  <Input
                    id="minutes_start"
                    type="number"
                    min={0}
                    max={59}
                    placeholder="00"
                    className="text-center"
                    validation={{
                      required: "Harus diisi",
                    }}
                  />
                  <span className="flex items-center justify-center">-</span>
                  <Input
                    id="hour_end"
                    type="number"
                    min={0}
                    max={23}
                    placeholder="00"
                    className="text-center"
                    validation={{
                      required: "Harus diisi",
                    }}
                  />
                  <Input
                    id="minutes_end"
                    type="number"
                    min={0}
                    max={59}
                    placeholder="00"
                    className="text-center col-span-1"
                    validation={{
                      required: "Harus diisi",
                    }}
                  />
                </div>
              </div>

              <Button
                className="w-full mt-2"
                type="submit"
                variant="slate"
                isLoading={isPending}
              >
                Tambah Kelas Baru
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
