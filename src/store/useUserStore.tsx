// src/store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  username: string;
  setUserName: (name: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      setUserName: (name) => set({ username: name }),

      logout: () => {
        set({ username: "" });
        localStorage.removeItem("@codeleap-user-storage");
      },
    }),
    { name: "@codeleap-user-storage" },
  ),
);
