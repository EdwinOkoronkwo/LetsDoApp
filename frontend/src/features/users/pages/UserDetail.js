import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/features/users";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./UserDetail.css";

const UserDetail = () => {
  const { userId } = useParams();

  // Fetch user data
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const date = new Date(user.user.created);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return (
    <div className="user-detail">
      <Card className="user-detail__card" hoverable>
        <div className="user-detail__image">
          <Avatar
            size={120}
            src={`http://localhost:8000${user.user.photo}`}
            alt={user.user.name}
            icon={<UserOutlined />}
          />
        </div>
        <div className="user-detail__info">
          <h2>{user.user.name}</h2>
          <p>
            <strong>Email:</strong> {user.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.user.phone_number || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {user.user.address || "N/A"}
          </p>
          {/* <p>
            <strong>Date of Birth:</strong> {user.user.date_of_birth || "N/A"}
          </p> */}
          <p>
            <strong>Join Date:</strong> {formattedDate || "N/A"}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default UserDetail;
