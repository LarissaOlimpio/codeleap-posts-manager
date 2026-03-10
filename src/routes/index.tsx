import { createFileRoute } from "@tanstack/react-router";
import PostForm from "../components/PostForm/postForm";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen justify-center bg-[#DDDDDD]">
      <div className="min-h-screen w-full max-w-200 bg-white shadow-lg">
        <header className="flex h-20 items-center bg-[#7695EC] p-6">
          <h1 className="text-[22px] font-bold text-white">CodeLeap Network</h1>
        </header>

        <main className="flex flex-col gap-6 p-6">
          <PostForm />
        </main>
      </div>
    </div>
  );
}
