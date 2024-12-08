import React from "react";
import { Button as AntButton } from "antd"; // Ant Design Button
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Ant Design Icons

import "./Button.css"; // Custom styles for color and size

const Button = (props) => {
  // Conditionally render icons based on props
  const renderIcon = () => {
    if (props.icon === "edit") {
      return <EditOutlined />;
    }
    if (props.icon === "delete") {
      return <DeleteOutlined />;
    }
    return null;
  };

  return (
    <AntButton
      {...props} // Spread all props to handle default behavior like onClick, type, etc.
      className={`custom-button custom-button--${props.size || "default"} ${
        props.inverse && "custom-button--inverse"
      } ${props.danger && "custom-button--danger"}`}
      type={props.type || "default"}
      disabled={props.disabled}
      icon={renderIcon()} // Render the appropriate icon
    >
      {props.children}
    </AntButton>
  );
};

export default Button;
