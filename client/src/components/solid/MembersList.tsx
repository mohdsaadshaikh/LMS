import { For, Show, type Accessor } from "solid-js";
import type { Member, MembersResponse } from "../../types/member.types";
import Loader from "./Loader";

const MembersList = (props: {
  members: Accessor<Member[] | undefined>;
  //   loading: Accessor<boolean>;
}) => {
  return (
    <>
      <Show when={props.members()} fallback={<Loader />}>
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Father Name</th>
                <th>CNIC</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Qualification</th>
                <th>Reg No</th>
                <th>Card Issued At</th>
                <th>Card Expires At</th>
                <th>Card Status</th>
              </tr>
            </thead>
            <tbody>
              <For each={props.members()}>
                {(member) => (
                  <tr>
                    <td>{member.name}</td>
                    <td>{member.fatherName}</td>
                    <td>{member.cnic}</td>
                    <td>{member.phone}</td>
                    <td>{member.address}</td>
                    <td>{member.qualification}</td>
                    <td>{member.regNo}</td>
                    <td>{member.cardIssuedAt}</td>
                    <td>{member.cardExpiresAt}</td>
                    <td>{member.cardStatus}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Show>
    </>
  );
};

export default MembersList;
