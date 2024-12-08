import React from "react";
import { Avatar as AntAvatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Avatar.css";

const Avatar = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <AntAvatar
        src={
          <Image
            src={props.image}
            alt={props.alt}
            width={props.width}
            height={props.width}
            preview={false} // Disable image preview on click
            fallback="https://via.placeholder.com/150" // Fallback if image fails to load
          />
        }
        size={props.width || 40}
        icon={<UserOutlined />} // Icon if no image is provided
      />
    </div>
  );
};

export default Avatar;
