// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   getUsers,
//   createUser,
//   updateUser,
//   updateUserProfile,
//   deleteUser,
// } from "../../../services/features/users";

// const useUsers = () => {
//   const queryClient = useQueryClient();

//   // Fetch all users
//   const {
//     data: users = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       try {
//         const response = await getUsers();
//         if (response && Array.isArray(response.users)) {
//           return response.users;
//         } else {
//           throw new Error("Users data is not an array or not defined.");
//         }
//       } catch (err) {
//         throw new Error(`Error loading users: ${err.message || err}`);
//       }
//     },
//     refetchOnWindowFocus: false,
//     staleTime: 5000,
//   });

//   // Create user mutation
//   const { mutate: createNewUser, isLoading: isCreating } = useMutation({
//     mutationFn: createUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//     },
//     onError: (error) => {
//       console.error("Error creating user:", error);
//     },
//   });

//   // Update user mutation
//   const { mutate: modifyUser, isLoading: isUpdating } = useMutation({
//     mutationFn: updateUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//     },
//     onError: (error) => {
//       console.error("Error updating user:", error);
//     },
//   });

//   // Update user profile mutation
//   const { mutate: updateUserProfileMutation, isLoading: isUpdatingProfile } =
//     useMutation({
//       mutationFn: updateUserProfile,
//       onSuccess: () => {
//         queryClient.invalidateQueries(["users"]);
//       },
//       onError: (error) => {
//         console.error("Error updating user profile:", error);
//       },
//     });

//   // Delete user mutation
//   const { mutate: removeUser, isLoading: isDeleting } = useMutation({
//     mutationFn: deleteUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//     },
//     onError: (error) => {
//       console.error("Error deleting user:", error);
//     },
//   });

//   return {
//     users,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     createNewUser,
//     modifyUser,
//     updateUserProfileMutation,
//     removeUser,
//     isCreating,
//     isUpdating,
//     isUpdatingProfile,
//     isDeleting,
//   };
// };

// export default useUsers;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  createUser,
  updateUser,
  updateUserProfile,
  deleteUser,
} from "../../../services/features/users";

const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch all users
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getUsers();
      if (response && Array.isArray(response.users)) {
        return response.users;
      } else {
        throw new Error("Users data is not an array or not defined.");
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Update user profile mutation (with mutateAsync)
  const updateUserProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  }).mutateAsync;

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return {
    users,
    isLoading,
    isError,
    error,
    refetch,
    createUserMutation,
    updateUserMutation,
    updateUserProfileMutation, // Exposed as async function
    deleteUserMutation,
  };
};

export default useUsers;
