import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import api from "@/lib/api";
import { ApiError } from "@/types/api";
import { useRouter } from "next/navigation";

export type WorkspaceRequest = {
  name: string;
};
export type WorkspaceResponse = {
  id: string;
  name: string;
};

export const useCreateWorkspaceMutatiton = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    WorkspaceRequest
  >({
    mutationFn: (data: WorkspaceRequest) => {
      return api.post<AxiosResponse<WorkspaceResponse>>(
        "/workspace/create",
        data,
      );
    },
    onSuccess: () => {
      toast.success("Workspace berhasil di buat");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error.Message || "Gagal membuat Worrkspace",
      );
    },
  });

  return { mutate, isPending };
};
