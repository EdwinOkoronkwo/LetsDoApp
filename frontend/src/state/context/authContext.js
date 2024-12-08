import React, { createContext, useContext, useState } from "react";
import useAuthQuery from "../auth/hooks/useAuthQuery";
import { authenticate, isAuthenticated } from "../auth/user/isAuthenticated";
import { useHistory } from "react-router-dom"; // Using useHistory for React Router v5

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { signUp, signIn, userLoading, userError } = useAuthQuery();
  const history = useHistory(); // useHistory from React Router v5
  const [user, setUser] = useState(isAuthenticated()?.user || null);

  // Handle authentication success (sign-up/sign-in)
  const handleAuthSuccess = (data, closeModal, redirectPath) => {
    authenticate(data, () => {
      setUser(data.user);
      if (closeModal) closeModal();
      if (redirectPath) history.push(redirectPath); // Correctly using history.push()
    });
  };

  // Sign-up function
  const signUpHandler = (payload, closeModal) => {
    signUp(payload, {
      onSuccess: (data) => handleAuthSuccess(data, closeModal, "/"),
    });
  };

  // Sign-in function
  const signInHandler = (payload, closeModal) => {
    signIn(payload, {
      onSuccess: (data) => handleAuthSuccess(data, closeModal, "/"),
    });
  };

  // Sign-out function
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("jwt");
    // Optionally, you can redirect the user to the home page after sign-out
    // history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp: signUpHandler,
        signIn: signInHandler,
        signOut,
        signupLoading: userLoading,
        signinLoading: userLoading,
        signupError: userError,
        signinError: userError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
