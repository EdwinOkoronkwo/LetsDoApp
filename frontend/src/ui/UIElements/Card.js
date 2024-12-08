import React from "react";
import { Card as AntCard } from "antd"; // Importing Ant Design's Card
import "./Card.css"; // You can still apply your own custom styles

const Card = (props) => {
  return (
    <AntCard
      className={props.className} // Pass custom className for additional styling
      style={props.style} // Pass custom style if needed
      title={props.title} // You can add a title if needed
      bordered={props.bordered !== false} // Optionally remove border
    >
      {props.children}
    </AntCard>
  );
};

export default Card;
