import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";

interface PostData {
  title: string;
  content: string;
}

interface PostCreateFormProps {
  onSuccess: () => void;
}

export default function PostCreateForm({ onSuccess }: PostCreateFormProps) {
  const [formData, setFormData] = useState<PostData>({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const username = useUserStore((state) => state.username);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isButtonDisabled =
    !formData.title.trim() || !formData.content.trim() || isLoading;

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://dev.codeleap.co.uk/careers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          title: formData.title,
          content: formData.content,
        }),
      });

      if (response.ok) {
        setFormData({ title: "", content: "" });
        onSuccess();
      } else {
        alert("Error creating post. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-[#CCCCCC] bg-white p-6">
      <h2 className="text-[22px] font-bold text-black">What’s on your mind?</h2>

      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-black">Title</label>
        <input
          name="title"
          placeholder="Hello world"
          className="w-full rounded-lg border border-[#777777] p-2 focus:outline-[#7695EC]"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-black">Content</label>
        <textarea
          name="content"
          placeholder="Content here"
          rows={3}
          className="w-full resize-none rounded-lg border border-[#777777] p-2 focus:outline-[#7695EC]"
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className="rounded-lg bg-[#7695EC] px-8 py-1.5 font-bold text-white transition-colors hover:bg-[#5a78d1] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </section>
  );
}
