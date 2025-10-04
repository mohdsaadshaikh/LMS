import { createResource, Show, type Setter } from "solid-js";
import { memberService } from "../../lib/memberService";
import Loader from "./Loader";
import CardStatusBadge from "./CardStatusBadge";

const formatDate = (dateValue?: string | Date) =>
  dateValue ? new Date(dateValue).toLocaleDateString() : "—";

interface MemberInfoProps {
  id: string;
  setOpen: Setter<boolean>;
}

const MemberInfo = (props: MemberInfoProps) => {
  const fetchMember = async () => {
    const res = await memberService.getMember(props.id);
    return res.data;
  };

  const [memberData] = createResource(() => props.id, fetchMember);

  return (
    <div class="max-h-[70vh]">
      <Show when={!memberData.loading} fallback={<Loader />}>
        {memberData() && (
          <div class="bg-white rounded-lg">
            <div class="bg-gray-100 px-4 py-2 rounded">
              <InfoRow label="Name:" value={memberData()?.name} />
              <InfoRow label="Reg No:" value={memberData()?.regNo} />
              <InfoRow label="Father Name:" value={memberData()?.fatherName} />
              <InfoRow label="CNIC:" value={memberData()?.cnic} />
              <InfoRow label="Phone:" value={memberData()?.phone} />
              <InfoRow
                label="Qualification:"
                value={memberData()?.qualification}
              />
              <InfoRow
                label="Card Issued At:"
                value={formatDate(memberData()?.cardIssuedAt)}
              />
              <InfoRow
                label="Card Expires At:"
                value={formatDate(memberData()?.cardExpiresAt)}
              />
              <InfoRow
                label="Joined At:"
                value={formatDate(memberData()?.createdAt)}
              />

              <div class="flex items-center py-3">
                <span class="text-sm text-gray-700 font-medium min-w-[180px]">
                  Card Status:
                </span>
                <CardStatusBadge status={memberData()?.cardStatus ?? ""} />
              </div>
              <InfoRow label="Address:" value={memberData()?.address} />
            </div>
            <button
              class="btn w-full mt-2"
              onClick={() => props.setOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </Show>
    </div>
  );
};

const InfoRow = (props: { label: string; value?: string }) => (
  <div class="flex py-2">
    <span class="text-sm text-gray-700 font-medium min-w-[180px]">
      {props.label}
    </span>
    <span class="text-sm text-gray-900">{props.value || "—"}</span>
  </div>
);

export default MemberInfo;
