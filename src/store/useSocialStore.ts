import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SocialState {
  likes: Record<number, string[]>;
  comments: Record<number, { username: string; text: string }[]>;

  toggleLike: (postId: number, username: string) => void;
  addComment: (postId: number, username: string, text: string) => void;
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
    }),
    { name: "@codeleap-social-data" },
  ),
);
