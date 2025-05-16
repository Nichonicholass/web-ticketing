import { Metadata } from "next";

import React, { Suspense } from "react";
import Loading from "@/components/Loading";

const SettingKelas = React.lazy(() => import("./container/SettingKelas"));
export const metadata: Metadata = {
  title: "Setting Kelas",
};

export default function Register() {
  return (
    <Suspense fallback={<Loading />}>
      <SettingKelas />
    </Suspense>
  );
}
