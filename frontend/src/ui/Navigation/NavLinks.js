// import React from "react";
// import { NavLink } from "react-router-dom";
// import { Menu } from "antd";

// const NavLinks = ({ onOpenModal }) => {
//   return (
//     <Menu
//       theme="dark"
//       mode="horizontal"
//       defaultSelectedKeys={["1"]}
//       style={{ borderBottom: 0, flexGrow: 1, justifyContent: "flex-end" }}
//     >
//       <Menu.Item key="1">
//         <NavLink to="/" exact>
//           All Users
//         </NavLink>
//       </Menu.Item>
//       <Menu.Item key="2">
//         <NavLink to="/user1/tasks">My Tasks</NavLink>
//       </Menu.Item>
//       <Menu.Item key="3">
//         <NavLink
//           to="/tasks/new"
//           onClick={(e) => {
//             e.preventDefault(); // Prevent navigation
//             onOpenModal(); // Open modal
//           }}
//         >
//           Add Task
//         </NavLink>
//       </Menu.Item>
//       <Menu.Item key="4">
//         <NavLink to="/auth">Authenticate</NavLink>
//       </Menu.Item>
//     </Menu>
//   );
// };

// export default NavLinks;

// NavLinks.js
import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

const NavLinks = ({ isAuthenticated, onOpenAddTaskModal, onOpenAuthModal }) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{ borderBottom: 0, flexGrow: 1, justifyContent: "flex-end" }}
    >
      <Menu.Item key="1">
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </Menu.Item>
      {isAuthenticated && (
        <Menu.Item key="2">
          <NavLink to="/user1/tasks">My Tasks</NavLink>
        </Menu.Item>
      )}
      {isAuthenticated && (
        <Menu.Item key="3">
          <NavLink
            to="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenAddTaskModal(); // Open Add Task modal
            }}
          >
            Add Task
          </NavLink>
        </Menu.Item>
      )}
      {!isAuthenticated && (
        <Menu.Item key="4">
          <NavLink
            to="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenAuthModal(); // Open Authenticate modal
            }}
          >
            Authenticate
          </NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default NavLinks;
