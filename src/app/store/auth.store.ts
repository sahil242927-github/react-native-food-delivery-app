import { create } from "zustand";

export type AuthStateType = {
  isAuthenticated: boolean;
  email: string;
  password: string;
  name?: string;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
};

const useAuthStore = create<AuthStateType>((set) => ({
  isAuthenticated: false,
  email: "",
  password: "",
  name: "",
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setName: (name) => set({ name }),
}));

export default useAuthStore;
