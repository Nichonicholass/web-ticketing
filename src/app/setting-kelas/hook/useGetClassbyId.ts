import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { EditClassData } from "@/types/setting-kelas/card";
import { useQuery } from "@tanstack/react-query";

export default function useGetClassById(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<EditClassData>>(
        `/classes/${id}`,
      );
      return data.data;
    },
    enabled: !!id,
  });

  return { data, isLoading };
}
