// // // import React from "react";
// // // import { useLocation } from "react-router-dom";
// // // import TaskList from "../components/TaskList";
// // // import useTasks from "../hooks/useTasks";

// // // /**
// // //  * Component to display tasks using the TaskList component.
// // //  * Fetches tasks based on the search query and other parameters.
// // //  *
// // //  * @returns {JSX.Element} Rendered task list or status messages.
// // //  */
// // // const Tasks = () => {
// // //   const location = useLocation();
// // //   const queryParams = new URLSearchParams(location.search);
// // //   const searchQuery = queryParams.get("query") || ""; // Get the search query from URL
// // //   const category = queryParams.get("category") || "All"; // Get the category from URL or default to "All"
// // //   const limit = parseInt(queryParams.get("limit")) || 10; // Get the limit from URL or default to 10
// // //   const skip = parseInt(queryParams.get("skip")) || 0; // Get the skip value for pagination

// // //   const { tasks, isLoading, error } = useTasks(
// // //     searchQuery,
// // //     category,
// // //     limit,
// // //     skip
// // //   ); // Here we call useTasks

// // //   if (isLoading) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div>{error.message || "An error occurred"}</div>; // Handle error properly
// // //   }

// // //   return (
// // //     <div>
// // //       {searchQuery ? (
// // //         <h2>Search Results for "{searchQuery}"</h2>
// // //       ) : (
// // //         <h2>All Tasks</h2>
// // //       )}
// // //       <TaskList items={tasks} />{" "}
// // //       {/* TaskList is rendered with tasks from useTasks */}
// // //     </div>
// // //   );
// // // };

// // // export default Tasks;

// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import TaskList from "../components/TaskList";
// // import useTasks from "../hooks/useTasks";

// // /**
// //  * Component to display tasks using the TaskList component.
// //  * Fetches tasks based on the search query.
// //  *
// //  * @returns {JSX.Element} Rendered task list or status messages.
// //  */
// // const Tasks = () => {
// //   const location = useLocation();
// //   const queryParams = new URLSearchParams(location.search);
// //   const searchQuery = queryParams.get("query") || ""; // Get the search query from URL

// //   const { tasks, isLoading, error } = useTasks(searchQuery); // Call useTasks with just the searchQuery

// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>{error.message || "An error occurred"}</div>; // Handle error properly
// //   }

// //   return (
// //     <div>
// //       {searchQuery ? (
// //         <h2>Search Results for "{searchQuery}"</h2>
// //       ) : (
// //         <h2>All Tasks</h2>
// //       )}
// //       <TaskList items={tasks} />{" "}
// //       {/* TaskList is rendered with tasks from useTasks */}
// //     </div>
// //   );
// // };

// // export default Tasks;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import TaskList from "../components/TaskList";
// import useTasks from "../hooks/useTasks";

// /**
//  * Displays all tasks or filters them based on a search query.
//  */
// const Tasks = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("query") || ""; // Get the search term from URL

//   const { tasks, isLoading, error } = useTasks(); // Fetch all tasks using the custom hook

//   // Filter tasks based on the search query
//   const filteredTasks = searchQuery
//     ? tasks.filter((task) =>
//         task.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : tasks;

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error.message || "An error occurred"}</div>;
//   }

//   return (
//     <div>
//       {searchQuery && <h2>Search Results for "{searchQuery}"</h2>}
//       <TaskList items={filteredTasks} /> {/* Pass filtered tasks to TaskList */}
//     </div>
//   );
// };

// export default Tasks;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import TaskList from "../components/TaskList";
// import useTasks from "../hooks/useTasks";

// const Tasks = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("query") || "";

//   const { tasks, isLoading, error } = useTasks();

//   const filteredTasks = searchQuery
//     ? tasks.filter((task) =>
//         task.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : tasks;

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error.message || "An error occurred"}</div>;
//   }

//   return (
//     <div>
//       {searchQuery && <h2>Search Results for "{searchQuery}"</h2>}
//       <TaskList items={filteredTasks} />
//     </div>
//   );
// };

// export default Tasks;

import React from "react";
import { useLocation } from "react-router-dom";
import TaskList from "../components/TaskList";
import useTasks from "../hooks/useTasks";

const Tasks = () => {
  const { tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message || "An error occurred"}</div>;
  }

  return (
    <div>
      <TaskList items={tasks} />
    </div>
  );
};

export default Tasks;
