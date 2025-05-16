import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export type Workspace = {
  id: string;
  name: string;
};

export default function useGetAllWorkspace() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-workspace"],
    queryFn: async () => {
      const { data } =
        await api.get<ApiResponse<Workspace[]>>("/workspace/get");
      return data.data;
    },
  });

  return { data, isLoading };
}
