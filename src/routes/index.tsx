import { createFileRoute, redirect } from "@tanstack/react-router";
import PostForm from "../components/PostCreateForm/PostCreateForm";
import PostItem from "../components/PostItem.tsx/PostItem";
import { useRef, useCallback, useMemo } from "react";
import { useUserStore } from "../store/useUserStore";
import Header from "../components/Header/Header";
import { useFilteredPosts } from "../hooks/useFilteredPosts";
import { PostFilters } from "../components/PostFilters/PostFilters";
import { usePosts } from "../hooks/usePost";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const { username } = useUserStore.getState();
    if (!username) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePosts();

  const allPosts = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filteredAndSortedPosts,
  } = useFilteredPosts(allPosts);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (status === "pending") return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [status, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  return (
    <div className="flex min-h-screen justify-center bg-[#DDDDDD]">
      <div className="min-h-screen w-full max-w-200 bg-white shadow-lg">
        <Header />

        <main className="flex flex-col gap-6 p-6">
          <PostForm />

          <PostFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="flex flex-col gap-6">
            {filteredAndSortedPosts.map((post, index) => {
              const isLast = filteredAndSortedPosts.length === index + 1;

              return (
                <div key={post.id} ref={isLast ? lastPostElementRef : null}>
                  <PostItem post={post} />
                </div>
              );
            })}
          </div>

          {(status === "pending" || isFetchingNextPage) && (
            <p className="py-4 text-center font-bold text-[#777777]">
              Loading posts...
            </p>
          )}

          {status === "success" && filteredAndSortedPosts.length === 0 && (
            <p className="py-10 text-center text-[#777777]">No posts found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
