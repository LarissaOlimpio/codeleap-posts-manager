import { usePosts } from "./usePost";

export function useUsersMention() {
  const { data, isLoading } = usePosts();

  const users =
    data?.pages
      .flatMap((page) => page.results)
      .map((post) => ({
        id: post.username,
        display: post.username,
      }))
      .filter(
        (user, index, self) =>
          index === self.findIndex((t) => t.id === user.id),
      ) || [];

  return { users, isLoading };
}
