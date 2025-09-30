import { Field } from "@ark-ui/solid";
import { Show } from "solid-js";

type FormInputProps = {
  label: string;
  field: any;
  props: any;
  type?: string;
};

export const Input = (p: FormInputProps) => {
  return (
    <Field.Root class="fieldset w-full">
      <Field.Label class="text-sm font-light">{p.label}</Field.Label>
      <Field.Input
        {...p.props}
        type={p.type || "text"}
        class="input w-full rounded-none"
      />
      <Show when={p.field.error}>
        <span class="text-red-500 text-sm">{p.field.error}</span>
      </Show>
    </Field.Root>
  );
};
