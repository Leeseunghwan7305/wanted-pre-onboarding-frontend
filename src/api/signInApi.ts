import { instance } from "./axios";

export const signInApi = async (email: string, password: string) => {
  const body = {
    email,
    password,
  };
  return await instance.post("/auth/signin", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
