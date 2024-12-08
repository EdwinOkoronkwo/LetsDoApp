// import React from "react";

// import "./MainHeader.css";

// const MainHeader = (props) => {
//   return <header className="main-header">{props.children}</header>;
// };

// export default MainHeader;

import React from "react";
import { Layout } from "antd";
import "./MainHeader.css"; // Optional, if you still need custom styles

const { Header } = Layout;

const MainHeader = (props) => {
  return (
    <Header className="main-header" style={{ backgroundColor: "#001529" }}>
      {props.children}
    </Header>
  );
};

export default MainHeader;
