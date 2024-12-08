import React from "react";
import { Layout, Typography } from "antd";
import "./HeroSection.css";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const HeroSection = () => {
  return (
    <Content className="hero-section">
      <div className="hero-content">
        <Title level={2} className="hero-title">
          Welcome to <span>LetsDo</span> Task Management Application
        </Title>
        <Paragraph className="hero-description">
          Organize your tasks, track progress, and collaborate with others
          easily. Get started today and take control of your productivity.
        </Paragraph>
      </div>
      <br />
      <br />
      <div className="hero-image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1678846851706-abb02d1574aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHRhc2t8ZW58MHx8MHx8fDA%3D"
          alt="Task Management Illustration"
          className="hero-image"
        />
      </div>
    </Content>
  );
};

export default HeroSection;
