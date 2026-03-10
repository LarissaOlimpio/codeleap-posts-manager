import { createFileRoute } from "@tanstack/react-router";
import PostForm from "../components/PostForm/PostCreateForm";
import PostItem from "../components/PostItem.tsx/PostItem";
import { useState, useEffect, useRef, useCallback } from "react";
import type { DataPost } from "../types/DataPost";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [posts, setPosts] = useState<DataPost[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          fetchPosts(nextUrl, true);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, nextUrl],
  );

  const fetchPosts = async (
    url = "https://dev.codeleap.co.uk/careers/",
    isNextPage = false,
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      setPosts((prev) =>
        isNextPage ? [...prev, ...data.results] : data.results,
      );
      setNextUrl(data.next);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="flex min-h-screen justify-center bg-[#DDDDDD]">
      <div className="min-h-screen w-full max-w-200 bg-white shadow-lg">
        <header className="flex h-20 items-center bg-[#7695EC] p-6">
          <h1 className="text-[22px] font-bold text-white">CodeLeap Network</h1>
        </header>

        <main className="flex flex-col gap-6 p-6">
          <PostForm
            onSuccess={() => {
              fetchPosts();
            }}
          />

          <div className="flex flex-col gap-6">
            {posts.map((post, index) => {
              if (posts.length === index + 1) {
                return (
                  <div ref={lastPostElementRef} key={post.id}>
                    <PostItem post={post} onRefresh={() => fetchPosts()} />
                  </div>
                );
              }
              return (
                <PostItem
                  key={post.id}
                  post={post}
                  onRefresh={() => fetchPosts()}
                />
              );
            })}
          </div>

          {isLoading && (
            <p className="py-4 text-center">Loading more posts...</p>
          )}
        </main>
      </div>
    </div>
  );
}
