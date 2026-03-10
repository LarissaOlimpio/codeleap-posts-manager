import { createFileRoute } from "@tanstack/react-router";
import PostForm from "../components/PostForm/PostCreateForm";
import PostItem from "../components/PostItem.tsx/PostItem";
import { useState, useEffect } from "react";
import type { DataPost } from "../types/DataPost";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [posts, setPosts] = useState<DataPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://dev.codeleap.co.uk/careers/");
      const data = await response.json();
      setPosts(data.results);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
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
            {isLoading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : (
              posts.map((post) => (
                <PostItem key={post.id} post={post} onRefresh={fetchPosts} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
