import { useEffect, useState } from "react";
import dayjs from "dayjs";

const useTaskForm = (taskToEdit, form) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setIsEditing(true);
      const formattedValues = Object.entries({
        title: taskToEdit.title,
        description: taskToEdit.description,
        category: taskToEdit.category._id,
        priority: taskToEdit.priority,
        date: taskToEdit.date ? dayjs(taskToEdit.date) : null,
        picture: taskToEdit.imageUrl || "",
        status: taskToEdit.status || "Not started",
        user: taskToEdit.user._id,
      }).reduce((acc, [key, value]) => {
        acc[key] = value ?? ""; // Default to an empty string if value is null/undefined
        return acc;
      }, {});

      form.setFieldsValue(formattedValues);
    } else {
      form.resetFields();
      setIsEditing(false);
    }
  }, [taskToEdit, form]);

  return isEditing;
};

export default useTaskForm;
