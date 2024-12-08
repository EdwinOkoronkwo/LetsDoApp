// export default TaskForm;
// import React from "react";
// import { Form, Input, Button, Modal, Select, DatePicker, message } from "antd";
// import { useModal } from "../../../state/context/modalContext";
// import useTasks from "../hooks/useTasks";
// import useCategories from "../../category/hooks/useCategories";
// import useUsers from "../../users/hooks/useUsers";
// import moment from "moment";
// import useTaskForm from "../hooks/useTaskForm";

// const { Option } = Select;

// const TaskForm = () => {
//   const { taskToEdit, isModalOpen, closeModal } = useModal();
//   const [form] = Form.useForm();
//   const {
//     tasks,
//     isLoading,
//     error,
//     removeTask,
//     updateTask,
//     createNewTask,
//     isDeleting,
//     refetch,
//   } = useTasks();

//   const { categories } = useCategories();
//   const { users } = useUsers();

//   const isEditing = useTaskForm(taskToEdit, form);

//   const handleSubmit = async (values) => {
//     const formattedValues = {
//       ...values,
//       date: values.date ? moment(values.date).toISOString() : null,
//     };

//     try {
//       if (isEditing) {
//         // Handle task editing
//         const taskId = taskToEdit?.id;
//         if (!taskId) {
//           console.error("No task ID provided for editing.");
//           return;
//         }

//         // Merge existing task with updated values
//         await updateTask({ ...taskToEdit, ...formattedValues });
//         message.success("Task updated successfully!");
//       } else {
//         // Handle task addition
//         await createNewTask(formattedValues);
//         message.success("Task added successfully!");
//       }
//       closeModal();
//       form.resetFields();
//     } catch (error) {
//       message.error(error.message || "Failed to save task");
//     }
//   };

//   return (
//     <Modal
//       title={isEditing ? "Edit Task" : "Add Task"}
//       open={isModalOpen}
//       onCancel={closeModal}
//       destroyOnClose
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleSubmit}
//         initialValues={{
//           title: "",
//           description: "",
//           category: "",
//           priority: "Medium",
//           picture: "",
//           status: "Not started",
//           user: "",
//         }}
//       >
//         <Form.Item
//           label="Title"
//           name="title"
//           rules={[
//             { required: true, message: "Please enter a task title" },
//             { min: 5, message: "Title must be at least 5 characters long" },
//           ]}
//         >
//           <Input placeholder="Enter task title" />
//         </Form.Item>

//         <Form.Item
//           label="Description"
//           name="description"
//           rules={[{ required: true, message: "Please enter a description" }]}
//         >
//           <Input.TextArea rows={4} placeholder="Enter task description" />
//         </Form.Item>

//         <Form.Item
//           name="picture"
//           label="Picture URL"
//           validateTrigger="onBlur"
//           rules={[
//             { required: true, message: "Please enter a picture URL" },
//             { type: "url", message: "Please enter a valid URL" },
//           ]}
//         >
//           <Input placeholder="Enter picture URL" />
//         </Form.Item>
//         <Form.Item
//           label="Category"
//           name="category"
//           rules={[{ required: true, message: "Please select a category" }]}
//         >
//           <Select placeholder="Select category">
//             {categories.map((category) => (
//               <Option key={category._id} value={category._id}>
//                 {category.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Priority" name="priority">
//           <Select defaultValue="Medium">
//             <Option value="Low">Low</Option>
//             <Option value="Medium">Medium</Option>
//             <Option value="High">High</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Due Date" name="date">
//           <DatePicker placeholder="Select due date" style={{ width: "100%" }} />
//         </Form.Item>

//         <Form.Item
//           label="Status"
//           name="status"
//           rules={[{ required: true, message: "Please select a status" }]}
//         >
//           <Select placeholder="Select status">
//             <Option value="Not started">Not started</Option>
//             <Option value="Started">Started</Option>
//             <Option value="Completed">Completed</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="Assign User"
//           name="user"
//           rules={[
//             { required: true, message: "Please assign a user to the task" },
//           ]}
//         >
//           <Select placeholder="Select user">
//             {users.map((user) => (
//               <Option key={user._id} value={user._id}>
//                 {user.name} {/* Display user's name */}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Button
//           type="primary"
//           htmlType="submit"
//           //loading={isAdding || isEditingTask}
//           loading={isLoading}
//           block
//         >
//           {isEditing ? "Update Task" : "Add Task"}
//         </Button>
//       </Form>
//     </Modal>
//   );
// };

// export default TaskForm;

import React from "react";
import { Form, Input, Button, Modal, Select, DatePicker, message } from "antd";
import { useModal } from "../../../state/context/modalContext";
import useTasks from "../hooks/useTasks";
import useCategories from "../../category/hooks/useCategories";
import useUsers from "../../users/hooks/useUsers";
import moment from "moment";
import useTaskForm from "../hooks/useTaskForm";

const { Option } = Select;

const TaskForm = () => {
  const { taskToEdit, isModalOpen, closeModal } = useModal();
  const [form] = Form.useForm();
  const {
    tasks,
    isLoading,
    error,
    removeTask,
    updateTask,
    createNewTask,
    isDeleting,
    refetch,
  } = useTasks();

  const { categories } = useCategories();
  const { users } = useUsers();

  const isEditing = useTaskForm(taskToEdit, form);

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? moment(values.date).toISOString() : null,
    };

    try {
      if (isEditing) {
        // Handle task editing
        const taskId = taskToEdit?.id;
        if (!taskId) {
          console.error("No task ID provided for editing.");
          return;
        }

        // Delete the task first
        await removeTask(taskId);

        // After deleting, create the updated task
        await updateTask({ ...taskToEdit, ...formattedValues });
        message.success("Task updated successfully!");
      } else {
        // Handle task addition
        await createNewTask(formattedValues);
        message.success("Task added successfully!");
      }
      closeModal();
      form.resetFields();
    } catch (error) {
      message.error(error.message || "Failed to save task");
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Task" : "Add Task"}
      open={isModalOpen}
      onCancel={closeModal}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title: "",
          description: "",
          category: "",
          priority: "Medium",
          picture: "",
          status: "Not started",
          user: "",
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter a task title" },
            { min: 5, message: "Title must be at least 5 characters long" },
          ]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter task description" />
        </Form.Item>

        <Form.Item name="picture" label="Picture URL" validateTrigger="onBlur">
          <Input placeholder="Enter picture URL" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select category">
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Priority" name="priority">
          <Select defaultValue="Medium">
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Due Date" name="date">
          <DatePicker placeholder="Select due date" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select placeholder="Select status">
            <Option value="Not started">Not started</Option>
            <Option value="Started">Started</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Assign User" name="user">
          <Select placeholder="Select user">
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name} {/* Display user's name */}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading || isDeleting}
          block
        >
          {isEditing ? "Update Task" : "Add Task"}
        </Button>
      </Form>
    </Modal>
  );
};

export default TaskForm;
