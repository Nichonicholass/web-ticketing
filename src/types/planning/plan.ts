export interface CreatePlan {
  name: string;
  workspace_id: string;
}

export interface Plan {
  id: string;
  name: string;
  workspace_id: string;
}

export type CardPlanProps = {
  id: string;
  name: string;
};
