import { Dialog } from "@ark-ui/solid";
import { createSignal } from "solid-js";
import { MenuIcon, XIcon, SearchIcon, BookOpenIcon } from "lucide-solid";

export default function Navbar() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");

  const handleSearch = (e: Event) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery());
  };

  return (
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-4">
          {/* Logo and Desktop Navigation */}
          <div class="flex items-center flex-shrink-0">
            <div class="flex items-center">
              <BookOpenIcon class="h-8 w-8 text-blue-600" aria-hidden="true" />
              <span class="ml-2 text-xl font-bold text-gray-900">LMS</span>
            </div>
            <div class="hidden md:flex md:ml-8 space-x-6">
              <a
                href="/"
                class="border-blue-500 text-gray-900 inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="/courses"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
              >
                Courses
              </a>
              <a
                href="/resources"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
              >
                Resources
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div class="flex-1 max-w-md hidden md:block">
            <form onSubmit={handleSearch} class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                placeholder="Search courses and resources..."
                value={searchQuery()}
                onInput={(e) => setSearchQuery(e.currentTarget.value)}
              />
            </form>
          </div>

          {/* Mobile menu button */}
          <div class="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsOpen(true)}
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon class="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Only shown on mobile */}
      <div class="md:hidden">
        <Dialog.Root open={isOpen()} onOpenChange={(e) => setIsOpen(e.open)}>
          <Dialog.Backdrop class="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ease-in-out" />
          <Dialog.Positioner class="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <Dialog.Content class="h-full flex flex-col">
              <div class="pt-5 pb-4">
                <div class="flex items-center justify-between px-4">
                  <div class="flex items-center">
                    <BookOpenIcon
                      class="h-8 w-8 text-blue-600"
                      aria-hidden="true"
                    />
                    <span class="ml-2 text-xl font-bold text-gray-900">
                      LMS
                    </span>
                  </div>
                  <button
                    type="button"
                    class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <span class="sr-only">Close menu</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div class="mt-3 px-2 space-y-1">
                  <a
                    href="/"
                    class="block px-4 py-2.5 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Home
                  </a>
                  <a
                    href="/courses"
                    class="block px-4 py-2.5 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Courses
                  </a>
                  <a
                    href="/resources"
                    class="block px-4 py-2.5 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Resources
                  </a>
                </div>
              </div>
              <div class="p-4 border-t border-gray-200">
                <form onSubmit={handleSearch} class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search"
                    value={searchQuery()}
                    onInput={(e) => setSearchQuery(e.currentTarget.value)}
                  />
                </form>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </div>
    </nav>
  );
}
