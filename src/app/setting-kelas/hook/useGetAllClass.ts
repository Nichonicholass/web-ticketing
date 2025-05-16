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
