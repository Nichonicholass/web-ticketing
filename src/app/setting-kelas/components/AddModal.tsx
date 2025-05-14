"use client";

import Input from "@/components/form/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormProvider, useForm } from "react-hook-form";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { Dispatch, SetStateAction } from "react";
type TambahKelasModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TambahKelasModal({
  open,
  setOpen,
}: TambahKelasModalProps) {
  //   const [open, setOpen] = useState(true) // Ganti ke false jika ingin default tertutup
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(() => {
          setOpen(false);
        })}
      >
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

            <div className="space-y-4">
              <div>
                <Input
                  id="name-class"
                  label="Name Kelas"
                  placeholder="Masukkan nama kelas"
                />
              </div>

              <div>
                <Input
                  id="dosen"
                  label="Nama Dosen"
                  placeholder="Masukkan nama dosen"
                />
              </div>

              <div>
                <label className="text-lg font-bold">Hari</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih hari" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Senin",
                      "Selasa",
                      "Rabu",
                      "Kamis",
                      "Jumat",
                      "Sabtu",
                      "Minggu",
                    ].map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Jam Mulai & Selesai
                </label>
                <div className="grid grid-cols-5 gap-2">
                  <Input
                    id="hour-start"
                    type="number"
                    min={0}
                    max={23}
                    placeholder="00"
                    className="text-center"
                  />
                  <Input
                    id="minutes-start"
                    type="number"
                    min={0}
                    max={59}
                    placeholder="00"
                    className="text-center"
                  />
                  <span className="flex items-center justify-center">-</span>
                  <Input
                    id="hour-stop"
                    type="number"
                    min={0}
                    max={23}
                    placeholder="00"
                    className="text-center"
                  />
                  <Input
                    id="minutes-stop"
                    type="number"
                    min={0}
                    max={59}
                    placeholder="00"
                    className="text-center col-span-1"
                  />
                </div>
              </div>

              <Button className="w-full mt-2">Tambah Kelas Baru</Button>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </FormProvider>
  );
}
