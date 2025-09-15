import { onMount, Show, createEffect, type JSX } from "solid-js";
import { authStore } from "../../lib/authStore";

export default function AuthGuard(props: { children: JSX.Element }) {
  onMount(() => {
    authStore.fetchUser();
  });

  createEffect(() => {
    const isLoading = authStore.loading();
    const currentUser = authStore.user();

    if (!isLoading && !currentUser) {
      window.location.href = "/login";
    }
  });

  return (
    <Show when={!authStore.loading()} fallback={<div>Loading...</div>}>
      <Show when={authStore.user()}>{props.children}</Show>
    </Show>
  );
}
