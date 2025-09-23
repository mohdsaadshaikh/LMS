import { Dialog } from "@ark-ui/solid";
import {
  Book,
  BookOpenIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  Users,
  XIcon,
} from "lucide-solid";
import { createSignal } from "solid-js";
import Logo from "./Logo";
import { authService } from "../../lib/authService";
import { toaster } from "./AppToaster";

const NavContent = () => {
  const handleLogout = async () => {
    try {
      const res = await authService.logout();
      console.log(res);
      toaster.create({
        title: "Logout successful",
        // description: res.data,
        type: "success",
      });
      window.location.replace("/login");
    } catch (error) {
      toaster.create({
        title: "Logout failed",
        description: "Please try again.",
        type: "error",
      });
    }
  };
  return (
    <>
      <nav class="flex-1 space-y-1">
        <a href="/" class="nav-item" aria-current="page">
          <HomeIcon size={18} aria-hidden="true" /> Home
        </a>
        <a href="/members" class="nav-item">
          <Users size={18} aria-hidden="true" /> Members
        </a>
        <a href="/books" class="nav-item">
          <BookOpenIcon size={18} aria-hidden="true" /> Books
        </a>
        <a href="/settings" class="nav-item">
          <SettingsIcon size={18} aria-hidden="true" /> Settings
        </a>
      </nav>

      <button
        onClick={handleLogout}
        class="flex items-center gap-3 px-4 py-2.5 mt-4 text-sm font-medium cursor-pointer hover:border-red-600 border-[1.5px] border-white text-red-600 transition-colors duration-200"
        aria-label="Logout"
      >
        <LogOutIcon size={18} /> Logout
      </button>
    </>
  );
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div class="flex sticky">
      <button
        class="fixed top-4 right-4 z-50 
         p-2 rounded-full 
         bg-white shadow-md 
         border hover:bg-gray-100 
         focus:outline-none focus:ring-2 focus:ring-black md:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon size={22} class="text-gray-700" />
      </button>
      <aside class="hidden md:flex flex-col bg-white w-64 border-r-[1.5px] min-h-screen p-4">
        <div class="flex flex-col h-full ">
          <div class="mb-6 ml-3">
            <Logo />
          </div>
          <div class="flex flex-col h-full bg-white">
            <NavContent />
          </div>
        </div>
      </aside>

      <Dialog.Root open={isOpen()} onOpenChange={(e) => setIsOpen(e.open)}>
        <Dialog.Backdrop class="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Positioner class="fixed inset-y-0 left-0 w-64 z-50">
          <Dialog.Content
            class="flex flex-col h-full shadow-lg bg-white"
            aria-label="Mobile navigation"
          >
            <div class="flex flex-col h-full p-3">
              <div class="flex items-center justify-between mb-6 ml-3">
                <Logo />
                <button
                  class="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <XIcon size={20} />
                </button>
              </div>
              <NavContent />
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  );
}
