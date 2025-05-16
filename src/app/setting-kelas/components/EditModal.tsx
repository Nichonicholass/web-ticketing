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
import { EditClassData } from "@/types/setting-kelas/card";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useUpdateClassMutation } from "../hook/useEditClass";
import useGetAllCourse from "../hook/useGetAllCourse";
import useGetClassById from "../hook/useGetClassbyId";
type EditKelasModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  classId: string;
};

const dayOptions = [
  { label: "Senin", value: "Monday" },
  { label: "Selasa", value: "Tuesday" },
  { label: "Rabu", value: "Wednesday" },
  { label: "Kamis", value: "Thursday" },
  { label: "Jumat", value: "Friday" },
  { label: "Sabtu", value: "Saturday" },
  { label: "Minggu", value: "Sunday" },
];

export default function EditKelasModal({
  open,
  setOpen,
  classId,
}: EditKelasModalProps) {
  const methods = useForm<EditClassData>();

  const { setValue, reset, handleSubmit } = methods;

  const { data: classData } = useGetClassById(classId);
  const { mutate: updateClass } = useUpdateClassMutation(classId, () => {
    setOpen(false);
  });
  const { data: allCourses } = useGetAllCourse();

  useEffect(() => {
    if (classData) {
      const [hour_start, minutes_start] = classData.start_time.split(":");
      const [hour_end, minutes_end] = classData.end_time.split(":");

      reset({
        ...classData,
      });

      setValue("hour_start", hour_start);
      setValue("minutes_start", minutes_start);
      setValue("hour_end", hour_end);
      setValue("minutes_end", minutes_end);
      setValue("day", classData.day);
    }
  }, [classData, reset, setValue]);

  const onSubmit = (data: EditClassData) => {
    const payload: EditClassData = {
      ...data,
      start_time: `${data.hour_start}:${data.minutes_start}:00`,
      end_time: `${data.hour_end}:${data.minutes_end}:00`,
    };

    updateClass(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <Typography font="Poppins" variant="h5" weight="semibold">
              {/* TO DO : GET */}
              PWEB F
            </Typography>
          </DialogTitle>
        </DialogHeader>
        <Typography font="Poppins" variant="p" weight="regular">
          Ubah setting kelas ini ?
        </Typography>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              setOpen(false);
            })}
            className="space-y-4"
          >
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
              <label className="text-sm font-medium">Jam Mulai & Selesai</label>
              <div className="grid grid-cols-5 gap-2">
                <Input
                  id="hour_start"
                  type="string"
                  min={0}
                  max={23}
                  placeholder="00"
                  className="text-center"
                />
                <Input
                  id="minutes_start"
                  type="string"
                  min={0}
                  max={59}
                  placeholder="00"
                  className="text-center"
                />
                <span className="flex items-center justify-center">-</span>
                <Input
                  id="hour_end"
                  type="string"
                  min={0}
                  max={23}
                  placeholder="00"
                  className="text-center"
                />
                <Input
                  id="minutes_end"
                  type="string"
                  min={0}
                  max={59}
                  placeholder="00"
                  className="text-center col-span-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full mt-2">
                Batal
              </Button>
              <Button variant="slate" type="submit" className="w-full mt-2">
                Edit Kelas
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
