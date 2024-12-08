import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  deleteTask,
  editTask,
  postTask,
} from "../../../services/features/tasks";

const useTasks = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const { mutate: removeTask, isLoading: isDeleting } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });

  const { mutate: updateTask } = useMutation({
    mutationFn: async (updatedTask) => {
      // Ensure the task ID is present for editing
      if (!updatedTask.id) {
        throw new Error("Task ID is required to update a task.");
      }
      return await editTask(updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });

  const { mutate: createNewTask } = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  return {
    tasks,
    isLoading,
    error,
    removeTask,
    updateTask,
    createNewTask,
    isDeleting,
    refetch,
  };
};

export default useTasks;
