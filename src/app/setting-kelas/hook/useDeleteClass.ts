import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/classes/${id}`),
    onSuccess: () => {
      toast.success("Kelas berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["get-all-class"] });
    },
    onError: () => {
      toast.error("Gagal menghapus kelas.");
    },
  });
};
