import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { usePostMutations } from "../../hooks/usePostMutations";

interface DeleteModalProps {
  postId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteModal({
  postId,
  open,
  onOpenChange,
}: DeleteModalProps) {
  const { deleteMutation } = usePostMutations();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();

    deleteMutation.mutate(postId, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Delete error:", error);
        alert("Could not delete the post. Please try again.");
      },
    });
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="animate-fade-in fixed inset-0 bg-black/40" />

        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-165 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg focus:outline-none">
          <AlertDialog.Title className="mb-10 text-[22px] font-bold text-black">
            Are you sure you want to delete this item?
          </AlertDialog.Title>
          <AlertDialog.Description className="hidden" />

          <div className="flex justify-end gap-4">
            <AlertDialog.Cancel asChild>
              <button
                className="rounded-lg border border-[#999999] px-8 py-1.5 font-bold text-black transition-colors hover:bg-gray-50 disabled:opacity-50"
                disabled={deleteMutation.isPending}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="rounded-lg bg-[#FF5151] px-8 py-1.5 font-bold text-white transition-colors hover:bg-[#d43f3f] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
