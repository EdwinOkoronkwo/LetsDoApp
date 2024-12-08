import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TaskItem from "../components/TaskItem";
import { searchTasks } from "../../../services/features/tasks";
import { useSearch } from "../../../state/context/searchContext";
import "./SearchResults.css";

/**
 * SearchResults component fetches and displays tasks based on the search query in the URL.
 *
 * It uses the search query from the main navigation and fetches tasks based on that input.
 * If no tasks are found, a message is displayed. If the query is cleared, it redirects to
 * the tasks page.
 *
 * @returns {JSX.Element} The SearchResults component.
 */
const SearchResults = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParam = new URLSearchParams(location.search).get("query") || "";
  const { searchQuery, setSearchQuery } = useSearch();

  // Sync queryParam with context state using useEffect
  useEffect(() => {
    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
    }
  }, [queryParam, searchQuery, setSearchQuery]);

  // Redirect to tasks page if the query is cleared
  useEffect(() => {
    if (!searchQuery.trim()) {
      const timer = setTimeout(() => {
        history.push("/tasks");
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [searchQuery, history]);

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks", searchQuery],
    queryFn: () => searchTasks(searchQuery),
    enabled: searchQuery.trim().length > 0 || searchQuery === "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message || "Error fetching tasks"}</div>;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="search-results__empty">
        <h2>No tasks found. Try adjusting your search.</h2>
      </div>
    );
  }

  return (
    <div>
      <ul className="search-results">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            id={task._id}
            title={task.title}
            user={task.user}
            category={task.category}
            status={task.status}
            date={task.date}
            priority={task.priority}
            imageUrl={task.picture}
          />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
