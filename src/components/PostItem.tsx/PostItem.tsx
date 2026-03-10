import { useUserStore } from "../../store/useUserStore";
import { formatDistanceToNow } from "date-fns";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import type { DataPost } from "../../types/DataPost";

interface PostItemProps {
  post: DataPost;
  onDeleteClick: (id: number) => void;
  onEditClick: (post: DataPost) => void;
}

export default function PostItem({
  post,
  onDeleteClick,
  onEditClick,
}: PostItemProps) {
  const loggedUser = useUserStore((state) => state.username);
  const isMyPost = post.username === loggedUser;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#CCCCCC] bg-white">
      <header className="flex h-17.5 items-center justify-between bg-[#7695EC] px-6 text-white">
        <h3 className="max-w-[80%] truncate text-[22px] font-bold">
          {post.title}
        </h3>

        {isMyPost && (
          <div className="flex gap-6">
            <button
              onClick={() => onDeleteClick(post.id)}
              className="transition-transform hover:scale-110"
              title="Delete post"
            >
              <FiTrash2 size={18} />
            </button>
            <button
              onClick={() => onEditClick(post)}
              className="transition-transform hover:scale-110"
              title="Edit post"
            >
              <FiEdit size={18} />
            </button>
          </div>
        )}
      </header>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex justify-between text-[18px] text-[#777777]">
          <span className="font-bold text-[#777777]">@{post.username}</span>
          <span>
            {formatDistanceToNow(new Date(post.created_datetime), {
              addSuffix: true,
            })}
          </span>
        </div>

        <p className="text-[18px] leading-tight whitespace-pre-wrap text-black">
          {post.content}
        </p>
      </div>
    </article>
  );
}
