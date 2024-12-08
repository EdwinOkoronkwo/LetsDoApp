import { useEffect } from "react";

export const useResetFormOnModalOpen = (isModalOpen, resetForm) => {
  useEffect(() => {
    if (isModalOpen) {
      resetForm();
    }
  }, [isModalOpen, resetForm]);
};
