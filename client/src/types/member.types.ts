export interface MembersResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
  members: Member[];
}

export interface Member {
  name: string;
  fatherName: string;
  cnic: string;
  phone: string;
  address: string;
  qualification: string;
  regNo: string;

  cardIssuedAt: string;
  cardExpiresAt: string;
  cardStatus: string;

  createdAt: string;
  updatedAt: string;
}
