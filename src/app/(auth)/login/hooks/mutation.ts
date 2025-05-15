import api from "@/lib/api";
import { setToken } from "@/lib/cookies";
import useAuthStore from "@/stores/useAuthStore";
import { ApiError, ApiResponse } from "@/types/api";
import { User } from "@/types/entities/user";
import { LoginRequest, LoginResponse } from "@/types/login";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useLoginMutation = () => {
  const login = useAuthStore.useLogin();
  const { mutate, isPending } = useMutation<
    ApiResponse<LoginResponse>,
    AxiosError<ApiError>,
    LoginRequest
  >({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        data,
      );
      const { token } = res.data.data;
      setToken(token);

      const user = await api.get<ApiResponse<User>>("/auth/me");
      if (user) {
        login({ ...user.data.data, token: token });
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("Anda berhasil login");
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error.Message ||
          error.response?.data.message ||
          "Email atau kata sandi salah, silahkan coba lagi",
      );
    },
  });

  return { mutate, isPending };
};
