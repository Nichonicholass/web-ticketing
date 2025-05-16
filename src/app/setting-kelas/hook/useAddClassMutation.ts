import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import api from "@/lib/api";
import { ApiError } from "@/types/api";
import { AddClassRequest } from "@/types/setting-kelas/card";

export const useAddClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError<ApiError>, AddClassRequest>({
    mutationFn: (data) => api.post("/classes", data),
    onSuccess: () => {
      toast.success("Kelas berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["get-all-class"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "Gagal menambahkan kelas, coba lagi nanti.",
      );
    },
  });
};
