// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { Input, Avatar, Dropdown, Menu, Image } from "antd";
// import { SearchOutlined, UserOutlined } from "@ant-design/icons";
// import MainHeader from "./MainHeader";
// import "./MainNavigation.css";
// import SideDrawer from "./SideDrawer";
// import Backdrop from "../UIElements/Backdrop";
// import NewTask from "../../features/tasks/pages/TaskForm";
// import { useModal } from "../../state/context/modalContext";
// import AuthForm from "../../state/auth/user/AuthForm";
// import UpdateProfileForm from "../../features/users/pages/ProfileUpdateForm";
// import { useAuth } from "../../state/context/authContext";
// import useLoggedInUser from "../../state/auth/hooks/useLoggedInUser";
// import { message } from "antd";

// const { Search } = Input;

// /**
//  * MainNavigation component renders the main navigation bar, including the side drawer,
//  * user profile avatar, task search, and modals for adding tasks and user authentication.
//  *
//  * @returns {JSX.Element} The MainNavigation component.
//  */
// const MainNavigation = () => {
//   const history = useHistory();
//   const { isModalOpen, openModal, closeModal } = useModal();
//   const { user, signOut } = useAuth();
//   const [modalType, setModalType] = useState(null);
//   const [drawerIsOpen, setDrawerIsOpen] = useState(false);
//   const loggedInUser = useLoggedInUser();

//   /**
//    * Opens the side drawer.
//    */
//   const openDrawerHandler = () => setDrawerIsOpen(true);

//   /**
//    * Closes the side drawer.
//    */
//   const closeDrawerHandler = () => setDrawerIsOpen(false);

//   /**
//    * Opens a specific modal based on the provided type.
//    *
//    * @param {string} type - The type of modal to open (e.g., 'addTask', 'auth', 'updateProfile').
//    */
//   const openSpecificModal = (type) => {
//     setModalType(type);
//     openModal();
//   };

//   /**
//    * Signs the user out of the application.
//    */
//   const onSignOut = async () => {
//     await signOut();
//   };

//   /**
//    * Handles the search functionality when a user enters a search term.
//    *
//    * @param {string} value - The search term.
//    */
//   /**
//    * Handles the search functionality when a user enters a search term.
//    *
//    * @param {string} value - The search term.
//    */
//   const onSearch = (value) => {
//     if (!value.trim()) {
//       return message.error("Please enter a valid search term.");
//     }
//     history.push(`/tasks/search?query=${encodeURIComponent(value)}`);
//   };

//   /**
//    * The menu for the user avatar, including options for profile, settings,
//    * profile update, and logout.
//    */
//   const avatarMenu = (
//     <Menu
//       items={[
//         { key: "1", label: <Link to="/profile">Profile</Link> },
//         { key: "2", label: <Link to="/settings">Settings</Link> },
//         {
//           key: "3",
//           label: (
//             <button onClick={() => openSpecificModal("updateProfile")}>
//               Update Profile
//             </button>
//           ),
//         },
//         { key: "4", label: <button onClick={onSignOut}>Logout</button> },
//       ]}
//     />
//   );

//   return (
//     <React.Fragment>
//       {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
//       <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
//         <nav className="main-navigation__drawer-nav">
//           <ul>
//             <li>
//               <button onClick={() => history.push("/all-tasks")}>
//                 All Tasks
//               </button>
//             </li>
//             <li>
//               <button onClick={() => history.push("/all-users")}>
//                 All Users
//               </button>
//             </li>
//             {user && (
//               <li>
//                 <button
//                   className="main-navigation__add-task-btn"
//                   onClick={() => openSpecificModal("addTask")}
//                 >
//                   Add Task
//                 </button>
//               </li>
//             )}
//             {!user && (
//               <li>
//                 <button
//                   className="main-navigation__auth-btn"
//                   onClick={() => openSpecificModal("auth")}
//                 >
//                   Authenticate
//                 </button>
//               </li>
//             )}
//           </ul>
//         </nav>
//       </SideDrawer>
//       <MainHeader>
//         <button
//           className="main-navigation__menu-btn"
//           onClick={openDrawerHandler}
//         >
//           <span />
//           <span />
//           <span />
//         </button>
//         <div className="main-navigation__left">
//           <h1 className="main-navigation__title">
//             <Link to="/">
//               <Image
//                 src="/letsdologo_header.png"
//                 preview={false}
//                 width={100}
//                 style={{ height: "auto", objectFit: "contain" }}
//               />
//             </Link>
//           </h1>
//           <nav className="main-navigation__links">
//             <ul>
//               <li>
//                 <button onClick={() => history.push("/tasks")}>
//                   All Tasks
//                 </button>
//               </li>
//               <li>
//                 <button onClick={() => history.push("/all-users")}>
//                   All Users
//                 </button>
//               </li>
//               {user && (
//                 <li>
//                   <button
//                     className="main-navigation__add-task-btn"
//                     onClick={() => openSpecificModal("addTask")}
//                   >
//                     Add Task
//                   </button>
//                 </li>
//               )}
//               {!user && (
//                 <li>
//                   <button
//                     className="main-navigation__auth-btn"
//                     onClick={() => openSpecificModal("auth")}
//                   >
//                     Authenticate
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         </div>
//         <div
//           style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
//         >
//           {loggedInUser?.name && (
//             <span
//               style={{ marginRight: 15, fontSize: "16px", color: "#F0F0F0" }}
//             >
//               {loggedInUser.name}
//             </span>
//           )}
//           <Search
//             placeholder="Search tasks..."
//             allowClear
//             enterButton={<SearchOutlined />}
//             size="large"
//             onSearch={onSearch}
//             style={{ width: 250, marginRight: 20 }}
//           />
//         </div>
//         <Dropdown overlay={avatarMenu} placement="bottomRight" arrow>
//           <Avatar
//             size={40}
//             icon={<UserOutlined />}
//             src={`http://localhost:8000${loggedInUser?.photo}`}
//             style={{ cursor: "pointer", marginLeft: 15 }}
//           />
//         </Dropdown>
//       </MainHeader>
//       {modalType === "addTask" && (
//         <NewTask isModalOpen={isModalOpen} onClose={closeModal} />
//       )}
//       {modalType === "auth" && (
//         <AuthForm isModalOpen={isModalOpen} closeModal={closeModal} />
//       )}
//       {modalType === "updateProfile" && (
//         <UpdateProfileForm isModalOpen={isModalOpen} closeModal={closeModal} />
//       )}
//     </React.Fragment>
//   );
// };

// export default MainNavigation;

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Input, Avatar, Dropdown, Menu, Image, message } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import NewTask from "../../features/tasks/pages/TaskForm";
import { useModal } from "../../state/context/modalContext";
import AuthForm from "../../state/auth/user/AuthForm";
import UpdateProfileForm from "../../features/users/pages/ProfileUpdateForm";
import { useAuth } from "../../state/context/authContext";
import useLoggedInUser from "../../state/auth/hooks/useLoggedInUser";
import { useSearch } from "../../state/context/searchContext"; // Assuming a custom hook for search context

const { Search } = Input;

const MainNavigation = () => {
  const history = useHistory();
  const { searchQuery, setSearchQuery } = useSearch();
  const [tempQuery, setTempQuery] = useState(searchQuery); // Local state for immediate input updates
  const { isModalOpen, openModal, closeModal } = useModal();
  const { user, signOut } = useAuth();
  const [modalType, setModalType] = useState(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const loggedInUser = useLoggedInUser();

  const openDrawerHandler = () => setDrawerIsOpen(true);
  const closeDrawerHandler = () => setDrawerIsOpen(false);

  const openSpecificModal = (type) => {
    setModalType(type);
    openModal();
  };

  const onSignOut = async () => {
    await signOut();
  };

  // Search functionality
  const onSearch = () => {
    if (!tempQuery.trim()) {
      return message.error("Please enter a valid search term.");
    }
    setSearchQuery(tempQuery); // Update the context state
    history.push(`/tasks/search?query=${encodeURIComponent(tempQuery)}`);
  };

  const handleInputChange = (e) => {
    setTempQuery(e.target.value); // Update local state
  };

  const handleClearSearch = () => {
    setTempQuery(""); // Clear local state
    setSearchQuery(""); // Clear context state
    history.push("/tasks"); // Redirect to tasks page
  };

  const avatarMenu = (
    <Menu
      items={[
        { key: "1", label: <Link to="/profile">Profile</Link> },
        { key: "2", label: <Link to="/settings">Settings</Link> },
        {
          key: "3",
          label: (
            <button onClick={() => openSpecificModal("updateProfile")}>
              Update Profile
            </button>
          ),
        },
        { key: "4", label: <button onClick={onSignOut}>Logout</button> },
      ]}
    />
  );

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <ul>
            <li>
              <button onClick={() => history.push("/all-tasks")}>
                All Tasks
              </button>
            </li>
            <li>
              <button onClick={() => history.push("/all-users")}>
                All Users
              </button>
            </li>
            {user && (
              <li>
                <button
                  className="main-navigation__add-task-btn"
                  onClick={() => openSpecificModal("addTask")}
                >
                  Add Task
                </button>
              </li>
            )}
            {!user && (
              <li>
                <button
                  className="main-navigation__auth-btn"
                  onClick={() => openSpecificModal("auth")}
                >
                  Authenticate
                </button>
              </li>
            )}
          </ul>
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="main-navigation__left">
          <h1 className="main-navigation__title">
            <Link to="/">
              <Image
                src="/letsdologo_header.png"
                preview={false}
                width={100}
                style={{ height: "auto", objectFit: "contain" }}
              />
            </Link>
          </h1>
          <nav className="main-navigation__links">
            <ul>
              <li>
                <button onClick={() => history.push("/tasks")}>
                  All Tasks
                </button>
              </li>
              <li>
                <button onClick={() => history.push("/all-users")}>
                  All Users
                </button>
              </li>
              {user && (
                <li>
                  <button
                    className="main-navigation__add-task-btn"
                    onClick={() => openSpecificModal("addTask")}
                  >
                    Add Task
                  </button>
                </li>
              )}
              {!user && (
                <li>
                  <button
                    className="main-navigation__auth-btn"
                    onClick={() => openSpecificModal("auth")}
                  >
                    Authenticate
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          {loggedInUser?.name && (
            <span
              style={{ marginRight: 15, fontSize: "16px", color: "#F0F0F0" }}
            >
              {loggedInUser.name}
            </span>
          )}

          <Search
            placeholder="Search tasks..."
            value={tempQuery}
            onChange={handleInputChange}
            onClear={handleClearSearch}
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={onSearch}
            size="large"
            style={{ width: 250, marginRight: 20 }}
          />
        </div>
        <Dropdown menu={avatarMenu} placement="bottomRight" arrow>
          <Avatar
            size={40}
            icon={<UserOutlined />}
            src={`http://localhost:8000${loggedInUser?.photo}`}
            style={{ cursor: "pointer", marginLeft: 15 }}
          />
        </Dropdown>
      </MainHeader>
      {modalType === "addTask" && (
        <NewTask isModalOpen={isModalOpen} onClose={closeModal} />
      )}
      {modalType === "auth" && (
        <AuthForm isModalOpen={isModalOpen} closeModal={closeModal} />
      )}
      {modalType === "updateProfile" && (
        <UpdateProfileForm isModalOpen={isModalOpen} closeModal={closeModal} />
      )}
    </>
  );
};

export default MainNavigation;
