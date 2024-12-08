import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { signupRequest, signinRequest } from "../../../services/auth/auth";
import { getUsers } from "../../../services/features/users";

// Custom hook to manage authentication
const useAuthQuery = () => {
  const queryClient = useQueryClient();

  // Query to fetch user data (e.g., after sign-in or on page load)
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
    enabled: false,
  });

  // Mutation for sign-up
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      if (data && !data.error) {
        console.log("Signup successful:", data);
        queryClient.invalidateQueries(["user"]);
      }
    },
    onError: (error) => {
      // Log the full error object to understand its structure
      console.error("Signup error:", error);
      if (error.response) {
        // Handle errors with response object (e.g., from an HTTP request)
        console.error("Error response:", error.response);
        if (error.response.data && error.response.data.error) {
          console.error("Error message:", error.response.data.error);
        }
      } else if (error.message) {
        // Handle errors with message property
        console.error("Error message:", error.message);
      } else {
        // Handle any other type of error object
        console.error("Unexpected error:", error);
      }
    },
  });

  // Mutation for sign-in
  const { mutate: signIn, isLoading: isSigningIn } = useMutation({
    mutationFn: signinRequest,
    onSuccess: (data) => {
      if (data && !data.error) {
        console.log("Signin successful:", data);
        queryClient.invalidateQueries(["user"]);
      }
    },
    onError: (error) => {
      console.error("Signin error:", error);
      if (error.response) {
        // Handle errors with response object (e.g., from an HTTP request)
        console.error("Error response:", error.response);
        if (error.response.data && error.response.data.error) {
          console.error("Error message:", error.response.data.error);
        }
      } else if (error.message) {
        // Handle errors with message property
        console.error("Error message:", error.message);
      } else {
        // Handle any other type of error object
        console.error("Unexpected error:", error);
      }
    },
  });

  return {
    user,
    userLoading,
    userError,
    signUp,
    signIn,
    isSigningUp,
    isSigningIn,
    refetchUser,
  };
};

export default useAuthQuery;
