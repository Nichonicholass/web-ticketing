import { Metadata } from "next";
import LoginPage from "./container/LoginPage";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return <LoginPage />;
}
