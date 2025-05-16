import api from "@/lib/api";
import { GetAllClassSettingResponse } from "@/types/dashboard/class";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies"; // pastikan fungsi ini ada

type useGetAllClassSettingProps = {
  isPrivate?: boolean;
};

export default function useGetAllClassSetting({
  isPrivate = false,
}: useGetAllClassSettingProps = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-class-setting", isPrivate],
    queryFn: async () => {
      const token = getToken();

      const { data } = await api.get<GetAllClassSettingResponse>(
        `/class-setting${isPrivate ? "/private" : ""}`,
        {
          headers: isPrivate
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        },
      );

      return data.data;
    },
  });

  return { data, isLoading };
}
