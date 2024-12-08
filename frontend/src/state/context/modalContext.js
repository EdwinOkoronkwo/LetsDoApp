import React, { createContext, useContext, useState, useCallback } from "react";

// Create Modal Context
const ModalContext = createContext();

// Modal Provider
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // State for dynamic content
  const [taskToEdit, setTaskToEdit] = useState(null); // Add state for taskToEdit

  // Open Modal and set optional content
  const openModal = useCallback((task = null, content = null) => {
    console.log("Opening Modal with task:", task); // Debug
    setTaskToEdit(task);
    setModalContent(content);
    setIsModalOpen(true);
  }, []);

  // Close Modal and clear content
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
    setTaskToEdit(null); // Clear taskToEdit when closing the modal
  }, []);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, taskToEdit, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom Hook to use Modal context
export const useModal = () => useContext(ModalContext);
