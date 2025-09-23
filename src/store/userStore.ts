import { create } from "zustand";

interface UserState {
  loginId: string;
  password: string;
  setLoginId: (id: string) => void;
  setPassword: (pw: string) => void;
  setCredentials: (id: string, pw: string) => void;
  resetCredentials: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  loginId: "",
  password: "",
  setLoginId: (id) => set({ loginId: id }),
  setPassword: (pw) => set({ password: pw }),
  setCredentials: (id, pw) => set({ loginId: id, password: pw }),
  resetCredentials: () => set({ loginId: "", password: "" }),
}));
