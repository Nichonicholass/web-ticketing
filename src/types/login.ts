export type LoginRequest = {
  phone_number: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    phone: string;
  };
};

export type User = {
  id: string;
  name: string;
  phone: string;
  token?: string;
};