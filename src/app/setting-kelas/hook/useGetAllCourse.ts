import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export type AllCourseData = {
  id: string;
  name: string;
  class_setting_id: string;
};

export default function useGetAllCourse() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-course"],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<AllCourseData[]>>("/courses");
      return data.data;
    },
  });

  return { data, isLoading };
}
