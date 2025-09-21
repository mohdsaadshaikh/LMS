import api from "../lib/axios";
import type { AxiosResponse } from "axios";

export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
}

export const authService = {
  login: (values: {
    username: string;
    password: string;
  }): Promise<AxiosResponse<{ user: User }>> => api.post("/auth/login", values),

  logout: (): Promise<AxiosResponse<void>> => api.get("/auth/logout"),

  me: (): Promise<AxiosResponse<{ user: User }>> => api.get("/auth/me"),
};
