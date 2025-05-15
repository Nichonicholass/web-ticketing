import { Metadata } from "next";

import RegisterForm from "./container/FormRegister";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return <RegisterForm />;
}
