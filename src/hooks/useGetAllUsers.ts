import { getAllUsers } from "@/services/supabase";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: Infinity, // The user doesn't change often
  });
};
