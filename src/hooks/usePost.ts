import { useInfiniteQuery } from "@tanstack/react-query";
import { postService } from "../service/api";

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => postService.list(pageParam),
    initialPageParam: "https://dev.codeleap.co.uk/careers/",
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
}
