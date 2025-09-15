import { Show, onMount, createEffect, type JSX } from "solid-js";
import { authStore } from "../../lib/authStore";

export default function LoginGuard(props: { children: JSX.Element }) {
  onMount(() => {
    authStore.fetchUser();
  });

  createEffect(() => {
    if (!authStore.loading() && authStore.user()) {
      window.location.href = "/";
    }
  });

  return (
    <Show
      when={!authStore.loading() && !authStore.user()}
      fallback={<div>Loading...</div>}
    >
      {props.children}
    </Show>
  );
}
