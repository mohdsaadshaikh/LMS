import { createSignal } from "solid-js";
import { authService, type User } from "../lib/authService";

const [user, setUser] = createSignal<User | null>(null);
const [loading, setLoading] = createSignal(true);

export async function fetchUser() {
  try {
    const res = await authService.me();
    if (res) {
      setUser(res.data.user);
    } else {
      setUser(null);
    }
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
}

export const authStore = {
  user,
  loading,
  fetchUser,
  setUser,
};
