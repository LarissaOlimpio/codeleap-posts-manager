import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { usePostMutations } from "../../hooks/usePostMutations";
import { MentionsInput, Mention } from "react-mentions";
import { usePosts } from "../../hooks/usePost";
import styles from "./PostCreateForm.styles.module.css";

interface PostData {
  title: string;
  content: string;
}

export default function PostCreateForm() {
  const [formData, setFormData] = useState<PostData>({
    title: "",
    content: "",
  });

  const username = useUserStore((state) => state.username);

  const { createMutation } = usePostMutations();

  const isLoading = createMutation.isPending;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isButtonDisabled =
    !formData.title.trim() || !formData.content.trim() || isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMutation.mutate(
      {
        username,
        title: formData.title,
        content: formData.content,
      },
      {
        onSuccess: () => {
          setFormData({ title: "", content: "" });
        },
        onError: (error) => {
          console.error("Creation error:", error);
          alert("Failed to create post. Please try again.");
        },
      },
    );
  };
  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const { data } = usePosts();
  const users =
    data?.pages
      .flatMap((p) => p.results)
      .map((p) => ({
        id: p.username,
        display: p.username,
      }))
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id),
      ) || [];

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-[#CCCCCC] bg-white p-6">
      <h2 className="text-[22px] font-bold text-black">What’s on your mind?</h2>

      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-black">Title</label>
        <input
          name="title"
          placeholder="Title"
          className="w-full rounded-lg border border-[#777777] p-2 focus:outline-[#7695EC]"
          value={formData.title}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-black">Content</label>

        <MentionsInput
          value={formData.content ?? ""}
          onChange={(_, newValue) => handleContentChange(newValue)}
          placeholder="Write something... use @ to mention someone"
          disabled={isLoading}
          classNames={styles}
        >
          <Mention
            trigger="@"
            data={users}
            markup="@__display__"
            displayTransform={(display) => `@${display}`}
            className={styles.mention}
          />
        </MentionsInput>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className="cursor-pointer rounded-lg bg-[#7695EC] px-8 py-1.5 font-bold text-white transition-colors hover:bg-[#5a78d1] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </section>
  );
}
