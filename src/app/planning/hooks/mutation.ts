import { api } from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";
import { CreatePlan, Plan } from "@/types/planning/plan";
import { Workspace } from "@/types/planning/workspace";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

export const usePlansByWorkspaceQuery = (workspaceId: string) => {
  return useQuery<ApiResponse<Plan[]>>({
    queryKey: ["plans", workspaceId],
    queryFn: () =>
      api.get(`/plans/${workspaceId}/workspaces`).then((res) => res.data),
    enabled: !!workspaceId, // hanya fetch jika workspaceId ada
  });
};

export const useWorkspaceQuery = () => {
  return useQuery<ApiResponse<Workspace[]>>({
    queryKey: ["workspaces"],
    queryFn: () => api.get("/workspace/get").then((res) => res.data),
  });
};

export const useCreatePlanMutation = ({
  isNextStep,
  reset,
}: {
  isNextStep?: () => void;
  reset?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, data } = useMutation<
    AxiosResponse<ApiResponse<Plan>>,
    AxiosError<ApiError>,
    CreatePlan
  >({
    mutationFn: (newPlan: CreatePlan) => {
      return api.post<ApiResponse<Plan>>("/plans", newPlan);
    },
    onSuccess: () => {
      toast.success("Plan berhasil dibuat!");
      isNextStep?.();
      reset?.();
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message || "Gagal membuat plan, silakan coba lagi",
      );
    },
  });

  return { mutate, isPending, data };
};

export const usePlansQuery = () => {
  return useQuery<ApiResponse<Plan[]>>({
    queryKey: ["plans"],
    queryFn: () => api.get("/plans").then((res) => res.data),
  });
};

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<ApiResponse<null>>,
    AxiosError<ApiError>,
    string // planId sebagai argumen
  >({
    mutationFn: (planId: string) => api.delete(`/plans/${planId}`),
    onSuccess: () => {
      toast.success("Plan berhasil dihapus!");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message ||
          "Gagal menghapus plan, silakan coba lagi",
      );
    },
  });
};
