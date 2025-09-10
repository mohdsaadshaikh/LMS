import { Field, PasswordInput } from "@ark-ui/solid";
import { createForm, valiForm } from "@modular-forms/solid";
import * as v from "valibot";
import { EyeIcon, EyeOffIcon } from "lucide-solid";
import { Show } from "solid-js";

const loginSchema = v.object({
  username: v.pipe(v.string(), v.nonEmpty("Please enter your username.")),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your password."),
    v.minLength(8, "You password must have 8 characters or more.")
  ),
});

type LoginFormData = v.InferInput<typeof loginSchema>;

const LoginForm = () => {
  const [loginForm, Login] = createForm<LoginFormData>({
    validate: valiForm(loginSchema),
  });

  const handleSubmit = (values: LoginFormData) => {
    console.log("✅ Submitted values:", values);
  };

  return (
    <div class="flex min-h-screen items-center justify-center light:bg-gray-100">
      <div class="w-full max-w-sm rounded-lg light:bg-white border px-6 py-8 ">
        <div class="flex justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 tracking-tight">
              LOGIN
            </h2>
            <p class="mt-1 text-gray-500 text-base">
              to continue to your account
            </p>
          </div>
          <img src="/logo.png" class="w-14 h-14" alt="logo" />
        </div>

        <Login.Form onSubmit={handleSubmit}>
          <Login.Field name="username">
            {(field, props) => (
              <Field.Root class="fieldset">
                <Field.Label class="text-sm font-light">Username</Field.Label>
                <Field.Input
                  {...props}
                  class="input w-full"
                  type="text"
                  required
                  name="username"
                />
                <Show when={field.error}>
                  <span class=" text-red-500">{field.error}</span>
                </Show>
              </Field.Root>
            )}
          </Login.Field>
          <Login.Field name="password">
            {(field, props) => (
              <PasswordInput.Root class="fieldset">
                <PasswordInput.Label class="text-sm font-light">
                  Password
                </PasswordInput.Label>
                <PasswordInput.Control class="input w-full">
                  <PasswordInput.Input {...props} />
                  <PasswordInput.VisibilityTrigger>
                    <PasswordInput.Indicator
                      fallback={<EyeOffIcon size={18} />}
                    >
                      <EyeIcon size={18} />
                    </PasswordInput.Indicator>
                  </PasswordInput.VisibilityTrigger>
                </PasswordInput.Control>
                <Show when={field.error}>
                  <span class=" text-red-500">{field.error}</span>
                </Show>
              </PasswordInput.Root>
            )}
          </Login.Field>
          <button type="submit" class="btn w-full mt-3">
            Login
          </button>
        </Login.Form>
      </div>
    </div>
  );
};
export default LoginForm;
