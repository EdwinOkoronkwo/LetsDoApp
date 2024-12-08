import { useQuery } from "@tanstack/react-query";
import { searchTasks } from "../../../services/features/tasks";

export const useTaskSearch = (searchQuery) => {
  return useQuery(["tasks", { searchQuery }], () => searchTasks(searchQuery), {
    enabled: !!searchQuery, // Only fetch when searchQuery is provided
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });
};
