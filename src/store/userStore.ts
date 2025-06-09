import { create } from 'zustand';

interface UserState {
  loginId: string;
  password: string;
  setCredentials: (id: string, pw: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  loginId: '',
  password: '',
  setCredentials: (id, pw) => set({ loginId: id, password: pw })
}));