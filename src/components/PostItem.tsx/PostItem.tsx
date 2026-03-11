import { useUserStore } from "../../store/useUserStore";
import { formatDistanceToNow } from "date-fns";
import { FiEdit, FiTrash2, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import type { DataPost } from "../../types/DataPost";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import { useSocialStore } from "../../store/useSocialStore";

interface PostItemProps {
  post: DataPost;
}

export default function PostItem({ post }: PostItemProps) {
  const loggedUser = useUserStore((state) => state.username);
  const isMyPost = post.username === loggedUser;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const likes = useSocialStore((state) => state.likes[post.id]) ?? [];
  const comments = useSocialStore((state) => state.comments[post.id]) ?? [];
  const toggleLike = useSocialStore((state) => state.toggleLike);
  const addComment = useSocialStore((state) => state.addComment);

  const isLikedByUser = likes.includes(loggedUser);
  const handleToggleLike = () => toggleLike(post.id, loggedUser);

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(post.id, loggedUser, commentText.trim());
      setCommentText("");
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-[#CCCCCC] bg-white">
      <header className="flex h-17.5 items-center justify-between bg-[#7695EC] px-6 text-white">
        <h3 className="max-w-[80%] truncate text-[22px] font-bold">
          {post.title}
        </h3>

        {isMyPost && (
          <div className="flex gap-6">
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="transition-transform hover:scale-110"
              title="Delete post"
            >
              <FiTrash2 size={18} />
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
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

        <div className="flex items-center justify-between text-[14px] text-[#777777]">
          <button
            type="button"
            onClick={handleToggleLike}
            className={`flex items-center gap-2 font-bold transition-transform hover:scale-105 ${
              isLikedByUser ? "text-[#7695EC]" : "text-[#999999]"
            }`}
          >
            {isLikedByUser ? <FaHeart size={16} /> : <FiHeart size={16} />}
            <span>
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[14px] font-bold text-[#777777]">
            Comments
          </label>
          {comments.length > 0 && (
            <div className="flex flex-col gap-3 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-3">
              {comments.map((comment, index) => (
                <p
                  key={`${comment.username}-${index}`}
                  className="text-[14px] text-[#555555]"
                >
                  <span className="font-bold text-[#777777]">
                    @{comment.username}
                  </span>{" "}
                  {comment.text}
                </p>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder={
                loggedUser ? "Write a comment..." : "Sign in to comment"
              }
              className="min-h-20 rounded-lg border border-[#CCCCCC] p-3 text-[14px] focus:border-transparent focus:outline-[#7695EC]"
              disabled={!loggedUser}
            />
            <button
              type="button"
              onClick={handleAddComment}
              disabled={!loggedUser || !commentText.trim()}
              className="h-10 rounded-lg bg-[#7695EC] text-[14px] font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              Post comment
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        postId={post.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
      <EditModal
        key={post.id}
        post={post}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </article>
  );
}
