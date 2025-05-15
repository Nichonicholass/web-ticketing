import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import api from "@/lib/api";
import { ApiError } from "@/types/api";
import { RegisterRequest, RegisterResponse } from "@/types/register";
import { useRouter } from "next/navigation";

export const useRegisterMutation = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    RegisterRequest
  >({
    mutationFn: (data: RegisterRequest) => {
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("isRegister", "true");
      return api.post<AxiosResponse<RegisterResponse>>("/auth/register", data);
    },
    onSuccess: () => {
      toast.success("Akun berhasil dibuat, silahkan login");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error.Message ||
          "Gagal membuat akun, silahkan coba lagi",
      );
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("isRegister");
    },
  });

  return { mutate, isPending };
};
