import { createResource } from "solid-js";
import { memberService } from "../../lib/memberService";
import MembersList from "./MembersList";

const fetchMembers = async () => {
  const res = await memberService.getMembers();
  return res.data.members;
};

export const Members = () => {
  const [members] = createResource(fetchMembers);

  return <MembersList members={members} />;
};
