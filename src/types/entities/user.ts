export type User = {
  personal_info: {
    name: string;
    email: string;
    instansi: string;
    no_telp: string;
  };
};

export type WithToken = {
  token: string;
};
