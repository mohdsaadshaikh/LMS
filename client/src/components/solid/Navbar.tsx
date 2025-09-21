import { createSignal } from "solid-js";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");

  const handleSearch = (e: Event) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery());
  };

  return (
    <nav class="border-b-[1.5px] px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[8vh] gap-4">
      <Logo />
    </nav>
  );
}
