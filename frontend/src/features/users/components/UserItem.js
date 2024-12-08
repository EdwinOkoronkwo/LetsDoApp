/**
 * UserItem Component
 *
 * This component represents a single user item, displayed as a card with an image, name, and email.
 * It uses Ant Design components to provide styling and functionality for the UI elements.
 *
 * Props:
 * - id (string): Unique identifier for the user.
 * - name (string): The name of the user to be displayed.
 * - email (string): The email address of the user to be displayed.
 * - photo (string): Relative path to the user's photo, which will be fetched from the server.
 *
 * Dependencies:
 * - React: For creating the component structure.
 * - react-router-dom: For enabling navigation using the Link component.
 * - antd: For UI components (Card, Avatar) and icons (UserOutlined).
 *
 * Usage:
 * <UserItem id="123" name="John Doe" email="john.doe@example.com" photo="/uploads/123.jpg" />
 *
 * Features:
 * - Displays user details in a styled card.
 * - Provides a clickable link that navigates to the user's specific route.
 * - Shows an avatar with a user photo or a default icon if no photo is available.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content" hoverable>
        {/* Navigate to /users/:userId */}
        <Link to={`/users/${props.id}`}>
          <div className="user-item__image">
            <Avatar
              size={64}
              src={`http://localhost:8000${props.photo}`}
              alt={props.name}
              icon={<UserOutlined />}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>{props.email}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
