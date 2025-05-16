export interface CreatePlan {
  name: string;
  workspace_id: string;
}

export type CardPlanProps = {
  id: string;
  name: string;
};

// types.ts (atau bisa di file ini langsung untuk sementara)
export type Plan = {
  id: string;
  name: string;
  dosen: string;
  date: string;
  status: "on_plan" | "not_plan";
  hari: string;
};

export type DayPlans = {
  hari: string;
  plans: Plan[];
};
