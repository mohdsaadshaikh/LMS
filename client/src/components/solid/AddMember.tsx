import { Field } from "@ark-ui/solid";
import { createForm, valiForm } from "@modular-forms/solid";
import { EyeIcon, EyeOffIcon } from "lucide-solid";
import { createSignal, Show } from "solid-js";
import * as v from "valibot";
import { toaster } from "./AppToaster";
import { Input } from "./Input";
import { memberService } from "../../lib/memberService";
import type { AxiosError } from "axios";

const memberSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please enter name")),
  fatherName: v.pipe(v.string(), v.nonEmpty("Please enter Father Name.")),
  cnic: v.pipe(v.string(), v.nonEmpty("Please enter CNIC.")),
  phone: v.pipe(v.string(), v.nonEmpty("Please enter Phone.")),
  qualification: v.pipe(v.string(), v.nonEmpty("Please enter Qualification.")),
  regNo: v.pipe(v.string(), v.nonEmpty("Please enter Registration No.")),
  address: v.pipe(v.string(), v.nonEmpty("Please enter Address.")),
});

type AddMemberData = v.InferInput<typeof memberSchema>;

const AddMember = (props: { setOpen: (open: boolean) => void }) => {
  const [loading, setLoading] = createSignal(false);
  const [errMsg, setErrMsg] = createSignal<string | null>(null);

  const [addMemberForm, Member] = createForm<AddMemberData>({
    validate: valiForm(memberSchema),
  });

  const handleSubmit = async (values: AddMemberData) => {
    setLoading(true);
    setErrMsg(null);
    try {
      await memberService.addMember(values);
      toaster.create({
        title: "success",
        description: `Member created Successfully`,
        type: "success",
      });
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
      props.setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Member.Form onSubmit={handleSubmit}>
      <Member.Field name="name">
        {(field, props) => <Input label="Name" field={field} props={props} />}
      </Member.Field>
      <div class="flex gap-3">
        <Member.Field name="fatherName">
          {(field, props) => (
            <Input label="Father Name" field={field} props={props} />
          )}
        </Member.Field>
        <Member.Field name="phone">
          {(field, props) => (
            <Input label="Phone" field={field} props={props} />
          )}
        </Member.Field>
      </div>
      <Member.Field name="cnic">
        {(field, props) => <Input label="CNIC" field={field} props={props} />}
      </Member.Field>
      <div class="flex gap-3">
        <Member.Field name="qualification">
          {(field, props) => (
            <Input label="Qualification" field={field} props={props} />
          )}
        </Member.Field>
        <Member.Field name="regNo">
          {(field, props) => (
            <Input label="Registration No." field={field} props={props} />
          )}
        </Member.Field>
      </div>
      <Member.Field name="address">
        {(field, props) => (
          <Field.Root class="fieldset">
            <Field.Label class="text-sm font-light">Address</Field.Label>
            <Field.Textarea
              class="textarea h-20 w-full rounded-none"
              {...props}
              name="address"
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
          onClick={() => props.setOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn rounded-none border border-black bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          disabled={loading()}
        >
          {loading() ? "Adding..." : "Add Member"}
        </button>
      </div>
    </Member.Form>
  );
};

export default AddMember;
