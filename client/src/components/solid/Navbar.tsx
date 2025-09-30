import { createSignal } from "solid-js";
import { authStore } from "../../lib/authStore";
import Avatar from "./Avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");

  const handleSearch = (e: Event) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery());
  };

  return (
    <nav class="bg-white border-b  px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[8vh] gap-4 sticky top-0 z-40">
      <div class="w-full flex justify-end">
        <Avatar
          name={authStore?.user()?.name ?? ""}
          styles="border-black border"
        />
      </div>
    </nav>
  );
}
