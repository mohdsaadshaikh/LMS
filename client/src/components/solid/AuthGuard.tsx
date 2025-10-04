import { onMount, Show, createEffect, type JSX } from "solid-js";
import { authStore } from "../../lib/authStore";
import Loader from "./Loader";

export default function AuthGuard(props: { children: JSX.Element }) {
  onMount(() => {
    authStore.fetchUser();
  });

  createEffect(() => {
    const isLoading = authStore.loading();
    const currentUser = authStore.user();

    if (!isLoading && !currentUser) {
      window.location.replace("/login");
    }
  });

  return (
    <Show
      when={!authStore.loading()}
      fallback={
        <div class="h-screen flex justify-center items-center">
          <Loader />
        </div>
      }
    >
      <Show when={authStore.user()}>{props.children}</Show>
    </Show>
  );
}
