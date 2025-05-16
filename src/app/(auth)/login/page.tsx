import { Metadata } from "next";

import React, { Suspense } from "react";
import Loading from "@/components/Loading";

const LoginPage = React.lazy(() => import("./container/LoginPage"));

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginUserPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginPage />
    </Suspense>
  );
}
