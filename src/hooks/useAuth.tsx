import { signInWithEmail, signOut, signUpWithEmail } from "@/services/auth";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

/**
 * Hook to handle user authentication (Sign In).
 */
export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: AuthCredentials) =>
      signInWithEmail(email, password),
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error: Error) => {
      console.error("[Auth]: Login failed:", error.message);
    },
  });
};

/**
 * Hook to handle new user registration (Sign Up).
 */
export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password, name }: AuthCredentials) =>
      signUpWithEmail(email, password, name || "User"),
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error: Error) => {
      console.error("[Auth]: Registration failed:", error.message);
    },
  });
};

/**
 * Hook to handle session termination (Sign Out).
 */
export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      router.replace("/sign-in");
    },
    onError: (error: Error) => {
      console.error("[Auth]: Sign out failed:", error.message);
    },
  });
};
