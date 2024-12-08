import React from "react";
import UsersList from "../components/UsersList";
import useUsers from "../hooks/useUsers"; // Import the useUsers hook
import "./Users.css";

const Users = () => {
  const { users, loading, error } = useUsers(); // Use the useUsers hook to fetch users

  // If the component is still loading users
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching users
  if (error) {
    return <div>{error}</div>;
  }

  // Render the UsersList component and pass the fetched users
  return <UsersList items={users} />;
};

export default Users;
