import { ResponseUser } from "@/types/response-user";
import { create } from "zustand";

interface UserState {
  user: ResponseUser | null;
  isLoggedIn: boolean;
  setUser: (user: ResponseUser) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user: ResponseUser) =>
    set({ user: user, isLoggedIn: !!user?.accessToken }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
