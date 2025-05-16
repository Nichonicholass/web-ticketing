import { Metadata } from "next";

import React, { Suspense } from "react";
import Loading from "@/components/Loading";

const RegisterForm = React.lazy(() => import("./container/FormRegister"));

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <Suspense fallback={<Loading />}>
      <RegisterForm />
    </Suspense>
  );
}
