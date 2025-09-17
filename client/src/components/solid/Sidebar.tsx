import { Dialog } from "@ark-ui/solid";
import {
  BookOpenIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-solid";
import { createSignal } from "solid-js";

export default function Sidebar() {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div class="flex">
      <button
        class="p-2 m-2 rounded-lg border bg-white shadow-sm md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon size={22} class="text-gray-700" />
      </button>
      <aside class="hidden md:flex flex-col w-64 border-r bg-white min-h-screen p-4">
        <div class="flex flex-col h-full">
          <nav class="flex-1 space-y-1" aria-label="Main navigation">
            <a
              href="/"
              class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
              aria-current="page"
            >
              <HomeIcon size={18} aria-hidden="true" /> Home
            </a>
            <a
              href="/courses"
              class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
            >
              <BookOpenIcon size={18} aria-hidden="true" /> Courses
            </a>
            <a
              href="/profile"
              class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
            >
              <UserIcon size={18} aria-hidden="true" /> Profile
            </a>
            <a
              href="/settings"
              class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
            >
              <SettingsIcon size={18} aria-hidden="true" /> Settings
            </a>
          </nav>

          <button
            onClick={handleLogout}
            class="flex items-center gap-3 px-4 py-2.5 mt-4 text-sm font-medium rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200"
            aria-label="Logout"
          >
            <LogOutIcon size={18} aria-hidden="true" /> Logout
          </button>
        </div>
      </aside>

      <Dialog.Root open={isOpen()} onOpenChange={(e) => setIsOpen(e.open)}>
        <Dialog.Backdrop class="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Positioner class="fixed inset-y-0 left-0 w-64 z-50">
          <Dialog.Content
            class="flex flex-col h-full bg-white shadow-lg"
            aria-label="Mobile navigation"
          >
            <div class="flex flex-col h-full p-4">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-900">Learning MS</h2>
                <button
                  class="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <XIcon size={20} class="text-gray-700" />
                </button>
              </div>

              <nav class="flex-1 space-y-1">
                <a
                  href="/"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                >
                  <HomeIcon size={18} /> Home
                </a>
                <a
                  href="/courses"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                >
                  <BookOpenIcon size={18} /> Courses
                </a>
                <a
                  href="/profile"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                >
                  <UserIcon size={18} /> Profile
                </a>
                <a
                  href="/settings"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                >
                  <SettingsIcon size={18} /> Settings
                </a>
              </nav>

              <button
                onClick={handleLogout}
                class="flex items-center gap-3 px-4 py-2.5 mt-4 text-sm font-medium rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200"
                aria-label="Logout"
              >
                <LogOutIcon size={18} /> Logout
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  );
}
