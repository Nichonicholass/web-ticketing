"use client";

import Button from "@/components/buttons/Button";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useState } from "react";

export default function Test() {
  const [open, setOpen] = useState(false);
  const [openRed, setOpenRed] = useState(false);
  return (
    <div>
      <Button variant="blue" onClick={() => setOpen(true)}>
        MODAL DEFAULT
      </Button>
      <Button variant="blue" onClick={() => setOpenRed(true)}>
        MODAL RED
      </Button>
      {/* TO DO FIX CONFIRM MODAL : POST OR DELETE API */}
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        title="Yakin Menghapus Kelas"
        description="Planning kelas PWEB F akan dihapus, apakah kamu yakin?"
        cancelbutton="Batal"
        acceptbutton="Ya, Yakin"
      />
      <ConfirmModal
        open={openRed}
        setOpen={setOpenRed}
        title="Yakin Menghapus Kelas"
        description="Planning kelas PWEB F akan dihapus, apakah kamu yakin?"
        cancelbutton="Batal"
        acceptbutton="Ya, Yakin"
        variant="red"
      />
    </div>
  );
}
