// hooks/useCategories.js
import { useEffect, useState } from "react";
import { getCategories } from "../../../services/features/category";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        if (Array.isArray(result)) {
          setCategories(result);
        } else {
          setError("Unexpected response format");
          setCategories([]);
        }
      } catch (err) {
        setError("Error fetching categories");
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return { categories, error, setError };
};

export default useCategories;
