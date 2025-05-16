import { GetAllPlanResponse } from "@/types/dashboard/card";
import axios from "axios";

export const useGetAllPlan = () => {
  const ID = "ba27b5cc-4a44-4113-9b28-71b849f5c6e4";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6a2FyaXpxdWxsYWg5OUBnbWFpbC5jb20iLCJleHAiOjE3NDczOTAxNDYsImlzcyI6IkZycyBQbGFubmluZyBUZWFtIDIiLCJ1c2VyX2lkIjoiNzFjMDc3ZTctZjFkMS00MjQxLWJmMDAtYmFlMTQxMWE0MWE5In0.U9gq8Oz23CSM2bxGDWnVrrAU3lOwc8m8DCIx50XusV8";
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
