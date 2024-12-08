import React, { useState } from "react";
import Card from "../../../ui/UIElements/Card";
import TaskItem from "./TaskItem";
import TaskForm from "../pages/TaskForm"; // Import TaskForm
import useTasks from "../hooks/useTasks";
import Modal from "../../../ui/UIElements/Modal"; // Import Modal component
import "./TaskList.css";

const TaskList = () => {
  const {
    tasks,
    isLoading,
    isError,
    error,
    removeTask,
    refetch, // Refetch function to manually trigger data fetching
    isDeleting,
  } = useTasks(); // Using the custom hook to manage tasks

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // Holds the task data for editing
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search query

  // Open modal for adding a task
  const openAddTaskModal = () => {
    setTaskToEdit(null); // No task data, so it's for adding a new task
    setIsModalOpen(true);
  };

  // Open modal for editing an existing task
  const openEditTaskModal = (task) => {
    setTaskToEdit(task); // Set task data for editing
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null); // Reset the task to avoid accidental reuse of old data
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="task-list center">
        <Card>
          <h2>Loading tasks...</h2>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="task-list center">
        <Card>
          <h2>Error loading tasks. Please try again later.</h2>
        </Card>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list center">
        <Card>
          <h2>No Tasks found. Maybe create one?</h2>
          <button onClick={openAddTaskModal}>Add Task</button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Search Input */}
      <div className="task-list__search">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <button onClick={openAddTaskModal} className="add-task-btn">
        Add Task
      </button>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task._id} // Ensure unique task id
              id={task._id}
              title={task.title}
              status={task.status}
              description={task.description}
              category={task.category}
              user={task.user}
              date={task.date}
              priority={task.priority}
              imageUrl={task.picture} // Passing the image URL as a prop
              onDelete={() => removeTask(task._id)} // Pass the removeTask function to TaskItem
              onEdit={() => openEditTaskModal(task)} // Pass onEdit function to open modal for editing
            />
          ))
        ) : (
          <div className="task-list__empty">
            <Card>
              <h2>No tasks match your search.</h2>
            </Card>
          </div>
        )}
      </ul>

      {/* Modal to add or edit task */}
      <Modal
        title={taskToEdit ? "Edit Task" : "Add New Task"}
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null} // Custom footer handled inside TaskForm
      >
        <TaskForm task={taskToEdit} onClose={closeModal} />{" "}
        {/* Pass task to TaskForm */}
      </Modal>
    </div>
  );
};

export default TaskList;
