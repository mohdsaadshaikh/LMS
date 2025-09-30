import { createResource, createSignal } from "solid-js";
import { memberService } from "../../lib/memberService";
import MembersList from "./MembersList";
import { PlusIcon, XIcon } from "lucide-solid";
import { Dialog } from "@ark-ui/solid";
import { Portal } from "solid-js/web";
import AddMember from "./AddMember";

export const Members = () => {
  const [page, setPage] = createSignal(1);
  const [limit, setLimit] = createSignal(10);
  const [open, setOpen] = createSignal(false);

  const fetchMembers = async () => {
    const res = await memberService.getMembers(page(), limit());
    return res.data;
  };

  const [membersData, { refetch }] = createResource(fetchMembers);

  return (
    <>
      <div class="w-full flex flex-col justify-center items-center">
        <div class="w-full flex justify-between items-center mb-6 mx-2">
          <div class="text-3xl">All Members</div>
          <Dialog.Root open={open()} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger>
              <button class="btn rounded-none bg-gray-100 hover:bg-gray-200">
                <PlusIcon size={18} />
                <span>Add Members</span>
              </button>
            </Dialog.Trigger>

            <Portal>
              <Dialog.Backdrop class="fixed inset-0 bg-black/50 z-40" />
              <Dialog.Positioner class="fixed inset-0 flex items-center justify-center z-50">
                <Dialog.Content class="bg-white p-6 min-h-48 max-w-md w-full">
                  <div class="flex justify-between items-center mb-4">
                    <Dialog.Title class="text-xl font-medium">
                      Add New Member
                    </Dialog.Title>
                    <span
                      onClick={() => setOpen(false)}
                      class="cursor-pointer p-2 hover:bg-gray-200 transition-all text-gray-700"
                    >
                      <XIcon size={22} />
                    </span>
                  </div>

                  <AddMember setOpen={setOpen} />
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </div>

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
