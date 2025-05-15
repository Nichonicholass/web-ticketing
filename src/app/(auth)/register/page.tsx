import { Metadata } from "next";

// import RegisterPage from "@/app/(auth)/register/container/RegisterPage";
import RegisterForm from "./container/FormRegister";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return <RegisterForm />;
}
