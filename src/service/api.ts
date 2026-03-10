import type { PostListResponse } from "../types/DataPost";

const BASE_URL = "https://dev.codeleap.co.uk/careers/";

export const postService = {
  list: async (url = BASE_URL): Promise<PostListResponse> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  },

  create: async (username: string, title: string, content: string) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, title, content }),
    });
    return response.ok;
  },

  update: async (id: number, title: string, content: string) => {
    const response = await fetch(`${BASE_URL}${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    return response.ok;
  },

  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}${id}/`, {
      method: "DELETE",
    });
    return response.ok;
  },
};
