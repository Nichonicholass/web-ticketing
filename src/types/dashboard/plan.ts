export type GetAllPlanResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    workspace_id: string;
  }[];
  meta: {
    take: number;
    page: number;
    total_data: number;
    total_page: number;
    sort: string;
    sort_by: string;
  };
};
