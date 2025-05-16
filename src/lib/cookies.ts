// import Cookies from "universal-cookie";

// const cookies = new Cookies();

// export const getToken = (): string => cookies.get("@nexttemplate/token");

// export const setToken = (token: string) => {
//   cookies.set("@nexttemplate/token", token, { path: "/" });
// };

// export const removeToken = () =>
//   cookies.remove("@nexttemplate/token", { path: "/" });

import Cookies from "universal-cookie";

const cookies = new Cookies();
const TOKEN_KEY = "nexttemplate_token";

export const getToken = (): string => cookies.get(TOKEN_KEY);

export const setToken = (token: string) => {
  cookies.set(TOKEN_KEY, token, { path: "/" });
};

export const removeToken = () => {
  cookies.remove(TOKEN_KEY, { path: "/" });
};
