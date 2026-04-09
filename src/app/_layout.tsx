import { SplashScreen, Stack, router } from "expo-router";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import supabase from "@/lib/db";
import useAuthStore from "@/app/store/auth.store";
import { useEffect } from "react";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "quickSand-Bold": require("@/assets/fonts/Quicksand-Bold.ttf"),
    "quickSand-Regular": require("@/assets/fonts/Quicksand-Regular.ttf"),
    "quickSand-Medium": require("@/assets/fonts/Quicksand-Medium.ttf"),
    "quickSand-SemiBold": require("@/assets/fonts/Quicksand-SemiBold.ttf"),
    "quickSand-Light": require("@/assets/fonts/Quicksand-Light.ttf"),
  });

  const { setIsAuthenticated, setName } = useAuthStore();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Update your global state here
    });

    // Listen for auth changes (Sign in, Sign out, Token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          console.log("User is signed in:", session.user);
          setIsAuthenticated(true);
          setName(session.user.user_metadata.name || "");
          router.replace("/"); // Redirect to home on sign in
        } else {
          router.replace("/sign-in"); // Redirect to sign-in on sign out
        }
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (error) throw error;

    // We only hide the native splash screen once fonts are ready.
    // The AuthProvider will handle its own loading state inside InitialLayout.
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
