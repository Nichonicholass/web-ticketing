import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export type AllClassData = {
  id: string;
  name: string;
  lecturer: string;
  course_id: string;
  day: string;
  classroom: string;
  start_time: string;
  end_time: string;
};

export default function useGetAllClass() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-class"],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<AllClassData[]>>("/classes");
      return data.data;
    },
  });

  return { data, isLoading };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import toast from "react-hot-toast";

export type AddPlanSettingPayload = {
  plan_id: string;
  class_id: string;
};

export const useAddPlanSetting = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, AddPlanSettingPayload>({
    mutationFn: (payload) => api.post("/plans/settings", payload),
    onSuccess: () => {
      //   toast.success("Plan setting berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["get-plan-detail"] });
    },
    onError: (error) => {
      //   toast.error(
      //     error.response?.data? ??
      //       "Gagal menambahkan plan setting, coba lagi nanti."
      //   );
    },
  });
};

export const useDeletePlanSetting = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: async (planSettingId: string) => {
      await api.delete(`/plans/settings/${planSettingId}`);
    },
    onSuccess: () => {
      toast.success("Plan setting berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["get-plan-detail"] });
    },
    onError: (error) => {
      const errData = error.response?.data as { message?: string };
      toast.error(
        errData?.message ?? "Gagal menghapus plan setting, coba lagi nanti.",
      );
    },
  });
};
