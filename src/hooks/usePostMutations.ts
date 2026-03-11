import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../service/api";

export function usePostMutations() {
  const queryClient = useQueryClient();

  const invalidatePosts = () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const createMutation = useMutation({
    mutationFn: ({
      username,
      title,
      content,
    }: {
      username: string;
      title: string;
      content: string;
    }) => postService.create(username, title, content),
    onSuccess: invalidatePosts,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      title,
      content,
    }: {
      id: number;
      title: string;
      content: string;
    }) => postService.update(id, title, content),
    onSuccess: invalidatePosts,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => postService.delete(id),
    onSuccess: invalidatePosts,
  });

  return { createMutation, updateMutation, deleteMutation };
}
