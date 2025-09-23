import type { AxiosResponse } from "axios";
import api from "../lib/axios";
import type { MembersResponse } from "../types/member.types";

export const memberService = {
  getMembers: (): Promise<AxiosResponse<MembersResponse>> =>
    api.get("/members"),

  getMember: (id: string): Promise<AxiosResponse<any>> =>
    api.get(`/members/${id}`),

  addMember: (data: any): Promise<AxiosResponse<any>> =>
    api.post("/members", data),

  updateMember: (id: string, data: any): Promise<AxiosResponse<any>> =>
    api.patch(`/members/${id}`, data),

  deleteMember: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/members/${id}`),
};
