export type RegisterRequest = {
  name: string;
  phone_number: string;
  password: string;
};

export type RegisterResponse = {
  user_id: string;
  name: string;
  phone_number: string;
};