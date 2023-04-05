import { instance } from "./axios";

export const signUpApi = async (email: string, password: string) => {
  const body = {
    email,
    password,
  };
  return await instance.post("/auth/signup", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
