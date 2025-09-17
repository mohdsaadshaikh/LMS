import { Show, onMount, createEffect, type JSX } from "solid-js";
import { authStore } from "../../lib/authStore";
import Loader from "./Loader";

export default function LoginGuard(props: { children: JSX.Element }) {
  onMount(() => {
    authStore.fetchUser();
  });

  createEffect(() => {
    if (!authStore.loading() && authStore.user()) {
      window.location.replace("/");
    }
  });

  return (
    <Show
      when={!authStore.loading() && !authStore.user()}
      fallback={<Loader />}
    >
      {props.children}
    </Show>
  );
}
