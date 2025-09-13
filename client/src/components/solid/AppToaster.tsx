import { Toaster, Toast, createToaster } from "@ark-ui/solid";
import { XIcon } from "lucide-solid";

export const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 16,
});

const AppToaster = () => {
  return (
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root class="flex items-center gap-3 bg-white border shadow rounded-lg p-3 w-80">
          <div class="flex-1">
            <Toast.Title class="font-semibold text-gray-900 text-sm">
              {toast().title}
            </Toast.Title>
            <Toast.Description class="text-gray-600 text-xs">
              {toast().description}
            </Toast.Description>
          </div>
          <Toast.CloseTrigger>
            <XIcon
              size={16}
              class="text-gray-500 cursor-pointer hover:text-gray-700"
            />
          </Toast.CloseTrigger>
        </Toast.Root>
      )}
    </Toaster>
  );
};

export default AppToaster;
