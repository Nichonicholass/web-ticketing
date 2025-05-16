import { Metadata } from "next";

import React, { Suspense } from "react";
import Loading from "@/components/Loading";

const DashboardUser = React.lazy(() => import("./container/Dashboard"));

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardUser />
    </Suspense>
  );
}
