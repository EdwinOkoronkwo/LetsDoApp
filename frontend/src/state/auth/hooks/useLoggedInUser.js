import useUsers from "../../../features/users/hooks/useUsers";
import { useAuth } from "../../context/authContext";

const useLoggedInUser = () => {
  const { users } = useUsers();
  const { user } = useAuth();

  // Find the logged-in user based on email
  const loggedInUser = users?.find((u) => u.email === user?.email);

  return loggedInUser;
};

export default useLoggedInUser;
