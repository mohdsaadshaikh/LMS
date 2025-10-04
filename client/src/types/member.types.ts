export interface MembersResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
  members: Member[];
}

export interface Member {
  id: string;
  name: string;
  fatherName: string;
  cnic: string;
  phone: string;
  address: string;
  qualification: string;
  regNo: string;

  cardIssuedAt: Date;
  cardExpiresAt: Date;
  cardStatus: string;

  createdAt: Date;
  updatedAt: Date;
}
