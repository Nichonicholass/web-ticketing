export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  phone_number: string;
};

export type RegisterResponse = {
  id: string;
  username: string;
  email: string;
  phone_number: string;
};
