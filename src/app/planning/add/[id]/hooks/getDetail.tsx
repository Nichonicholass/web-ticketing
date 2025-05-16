import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export type ClassData = {
  id: string;
  lecturer: string;
  course_id: string;
  name: string;
  day: string;
  classroom: string;
  start_time: string;
  end_time: string;
};

export type PlanSetting = {
  id: string;
  class_id: string;
  class: ClassData;
};

export type PlanDetailData = {
  id: string;
  workspace_id: string;
  name: string;
  plan_settings: PlanSetting[];
};

export default function useGetPlanDetail(planId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-plan-detail", planId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<PlanDetailData>>(
        `/plans/${planId}`,
      );
      return data.data;
    },
    enabled: !!planId,
  });

  return { data, isLoading, error };
}
