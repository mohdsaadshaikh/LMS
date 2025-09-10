import { Field } from "@ark-ui/solid";
import { createSignal } from "solid-js";

interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "password" | "tel" | "url";
  placeholder?: string;
  value: () => string;
  onInput: (value: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
  icon?: string;
  showPasswordToggle?: boolean;
}

const InputField = (props: FormFieldProps) => {
  const [showPassword, setShowPassword] = createSignal(false);
  const [focused, setFocused] = createSignal(false);

  const isPassword = () => props.type === "password";
  const inputType = () => {
    if (isPassword()) {
      return showPassword() ? "text" : "password";
    }
    return props.type || "text";
  };

  return (
    <Field.Root class="space-y-2">
      <Field.Label class="block text-sm font-semibold text-gray-700">
        {props.label}
        {props.required && <span class="text-red-500 ml-1">*</span>}
      </Field.Label>

      <div class="relative">
        {props.icon && (
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
            {props.icon}
          </div>
        )}

        <Field.Input
          type={inputType()}
          value={props.value()}
          onInput={(e) => props.onInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={props.placeholder}
          required={props.required}
          class={`
            w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none
            ${props.icon ? "pl-12" : ""}
            ${isPassword() && props.showPasswordToggle !== false ? "pr-12" : ""}
            ${
              props.error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                : focused()
                ? "border-purple-500 bg-white focus:ring-purple-200"
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }
            focus:ring-4 focus:ring-opacity-20
          `}
        />

        {isPassword() && props.showPasswordToggle !== false && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword())}
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-xl"
          >
            {showPassword() ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {props.error && (
        <Field.ErrorText class="text-sm text-red-600 flex items-center gap-1">
          <span>⚠️</span> {props.error}
        </Field.ErrorText>
      )}

      {props.helperText && !props.error && (
        <Field.HelperText class="text-sm text-gray-500">
          {props.helperText}
        </Field.HelperText>
      )}
    </Field.Root>
  );
};

export default InputField;
