import api from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { ApiResponse } from "@/types/api";
import { GetMeResponse } from "@/types/dashboard/class";
import { useQuery } from "@tanstack/react-query";

export default function useGetMe() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-me"],
    queryFn: async () => {
      const token = getToken();

      const { data } = await api.get<ApiResponse<GetMeResponse>>("auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
      return data.data;
    },
  });
  return { data, isLoading };
}
