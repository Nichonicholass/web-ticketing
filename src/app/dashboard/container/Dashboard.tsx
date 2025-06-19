"use client";

import { Suspense, useEffect } from "react";
import Button from "@/components/buttons/Button";
import Typography from "@/components/Typography";
import ClassSettingCard from "@/app/dashboard/components/ClassSettingCard";
import MainLayout from "@/layouts/Layout";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import withAuth from "@/components/hoc/withAuth";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import useGetAllClassSetting from "./../hooks/useGetAllClassSetting";
import useGetMe from "./../hooks/useGetMe";
import {
  usePlansByWorkspaceQuery,
  useWorkspaceQuery,
} from "@/app/planning/hooks/mutation";
import CardPlanning from "../components/CardPlanning";

// function Dashboard() {
export default function Dashboard() {
  const router = useRouter();

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(
    null,
  );

  // === HANDLE DATA
  const {
    data: allClassSettingPrivate,
    isLoading: isLoadingClassSettingPrivate,
  } = useGetAllClassSetting({ isPrivate: true });
  const { data: me } = useGetMe();

  const { data: plansData } = usePlansByWorkspaceQuery(
    selectedWorkspaceId ?? "",
  );

  const classes = plansData?.data ?? [];

  const [searchTerm, setSearchTerm] = useState("");

  const { data: workspaceListData, isLoading: isLoadingPlan } =
    useWorkspaceQuery();

  useEffect(() => {
    const storedId = localStorage.getItem("selectedWorkspaceId");
    if (storedId && !selectedWorkspaceId) {
      setSelectedWorkspaceId(storedId);
    } else if (!storedId && workspaceListData?.data?.length) {
      setSelectedWorkspaceId(workspaceListData.data[0].id);
      localStorage.setItem("selectedWorkspaceId", workspaceListData.data[0].id);
    }
  }, [workspaceListData, selectedWorkspaceId]);

  // === FILTER FUNCTION
  const filteredClassesSettingPrivate = useMemo(() => {
    if (!searchTerm) return allClassSettingPrivate;
    return allClassSettingPrivate?.filter((cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allClassSettingPrivate, searchTerm]);

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <MainLayout withNavbar withFooter={false}>
      {/* HEADER SECTION*/}
      <div className="px-[52px] py-[32px] flex flex-col gap-3">
        <Typography variant="h5" className="font-bold text-3xl">
          Hallo, {me?.personal_info.username}
        </Typography>

        <div className="flex flex-col md:flex-row justify-between gap-3">
          {/* SEARCH INPUT */}
          <div className="relative mb-4">
            <Search className="absolute top-1/2 right-3 h-5 w-5 text-gray-400 transform -translate-y-1/2" />
            <input
              type="text"
              className="block md:w-[450px] lg:w-[528px] w-full pl-10 pr-3 py-2 text-black border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Cari kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* BUTTON UNTUK BUAT PLAN BARU */}
          <Button
            className="bg-slate-900 border-slate-900 px-[48px] py-[8px] hover:bg-slate-800 active:bg-slate-700 h-fit "
            leftIcon={FiPlus}
            onClick={() => {
              router.push("/planning");
            }}
          >
            Buat Plan Baru
          </Button>
        </div>

        {/* SETTING KELASMU */}
        <Typography variant="h5" className="font-bold mb-3 text-3xl">
          Setting Kelasmu!
        </Typography>

        <div className="flex flex-wrap gap-4">
          {isLoadingClassSettingPrivate && (
            <div className="flex justify-center items-center h-full w-full text-gray-500">
              Loading...
            </div>
          )}
        </div>

        {/* PILIHAN LAINNYA */}
        <Typography variant="h5" className="font-bold my-3 text-3xl">
          Pilihan Lainnya!
        </Typography>

        <div className="flex flex-wrap gap-4">
          {isLoadingPlan && (
            <div className="flex justify-center items-center h-full w-full text-gray-500">
              Loading...
            </div>
          )}
        </div>

        {classes.length === 0 && (
          <div className="text-center py-4 text-gray-500 col-span-full"></div>
        )}
      </div>
    </MainLayout>
    // </Suspense>
  );
}
// export default withAuth(Dashboard, "user");
