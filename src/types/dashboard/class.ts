export type GetAllClassSettingResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    user_id: string;
    permission: string;
    status: string;
  }[];
  meta: {
    take: number;
    page: number;
    total_data: number;
    total_page: number;
    sort: string;
    sort_by: string;
  }[];
};

export type GetMeResponse = {
  personal_info: {
    id: string;
    username: string;
    email: string;
    phone_number: string;
  };
};
