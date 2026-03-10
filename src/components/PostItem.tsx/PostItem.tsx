import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface PostProps {
  post: {
    id: number;
    username: string;
    title: string;
    content: string;
    created_datetime: string;
  };
}

export default function PostItem({ post }: PostProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#CCCCCC]">
      <header className="flex items-center justify-between bg-[#7695EC] p-6 text-white">
        <h3 className="max-w-[70%] truncate text-[22px] font-bold">
          {post.title}
        </h3>

        <div className="flex gap-4">
          <button className="transition-opacity hover:opacity-80">
            <FiTrash2 color="white" />
          </button>
          <button className="transition-opacity hover:opacity-80">
            <FiEdit2 color="white" />
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex justify-between text-[18px] text-[#777777]">
          <span className="font-bold">@{post.username}</span>
          <span>{new Date(post.created_datetime).toLocaleString()}</span>
        </div>
        <p className="text-[18px] leading-tight text-black">{post.content}</p>
      </div>
    </article>
  );
}
