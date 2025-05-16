import api from "@/lib/api";
import { EditClassData } from "@/types/setting-kelas/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateClassMutation(id: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EditClassData) => {
      const { data } = await api.put(`/classes/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-class"] });
      queryClient.invalidateQueries({ queryKey: ["class", id] });
      if (onSuccess) onSuccess();
      toast.success("Kelas berhasil diperbarui!");
    },
  });
}
