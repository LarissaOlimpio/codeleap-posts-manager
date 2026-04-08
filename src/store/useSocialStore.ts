import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SocialState {
  likes: Record<number, string[]>;
  comments: Record<number, { username: string; text: string }[]>;

  toggleLike: (postId: number, username: string) => void;
  addComment: (postId: number, username: string, text: string) => void;
  editComment: (postId: number, commentIndex: number, newText: string) => void;
  deleteComment: (postId: number, commentIndex: number) => void;
}
export const useSocialStore = create<SocialState>()(
  persist(
    (set) => ({
      likes: {},
      comments: {},

      toggleLike: (postId, username) =>
        set((state) => {
          const currentLikes = state.likes[postId] || [];
          const alreadyLiked = currentLikes.includes(username);

          return {
            likes: {
              ...state.likes,
              [postId]: alreadyLiked
                ? currentLikes.filter((u) => u !== username)
                : [...currentLikes, username],
            },
          };
        }),

      addComment: (postId, username, text) =>
        set((state) => ({
          comments: {
            ...state.comments,
            [postId]: [...(state.comments[postId] || []), { username, text }],
          },
        })),
      editComment: (postId, commentIndex, newText) => {
        set((state) => {
          const postComments = [...(state.comments[postId] || [])];
          if (postComments[commentIndex]) {
            postComments[commentIndex].text = newText;
          }
          return {
            comments: { ...state.comments, [postId]: postComments },
          };
        });
      },

      deleteComment: (postId, commentIndex) => {
        set((state) => {
          const postComments = (state.comments[postId] || []).filter(
            (_, index) => index !== commentIndex,
          );
          return {
            comments: { ...state.comments, [postId]: postComments },
          };
        });
      },
    }),

    { name: "@codeleap-social-data" },
  ),
);
