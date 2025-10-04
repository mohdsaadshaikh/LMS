import { createListCollection, Field } from "@ark-ui/solid";
import { createForm, valiForm } from "@modular-forms/solid";
import type { AxiosError } from "axios";
import { createEffect, createResource, createSignal, Show } from "solid-js";
import * as v from "valibot";
import { memberService } from "../../lib/memberService";
import { CardStatus } from "../../utils/constant";
import { toaster } from "./AppToaster";
import type { Member } from "../../types/member.types";

const convertToObj = (arr: string[]) => {
  const obj = JSON.stringify(Object.assign({}, arr));
  return JSON.parse(obj);
};

const memberSchema = v.object({
  name: v.pipe(v.string()),
  fatherName: v.pipe(v.string()),
  cnic: v.pipe(v.string()),
  phone: v.pipe(v.string()),
  qualification: v.pipe(v.string()),
  regNo: v.pipe(v.string()),
  address: v.pipe(v.string()),
  cardStatus: v.enum(convertToObj(CardStatus)),
});

type EditMemberData = v.InferInput<typeof memberSchema>;

const EditMember = (prop: {
  setOpen: (open: boolean) => void;
  id: string;
  refetch: () => void;
}) => {
  const [loading, setLoading] = createSignal(false);
  const [errMsg, setErrMsg] = createSignal<string | null>(null);

  const fetchMember = async () => {
    const res = await memberService.getMember(prop.id);
    return res.data;
  };

  const [memberData] = createResource(() => prop.id, fetchMember);

  const [editMemberForm, Member] = createForm<EditMemberData>({
    validate: valiForm(memberSchema),
  });

  const handleSubmit = async (values: EditMemberData) => {
    setLoading(true);
    setErrMsg(null);
    try {
      await memberService.updateMember(prop.id, values);
      toaster.create({
        title: "success",
        description: `Member updated Successfully`,
        type: "success",
      });
      prop.refetch();
    } catch (err) {
      const axiosErr = err as AxiosError<{ error: string }>;
      const message =
        axiosErr.response?.data?.error ||
        (err instanceof Error ? err.message : "Something went wrong");
      setErrMsg(message);
      toaster.create({
        title: "Error",
        description: errMsg(),
        type: "error",
      });
    } finally {
      prop.setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Member.Form onSubmit={handleSubmit}>
      <Member.Field name="name">
        {(field, props) => (
          <Field.Root class="fieldset w-full">
            <Field.Label class="text-sm font-light">Name</Field.Label>
            <Field.Input
              {...props}
              class="input w-full rounded-none"
              value={memberData()?.name}
            />
            <Show when={field.error}>
              <span class="text-red-500 text-sm">{field.error}</span>
            </Show>
          </Field.Root>
        )}
      </Member.Field>
      <div class="flex gap-3">
        <Member.Field name="fatherName">
          {(field, props) => (
            <Field.Root class="fieldset w-full">
              <Field.Label class="text-sm font-light">Father Name</Field.Label>
              <Field.Input
                {...props}
                class="input w-full rounded-none"
                value={memberData()?.fatherName}
              />
              <Show when={field.error}>
                <span class="text-red-500 text-sm">{field.error}</span>
              </Show>
            </Field.Root>
          )}
        </Member.Field>
        <Member.Field name="phone">
          {(field, props) => (
            <Field.Root class="fieldset w-full">
              <Field.Label class="text-sm font-light">Phone</Field.Label>
              <Field.Input
                {...props}
                class="input w-full rounded-none"
                value={memberData()?.phone}
              />
              <Show when={field.error}>
                <span class="text-red-500 text-sm">{field.error}</span>
              </Show>
            </Field.Root>
          )}
        </Member.Field>
      </div>
      <Member.Field name="cnic">
        {(field, props) => (
          <Field.Root class="fieldset w-full">
            <Field.Label class="text-sm font-light">CNIC</Field.Label>
            <Field.Input
              {...props}
              class="input w-full rounded-none"
              value={memberData()?.cnic}
            />
            <Show when={field.error}>
              <span class="text-red-500 text-sm">{field.error}</span>
            </Show>
          </Field.Root>
        )}
      </Member.Field>
      <div class="flex gap-3">
        <Member.Field name="qualification">
          {(field, props) => (
            <Field.Root class="fieldset w-full">
              <Field.Label class="text-sm font-light">
                Qualification
              </Field.Label>
              <Field.Input
                {...props}
                class="input w-full rounded-none"
                value={memberData()?.qualification}
              />
              <Show when={field.error}>
                <span class="text-red-500 text-sm">{field.error}</span>
              </Show>
            </Field.Root>
          )}
        </Member.Field>
        <Member.Field name="regNo">
          {(field, props) => (
            <Field.Root class="fieldset w-full">
              <Field.Label class="text-sm font-light">Reg No.</Field.Label>
              <Field.Input
                {...props}
                class="input w-full rounded-none"
                value={memberData()?.regNo}
              />
              <Show when={field.error}>
                <span class="text-red-500 text-sm">{field.error}</span>
              </Show>
            </Field.Root>
          )}
        </Member.Field>
      </div>
      <Member.Field name="cardStatus">
        {(field, props) => (
          <Field.Root class="fieldset w-full">
            <Field.Label class="text-sm font-light">Card Status</Field.Label>
            <select
              class="select w-full rounded-none"
              value={memberData()?.cardStatus}
              {...props}

              // onInput={field.onInput}
            >
              <option disabled value="">
                Select Card Status
              </option>
              {CardStatus.map((status) => (
                <option value={status}>{status}</option>
              ))}
            </select>

            <Show when={field.error}>
              <span class="text-red-500 text-sm">{field.error}</span>
            </Show>
          </Field.Root>
        )}
      </Member.Field>

      <Member.Field name="address">
        {(field, props) => (
          <Field.Root class="fieldset">
            <Field.Label class="text-sm font-light">Address</Field.Label>
            <Field.Textarea
              class="textarea h-20 w-full rounded-none"
              {...props}
              value={memberData()?.address}
            />
            <Show when={field.error}>
              <span class=" text-red-500">{field.error}</span>
            </Show>
          </Field.Root>
        )}
      </Member.Field>
      <div class="flex items-center justify-end gap-4 mt-4">
        <button
          class="btn rounded-none border border-black"
          type="reset"
          onClick={() => prop.setOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn rounded-none border border-black bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          disabled={loading()}
        >
          {loading() ? "Editing..." : "Edit Member"}
        </button>
      </div>
    </Member.Form>
  );
};

export default EditMember;
