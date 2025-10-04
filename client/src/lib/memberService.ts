import type { AxiosResponse } from "axios";
import api from "../lib/axios";
import type { Member, MembersResponse } from "../types/member.types";

export const memberService = {
  getMembers: (page = 1, limit = 10): Promise<AxiosResponse<MembersResponse>> =>
    api.get(`/members?page=${page}&limit=${limit}`),

  getMember: (id: string): Promise<AxiosResponse<Member>> =>
    api.get(`/members/${id}`),

  addMember: (data: any): Promise<AxiosResponse<any>> =>
    api.post("/members", data),

  updateMember: (id: string, data: any): Promise<AxiosResponse<any>> =>
    api.patch(`/members/${id}`, data),

  deleteMember: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/members/${id}`),
};
