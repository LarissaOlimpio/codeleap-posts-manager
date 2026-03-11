import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import type { DataPost } from "../../types/DataPost";
import { usePostMutations } from "../../hooks/usePostMutations";

interface EditModalProps {
  post: DataPost;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditModal({
  post,
  open,
  onOpenChange,
}: EditModalProps) {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });

  const { updateMutation } = usePostMutations();

  const isLoading = updateMutation.isPending;

  const isButtonDisabled =
    !formData.title.trim() || !formData.content.trim() || isLoading;

  const handleSave = () => {
    updateMutation.mutate(
      {
        id: post.id,
        title: formData.title,
        content: formData.content,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: (error) => {
          console.error("Update error:", error);
          alert("Failed to update post. Please try again.");
        },
      },
    );
  };

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-in fade-in fixed inset-0 bg-black/40 duration-200" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-165 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="mb-6 text-[22px] font-bold text-black">
            Edit item
          </Dialog.Title>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-black">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Title"
                className="w-full rounded-lg border border-[#777777] p-2 focus:outline-[#7695EC]"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-black">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="Content here"
                rows={3}
                className="w-full resize-none rounded-lg border border-[#777777] p-2 focus:outline-[#7695EC]"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Dialog.Close asChild>
              <button
                className="rounded-lg border border-[#999999] px-8 py-1.5 font-bold text-black hover:bg-gray-50 disabled:opacity-50"
                disabled={isLoading}
              >
                Cancel
              </button>
            </Dialog.Close>

            <button
              onClick={handleSave}
              disabled={isButtonDisabled}
              className="rounded-lg bg-[#47B845] px-8 py-1.5 font-bold text-white transition-colors hover:bg-[#3ea33c] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
