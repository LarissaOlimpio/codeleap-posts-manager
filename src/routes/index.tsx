import { createFileRoute } from "@tanstack/react-router";
import PostForm from "../components/PostForm/PostCreateForm";
import PostItem from "../components/PostItem.tsx/PostItem";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
const mockPosts = [
  {
    id: 1,
    username: "victor",
    title: "My first post",
    content: "Hello world",
    created_datetime: "2023-10-25T10:00:00Z",
  },
];

function RouteComponent() {
  return (
    <div className="flex min-h-screen justify-center bg-[#DDDDDD]">
      <div className="min-h-screen w-full max-w-200 bg-white shadow-lg">
        <header className="flex h-20 items-center bg-[#7695EC] p-6">
          <h1 className="text-[22px] font-bold text-white">CodeLeap Network</h1>
        </header>

        <main className="flex flex-col gap-6 p-6">
          <PostForm
            onSuccess={() => {
              console.log("Post created successfully!");
            }}
          />
          <div className="flex flex-col gap-6">
            {mockPosts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
