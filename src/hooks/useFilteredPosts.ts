import { useMemo, useState } from "react";
import type { DataPost } from "../types/DataPost";
import { useSocialStore } from "../store/useSocialStore";

export function useFilteredPosts(posts: DataPost[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "most_liked">(
    "newest",
  );

  const allLikes = useSocialStore((state) => state.likes);

  const filteredAndSortedPosts = useMemo(() => {
    let result = posts.filter((post) => {
      const search = searchTerm.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(search);
      const matchesContent = post.content.toLowerCase().includes(search);
      const matchesUsername = post.username.toLowerCase().includes(search);

      return matchesTitle || matchesContent || matchesUsername;
    });

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_datetime).getTime() -
            new Date(a.created_datetime).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_datetime).getTime() -
            new Date(b.created_datetime).getTime()
          );
        case "most_liked": {
          const likesA = allLikes[a.id]?.length ?? 0;
          const likesB = allLikes[b.id]?.length ?? 0;
          return likesB - likesA;
        }
      }
    });

    return result;
  }, [posts, searchTerm, sortBy, allLikes]);

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filteredAndSortedPosts,
  };
}
