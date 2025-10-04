import { Dialog, Menu, Pagination } from "@ark-ui/solid";
import { EllipsisVertical, PencilIcon, TrashIcon, XIcon } from "lucide-solid";
import { createSignal, For, Show, type Accessor } from "solid-js";
import { Portal } from "solid-js/web";
import type { MembersResponse } from "../../types/member.types";
import Avatar from "./Avatar";
import Loader from "./Loader";
import MemberInfo from "./MemberInfo";
import CardStatusBadge from "./CardStatusBadge";
import EditMember from "./EditMember";

function MembersList(props: {
  membersData: Accessor<MembersResponse | undefined>;
  page: Accessor<number>;
  setPage: (p: number) => void;
  limit: Accessor<number>;
  setLimit: (l: number) => void;
  refetch: () => void;
}) {
  const [infoOpen, setInfoOpen] = createSignal(false);
  const [editOpen, setEditOpen] = createSignal(false);

  const [selectedMemberForInfo, setSelectedMemberForInfo] =
    createSignal<any>(null);
  const [selectedMemberForEdit, setSelectedMemberForEdit] =
    createSignal<any>(null);

  return (
    <Show when={props.membersData()} fallback={<Loader />}>
      {(res) => (
        <div class="bg-white border border-gray-200 w-full h-[60vh] md:w-[90vw] lg:w-[80vw] relative">
          <Dialog.Root
            open={infoOpen()}
            onOpenChange={(e) => setInfoOpen(e.open)}
          >
            <Portal>
              <Dialog.Backdrop class="fixed inset-0 bg-black/50 backdrop-blur-xs z-40" />
              <Dialog.Positioner class="fixed inset-0 flex items-center justify-center z-50">
                <Dialog.Content class="bg-white p-6 min-h-48 max-w-md w-full outline-none rounded">
                  <Show when={selectedMemberForInfo()}>
                    {(m) => <MemberInfo id={m().id} setOpen={setInfoOpen} />}
                  </Show>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <div class="overflow-x-auto flex-1 h-full">
            <table class="bg-white">
              <thead class="bg-gray-100 whitespace-nowrap">
                <tr>
                  <th class="p-4 text-left text-sm font-medium">Name</th>
                  <th class="p-4 text-left text-sm font-medium">Father Name</th>
                  <th class="p-4 text-left text-sm font-medium">CNIC</th>
                  <th class="p-4 text-left text-sm font-medium">Phone</th>
                  <th class="p-4 text-left text-sm font-medium">Address</th>
                  <th class="p-4 text-left text-sm font-medium">
                    Qualification
                  </th>
                  {/* <th class="p-4 text-left text-sm font-medium">
                    Card Issued At
                  </th>
                  <th class="p-4 text-left text-sm font-medium">
                    Card Expires At
                  </th>*/}
                  <th class="p-4 text-left text-sm font-medium">Card Status</th>
                  <th class="p-4 text-left text-sm font-semibold text-slate-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody class="whitespace-nowrap divide-y divide-gray-200">
                <For each={res().members}>
                  {(member) => (
                    <tr class="hover:bg-gray-50">
                      <td class="p-4 text-sm text-slate-900 font-medium">
                        <div
                          class="flex items-center cursor-pointer w-max"
                          onClick={() => {
                            setSelectedMemberForInfo(member);
                            setInfoOpen(true);
                          }}
                        >
                          <Avatar name={member.name} />
                          <div class="ml-4">
                            <p class="font-medium">{member.name}</p>
                            <p class="text-xs text-slate-500">
                              ID: {member.regNo}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        {member.fatherName}
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        {member.cnic}
                      </td>
                      <td class="p-4  text-sm text-slate-600 font-medium">
                        {member.phone}
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        <div class="max-w-32 truncate" title={member.address}>
                          {member.address}
                        </div>
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        {member.qualification}
                      </td>
                      {/* <td class="p-4 text-sm text-slate-600 font-medium">
                        {new Date(member.cardIssuedAt).toLocaleDateString()}
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        {new Date(member.cardExpiresAt).toLocaleDateString()}
                      </td>*/}
                      <td class="p-4">
                        <CardStatusBadge status={member.cardStatus} />
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        <Menu.Root>
                          <Menu.Trigger class="cursor-pointer hover:bg-gray-100 p-2 rounded outline-none">
                            <EllipsisVertical size={20} class="fill-gray-500" />
                          </Menu.Trigger>
                          <Menu.Positioner>
                            <Menu.Content class="bg-white outline-none border">
                              <Menu.Item
                                value="edit"
                                class="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                                onSelect={() => {
                                  setSelectedMemberForEdit(member);
                                  setEditOpen(true);
                                }}
                              >
                                <PencilIcon size={18} />
                                <span> Edit</span>
                              </Menu.Item>

                              <Menu.Item
                                value="delete"
                                class="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                                onSelect={() => {
                                  console.log("Delete clicked for", member.id);
                                }}
                              >
                                <TrashIcon size={18} />
                                <span> Delete</span>
                              </Menu.Item>
                            </Menu.Content>
                          </Menu.Positioner>
                        </Menu.Root>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
          <Dialog.Root
            open={editOpen()}
            onOpenChange={(e) => setEditOpen(e.open)}
          >
            <Portal>
              <Dialog.Backdrop class="fixed inset-0 bg-black/40 backdrop-blur-xs z-40" />
              <Dialog.Positioner class="fixed inset-0 flex items-center justify-center z-50">
                <Dialog.Content class="bg-white p-6 min-h-48 max-w-md w-full outline-none rounded">
                  <Dialog.Title class="text-lg font-semibold mb-4">
                    Edit Member
                  </Dialog.Title>

                  <Show when={selectedMemberForEdit()}>
                    {(m) => (
                      <EditMember
                        id={m().id}
                        setOpen={setEditOpen}
                        refetch={props.refetch}
                      />
                    )}
                  </Show>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <div class="w-3/4 flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-white  sticky bottom-0">
            <Pagination.Root
              count={res()?.total || 0}
              pageSize={res()?.limit || 10}
              page={res().page}
              onPageChange={(p) => {
                props.setPage(p.page);
                props.refetch();
              }}
              onPageSizeChange={(ps) => {
                props.setLimit(ps.pageSize);
                props.refetch();
              }}
            >
              <Pagination.Context>
                {(api) => (
                  <div class="flex flex-col md:flex-row items-center gap-6 w-full justify-between">
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <label class="font-medium">Rows per page:</label>
                      <select
                        class="border px-2 py-1 text-sm focus:ring-2 focus:ring-black outline-none"
                        value={api().pageSize}
                        onChange={(e) =>
                          api().setPageSize(Number(e.target.value))
                        }
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>

                    <div class="flex items-center gap-1">
                      <Pagination.PrevTrigger class="cursor-pointer px-3 py-1 border text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50">
                        Previous
                      </Pagination.PrevTrigger>

                      <For each={api().pages}>
                        {(page, index) =>
                          page.type === "page" ? (
                            <Pagination.Item
                              {...page}
                              class={`px-3 py-1 border text-sm cursor-pointer ${
                                page.value === api().page
                                  ? "bg-gray-100 text-black border-black border-[1.5px]"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {page.value}
                            </Pagination.Item>
                          ) : (
                            <Pagination.Ellipsis
                              index={index()}
                              class="px-2 text-gray-500"
                            >
                              &#8230;
                            </Pagination.Ellipsis>
                          )
                        }
                      </For>

                      <Pagination.NextTrigger class="cursor-pointer px-3 py-1 border text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50">
                        Next
                      </Pagination.NextTrigger>
                    </div>

                    <div class="text-sm text-gray-600">
                      Page{" "}
                      <span class="font-semibold text-gray-900">
                        {api().page}
                      </span>{" "}
                      of{" "}
                      <span class="font-semibold text-gray-900">
                        {api().totalPages}
                      </span>
                    </div>
                  </div>
                )}
              </Pagination.Context>
            </Pagination.Root>
          </div>
        </div>
      )}
    </Show>
  );
}

export default MembersList;
