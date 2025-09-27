import { createResource, createSignal } from "solid-js";
import { memberService } from "../../lib/memberService";
import MembersList from "./MembersList";

export const Members = () => {
  const [page, setPage] = createSignal(1);
  const [limit, setLimit] = createSignal(10);

  const fetchMembers = async () => {
    const res = await memberService.getMembers(page(), limit());
    return res.data;
  };

  const [membersData, { refetch }] = createResource(fetchMembers);

  return (
    <>
      <div class="w-full flex flex-col justify-center items-center ">
        <MembersList
          membersData={membersData}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          refetch={refetch}
        />
      </div>
    </>
  );
};
