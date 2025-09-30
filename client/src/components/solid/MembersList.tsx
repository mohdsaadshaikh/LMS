import { Pagination } from "@ark-ui/solid";
import { EllipsisVertical } from "lucide-solid";
import { For, Show, type Accessor } from "solid-js";
import type { MembersResponse } from "../../types/member.types";
import Loader from "./Loader";
import Avatar from "./Avatar";

function MembersList(props: {
  membersData: Accessor<MembersResponse | undefined>;
  page: Accessor<number>;
  setPage: (p: number) => void;
  limit: Accessor<number>;
  setLimit: (l: number) => void;
  refetch: () => void;
}) {
  return (
    <Show when={props.membersData()} fallback={<Loader />}>
      {(res) => (
        <div class="bg-white border border-gray-200 w-full h-[60vh] md:w-[90vw] lg:w-[80vw] relative">
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
                  <th class="p-4 text-left text-sm font-medium">Reg No</th>
                  <th class="p-4 text-left text-sm font-medium">
                    Card Issued At
                  </th>
                  <th class="p-4 text-left text-sm font-medium">
                    Card Expires At
                  </th>
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
                        <div class="flex items-center cursor-pointer w-max">
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
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        {member.regNo}
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        {new Date(member.cardIssuedAt).toLocaleDateString()}
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        {new Date(member.cardExpiresAt).toLocaleDateString()}
                      </td>
                      <td class="p-4">
                        <span
                          class={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            member.cardStatus === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : member.cardStatus === "BLOCKED"
                              ? "bg-yellow-100 text-yellow-800"
                              : member.cardStatus === "EXPIRED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {member.cardStatus}
                        </span>
                      </td>
                      <td class="p-4 text-sm text-slate-600 font-medium">
                        <button
                          class="cursor-pointer hover:bg-gray-100 p-2 rounded"
                          title="More Options"
                        >
                          <EllipsisVertical size={20} class="fill-gray-500" />
                        </button>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>

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
