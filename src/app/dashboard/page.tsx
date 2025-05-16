"use client";

import Button from "@/components/buttons/Button";
import Typography from "@/components/Typography";
import ClassSettingCard from "@/app/dashboard/components/ClassSettingCard";
import SearchInput from "@/components/ui/search-input";
import MainLayout from "@/layouts/Layout";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import {
  useGetAllClassSetting,
  useGetAllClassSettingPrivate,
} from "@/hooks/class";

function Dashboard() {
  const router = useRouter();

  const { getAllClassSetting } = useGetAllClassSetting();
  const { getAllClassSettingPrivate } = useGetAllClassSettingPrivate();

  const { data: allClassSetting, isLoading: isLoadingClassSetting } = useQuery({
    queryKey: ["allClassSetting"],
    queryFn: async () => {
      return await getAllClassSetting();
    },
  });

  const {
    data: allClassSettingPrivate,
    isLoading: isLoadingClassSettingPrivate,
  } = useQuery({
    queryKey: ["allClassSettingPrivate"],
    queryFn: async () => {
      return await getAllClassSettingPrivate();
    },
  });

  return (
    <MainLayout withNavbar withFooter={false}>
      <div className="px-[52px] py-[32px] flex flex-col gap-3">
        <Typography variant="h5" className="font-bold text-3xl">
          Hallo, Sadam!
        </Typography>

        <div className="flex flex-col md:flex-row justify-between gap-3">
          <SearchInput />
          <Button
            className="bg-slate-900 border-slate-900 px-[48px] py-[8px] hover:bg-slate-800 active:bg-slate-700"
            leftIcon={FiPlus}
            onClick={() => {
              router.push("/add-plan");
            }}
          >
            Buat Plan Baru
          </Button>
        </div>

        <Typography variant="h5" className="font-bold mb-3 text-3xl">
          Setting Kelasmu!
        </Typography>

        <div className="flex flex-wrap gap-4">
          {isLoadingClassSettingPrivate && (
            <div className="flex justify-center items-center h-full w-full text-gray-500">
              Loading...
            </div>
          )}
          {allClassSettingPrivate?.map((classItem) => (
            <ClassSettingCard
              key={classItem.id}
              title={classItem.name}
              description={classItem.name}
            />
          ))}
        </div>

        {allClassSettingPrivate?.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Tidak ada pilihan yang tersedia
          </div>
        )}

        <Typography variant="h5" className="font-bold my-3 text-3xl">
          Pilihan Lainnya!
        </Typography>

        <div className="flex flex-wrap gap-4">
          {isLoadingClassSetting && (
            <div className="flex justify-center items-center h-full w-full text-gray-500">
              Loading...
            </div>
          )}
          {allClassSetting?.map((classItem) => (
            <ClassSettingCard
              key={classItem.id}
              title={classItem.name}
              description={classItem.name}
            />
          ))}
        </div>

        {allClassSetting?.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Tidak ada pilihan yang tersedia
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
