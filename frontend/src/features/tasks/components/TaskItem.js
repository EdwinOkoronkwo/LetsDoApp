import React, { useState } from "react";
import { useAuth } from "../../../state/context/authContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Card from "../../../ui/UIElements/Card";
import Button from "../../../ui/FormElements/Button";
import Modal from "../../../ui/UIElements/Modal";
import { useModal } from "../../../state/context/modalContext"; // Import the useModal hook
import "./TaskItem.css";
import useTasks from "../hooks/useTasks";

const TaskItem = (props) => {
  const { user } = useAuth();
  const { removeTask } = useTasks();
  const { openModal, closeModal, taskToEdit } = useModal();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formattedDate = new Date(props.date).toLocaleDateString();
  const isTaskOwner = user && props.user && props.user._id === user._id;

  const openDeleteModalHandler = () => setShowDeleteModal(true);
  const closeDeleteModalHandler = () => setShowDeleteModal(false);

  const openEditModalHandler = () => {
    openModal(props, "editTask"); // Pass both task data and modal content type
  };

  const confirmDelete = async () => {
    try {
      await removeTask(props.id);
      closeDeleteModalHandler();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteModalHandler}
        header="Are you sure?"
        footerClass="modal__actions"
        footer={
          <>
            <Button inverse onClick={closeDeleteModalHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this task? Please note that this
          action cannot be undone.
        </p>
      </Modal>

      {/* Task Item */}
      <li className="task-item">
        <Card className="task-item__content">
          <div className="task-item__info">
            <h2>{props.title}</h2>
            <p>
              <strong>User:</strong> {props.user ? props.user.name : "Unknown"}
            </p>
            <p>
              <strong>Category:</strong> {props.category.name}
            </p>
            <p>
              <strong>Status:</strong> {props.status}
            </p>
            <p>
              <strong>Date:</strong> {formattedDate}
            </p>
            <p>
              <strong>Priority:</strong> {props.priority}
            </p>
            {props.imageUrl && (
              <div className="task-item__image">
                <img src={props.imageUrl} alt={props.title} />
              </div>
            )}
          </div>
          {isTaskOwner && (
            <div className="task-item__actions">
              {/* Edit Button */}
              <Button onClick={openEditModalHandler} className="custom-button">
                <EditOutlined />
                <span>Edit</span>
              </Button>

              {/* Delete Button */}
              <Button
                danger
                className="custom-button"
                onClick={openDeleteModalHandler}
              >
                <DeleteOutlined />
                <span>Delete</span>
              </Button>
            </div>
          )}
        </Card>
      </li>
    </>
  );
};

export default TaskItem;

// const TaskItem = (props) => {
//   const { user } = useAuth();
//   const { removeTask } = useTasks();
//   const { openModal, closeModal, taskToEdit } = useModal(); // Access modal context (taskToEdit)

//   const [showDeleteModal, setShowDeleteModal] = useState(false); // Correct use of useState for delete modal
//   const [showEditModal, setShowEditModal] = useState(false); // State for edit modal

//   const formattedDate = new Date(props.date).toLocaleDateString();
//   const isTaskOwner = user && props.user._id === user._id;

//   const openDeleteModalHandler = () => setShowDeleteModal(true);
//   const closeDeleteModalHandler = () => setShowDeleteModal(false);

//   // Open Edit Modal and pass task data for editing
//   const openEditModalHandler = () => {
//     console.log("Opening edit modal with task:", props); // Check if props contain the task
//     openModal(props); // Pass the task to the modal context
//     setShowEditModal(true); // Open the modal for editing
//   };

//   const closeEditModalHandler = () => {
//     console.log("Closing edit modal..."); // Debugging: Check if this is triggered
//     setShowEditModal(false); // Close TaskForm modal
//     closeModal(); // Reset taskToEdit
//   };

//   const confirmDelete = async () => {
//     try {
//       await removeTask(props.id);
//       closeDeleteModalHandler();
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };
//   console.log("taskToEdit inside TaskItem:", taskToEdit); // Debugging log

//   return (
//     <>
//       {/* Delete Confirmation Modal */}
//       <Modal
//         show={showDeleteModal}
//         onCancel={closeDeleteModalHandler}
//         header="Are you sure?"
//         footerClass="modal__actions"
//         footer={
//           <>
//             <Button inverse onClick={closeDeleteModalHandler}>
//               Cancel
//             </Button>
//             <Button danger onClick={confirmDelete}>
//               Delete
//             </Button>
//           </>
//         }
//       >
//         <p>
//           Do you want to proceed and delete this task? Please note that this
//           action cannot be undone.
//         </p>
//       </Modal>

//       {/* Edit Task Modal */}
//       <Modal
//         show={showEditModal}
//         onCancel={closeEditModalHandler}
//         header="Edit Task"
//         footerClass="modal__actions"
//         footer={null}
//       >
//         {taskToEdit ? (
//           <TaskForm
//             task={taskToEdit} // Pass taskToEdit to TaskForm
//             closeModal={closeEditModalHandler} // Close modal after editing
//           />
//         ) : (
//           <p>Loading...</p> // Optional: Display a loading state while taskToEdit is being set
//         )}
//       </Modal>

//       {/* Task Item */}
//       <li className="task-item">
//         <Card className="task-item__content">
//           <div className="task-item__info">
//             <h2>{props.title}</h2>
//             <p>
//               <strong>User:</strong> {props.user.name}
//             </p>
//             <p>
//               <strong>Category:</strong> {props.category.name}
//             </p>
//             <p>
//               <strong>Status:</strong> {props.status}
//             </p>
//             <p>
//               <strong>Date:</strong> {formattedDate}
//             </p>
//             <p>
//               <strong>Priority:</strong> {props.priority}
//             </p>
//             {props.imageUrl && (
//               <div className="task-item__image">
//                 <img src={props.imageUrl} alt={props.title} />
//               </div>
//             )}
//           </div>
//           {isTaskOwner && (
//             <div className="task-item__actions">
//               {/* Edit Button */}
//               <Button onClick={openEditModalHandler} className="custom-button">
//                 <EditOutlined />
//                 <span>Edit</span>
//               </Button>

//               {/* Delete Button */}
//               <Button
//                 danger
//                 className="custom-button"
//                 onClick={openDeleteModalHandler}
//               >
//                 <DeleteOutlined />
//                 <span>Delete</span>
//               </Button>
//             </div>
//           )}
//         </Card>
//       </li>
//     </>
//   );
// };

// export default TaskItem;
