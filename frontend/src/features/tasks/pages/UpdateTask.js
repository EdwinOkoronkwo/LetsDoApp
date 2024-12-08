// import React from "react";
// import { useParams } from "react-router-dom";
// import Input from "../../../ui/FormElements/Input";
// import Button from "../../../ui/FormElements/Button";
// import {
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_REQUIRE,
// } from "../../../utils/validator";

// import "./Tasks.css";

// const DUMMY_TASKS = [
//   {
//     id: "t1",
//     title: "Complete Project Report",
//     description: "Finish the project report by end of the week.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1634078111185-8c26c5cbc294?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRhc2t8ZW58MHx8MHx8fDA%3D",
//     address: "123 Task Lane, Work City, WC 12345",
//     location: {
//       lat: 40.7484445,
//       lng: -73.9882393,
//     },
//     creator: "u1",
//   },
//   {
//     id: "t2",
//     title: "Prepare Presentation",
//     description: "Prepare slides for the upcoming meeting.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHRhc2t8ZW58MHx8MHx8fDA%3D",
//     address: "456 Office Blvd, Business Town, BT 67890",
//     location: {
//       lat: 40.7484445,
//       lng: -73.9882393,
//     },
//     creator: "u2",
//   },
// ];

// const UpdateTask = () => {
//   const taskId = useParams().taskId;
//   const identifiedTask = DUMMY_TASKS.find((task) => task.id === taskId);

//   if (!identifiedTask) {
//     return (
//       <div className="center">
//         <h2>Could not find the task!</h2>
//       </div>
//     );
//   }

//   return (
//     <form className="task-form">
//       <Input
//         id="title"
//         element="input"
//         type="text"
//         label="Title"
//         validators={[VALIDATOR_REQUIRE()]}
//         errorText="Please enter a valid title."
//         onInput={() => {}}
//         value={identifiedTask.title}
//         valid={true}
//       />
//       <Input
//         id="description"
//         element="textarea"
//         label="Description"
//         validators={[VALIDATOR_MINLENGTH(5)]}
//         errorText="Please enter a valid description (at least 5 characters)."
//         onInput={() => {}}
//         value={identifiedTask.description}
//         valid={true}
//       />
//       <Button type="submit" disabled={true}>
//         UPDATE TASK
//       </Button>
//     </form>
//   );
// };

// export default UpdateTask;
