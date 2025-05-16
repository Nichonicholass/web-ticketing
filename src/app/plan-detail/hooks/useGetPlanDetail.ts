import api from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { ApiResponse } from "@/types/api";
import { GetMeResponse } from "@/types/dashboard/class";
import { useQuery } from "@tanstack/react-query";

export default function useGetPlanDetail() {
  const ID = "33bed98b-cb0d-47df-be89-55b218872587";
  const { data, isLoading } = useQuery({
    queryKey: ["plan-detail"],
    queryFn: async () => {
      const token = getToken();

      const { data } = await api.get<ApiResponse<GetMeResponse>>(
        `/plans/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data.data;
    },
  });
  return { data, isLoading };
}
