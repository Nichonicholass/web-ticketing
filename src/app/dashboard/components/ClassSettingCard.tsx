import { PlanningCardProps } from "@/types/dashboard/card";
import Button from "../../../components/buttons/Button";
import Typography from "../../../components/Typography";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import { useRouter } from "next/navigation";

function ClassSettingCard({ title, description }: PlanningCardProps) {
  const router = useRouter();

  return (
    <Card className="w-[434px] text-black rounded-[6px]">
      <CardHeader className="pb-0">
        <Typography variant="h6" className="font-bold">
          {title}
        </Typography>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between mt-6">
        <Button
          size="sm"
          className="bg-slate-900 border-slate-900 px-[32px] py-[8px] hover:bg-slate-800 active:bg-slate-700"
          onClick={() => {
            router.push("/setting-kelas");
          }}
        >
          Setting Kelas
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ClassSettingCard;
