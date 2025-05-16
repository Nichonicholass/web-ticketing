import { getToken } from "@/lib/cookies";
import { GetAllPlanResponse } from "@/types/dashboard/plan";
import axios from "axios";

export const useGetAllPlan = () => {
  const ID = "ba27b5cc-4a44-4113-9b28-71b849f5c6e4";

  const token = getToken();

  const getAllPlan = async () => {
    const response = await axios.get<GetAllPlanResponse>(
      `${process.env.NEXT_PUBLIC_API_URL_DEV}/plans/${ID}/workspaces?take=10&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.data;

    // console.log(data);
    return data.data;
  };
  return { getAllPlan };
};
