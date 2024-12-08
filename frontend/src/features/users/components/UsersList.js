import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";
import Card from "../../../ui/UIElements/Card";

const UsersList = (props) => {
  // If there are no users in the array
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users Found!!</h2>
        </Card>
      </div>
    );
  }

  // If there are users in the array
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user._id}
          id={user._id}
          name={user.name}
          email={user.email}
          photo={user.photo}
        />
      ))}
    </ul>
  );
};

export default UsersList;
