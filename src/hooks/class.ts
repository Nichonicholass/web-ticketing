import { GetAllClassSettingResponse } from "@/types/dashboard/class";
import axios from "axios";

export function useGetAllClassSetting() {
  const getAllClassSetting = async () => {
    const response = await axios.get<GetAllClassSettingResponse>(
      `${process.env.NEXT_PUBLIC_API_URL_DEV}/class-setting`,
    );
    const data = await response.data;

    // console.log(data);
    return data.data;
  };

  return { getAllClassSetting };
}

export function useGetAllClassSettingPrivate() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6a2FyaXpxdWxsYWg5OUBnbWFpbC5jb20iLCJleHAiOjE3NDczOTAxNDYsImlzcyI6IkZycyBQbGFubmluZyBUZWFtIDIiLCJ1c2VyX2lkIjoiNzFjMDc3ZTctZjFkMS00MjQxLWJmMDAtYmFlMTQxMWE0MWE5In0.U9gq8Oz23CSM2bxGDWnVrrAU3lOwc8m8DCIx50XusV8";
  const getAllClassSettingPrivate = async () => {
    const response = await axios.get<GetAllClassSettingResponse>(
      `${process.env.NEXT_PUBLIC_API_URL_DEV}/class-setting/private`,
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

  return { getAllClassSettingPrivate };
}
