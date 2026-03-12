import { useUserStore } from "../../store/useUserStore";
import { formatDistanceToNow } from "date-fns";
import { FiEdit, FiTrash2, FiHeart, FiX } from "react-icons/fi";
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

  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null,
  );

  const likes = useSocialStore((state) => state.likes[post.id]) ?? [];
  const comments = useSocialStore((state) => state.comments[post.id]) ?? [];
  const toggleLike = useSocialStore((state) => state.toggleLike);
  const addComment = useSocialStore((state) => state.addComment);
  const editComment = useSocialStore((state) => state.editComment);
  const deleteComment = useSocialStore((state) => state.deleteComment);

  const isLikedByUser = likes.includes(loggedUser);
  const handleToggleLike = () => toggleLike(post.id, loggedUser);

  const handleAddOrEditComment = () => {
    if (!commentText.trim()) return;

    if (editingCommentIndex !== null) {
      editComment(post.id, editingCommentIndex, commentText.trim());
      setEditingCommentIndex(null);
    } else {
      addComment(post.id, loggedUser, commentText.trim());
    }
    setCommentText("");
  };

  const startEditComment = (index: number, text: string) => {
    setEditingCommentIndex(index);
    setCommentText(text);
  };

  const cancelEdit = () => {
    setEditingCommentIndex(null);
    setCommentText("");
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
              className="cursor-pointer transition-transform hover:scale-110"
              title="Delete post"
            >
              <FiTrash2 size={18} />
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              className="cursor-pointer transition-transform hover:scale-110"
              title="Edit post"
            >
              <FiEdit size={18} />
            </button>
          </div>
        )}
      </header>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-1 text-[18px] text-[#777777] sm:flex-row sm:items-center sm:justify-between">
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

        <button
          onClick={handleToggleLike}
          className={`flex w-fit cursor-pointer items-center gap-2 font-bold transition-transform hover:scale-105 ${
            isLikedByUser ? "text-[#7695EC]" : "text-[#999999]"
          }`}
        >
          {isLikedByUser ? <FaHeart size={16} /> : <FiHeart size={16} />}
          <span>
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </span>
        </button>

        <div className="flex flex-col gap-3">
          <label className="text-[14px] font-bold text-[#777777]">
            Comments
          </label>

          {comments.length > 0 && (
            <div className="flex flex-col gap-3 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-3">
              {comments.map((comment, index) => {
                const isMyComment = comment.username === loggedUser;
                const isBeingEdited = editingCommentIndex === index;

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between gap-2 ${isBeingEdited ? "opacity-50" : ""}`}
                  >
                    <p className="text-[14px] text-[#555555]">
                      <span className="font-bold text-[#777777]">
                        @{comment.username}
                      </span>{" "}
                      {comment.text}
                    </p>

                    {isMyComment && !isBeingEdited && (
                      <div className="flex gap-2 text-[#524e4e]">
                        <button
                          onClick={() => startEditComment(index, comment.text)}
                          className="cursor-pointer hover:text-[#7695EC]"
                        >
                          <FiEdit size={14} />
                        </button>
                        <button
                          onClick={() => deleteComment(post.id, index)}
                          className="cursor-pointer hover:text-[#FF5151]"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="relative">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  loggedUser
                    ? editingCommentIndex !== null
                      ? "Editing comment..."
                      : "Write a comment..."
                    : "Sign in to comment"
                }
                className={`min-h-20 w-full rounded-lg border p-3 text-[14px] focus:outline-[#7695EC] ${
                  editingCommentIndex !== null
                    ? "border-[#7695EC] bg-[#7695EC]/5"
                    : "border-[#CCCCCC]"
                }`}
                disabled={!loggedUser}
              />
              {editingCommentIndex !== null && (
                <button
                  onClick={cancelEdit}
                  className="absolute top-2 right-2 cursor-pointer rounded-full p-1 text-[#FF5151] hover:bg-red-50"
                  title="Cancel edit"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddOrEditComment}
              disabled={!loggedUser || !commentText.trim()}
              className="h-10 cursor-pointer rounded-lg bg-[#7695EC] text-[14px] font-bold text-white transition-all hover:bg-[#5a78d1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {editingCommentIndex !== null ? "Save Changes" : "Post comment"}
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
