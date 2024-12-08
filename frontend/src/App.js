import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "./features/users/pages/Users";
import NewTask from "./features/tasks/pages/TaskForm";
import MainNavigation from "./ui/Navigation/MainNavigation";
import Tasks from "./features/tasks/pages/Tasks";
import UpdateTask from "./features/tasks/pages/UpdateTask";
import HeroSection from "./ui/components/HeroSection"; // Relocated for better structure
import NotFound from "./ui/components/NotFound"; // New 404 Component
import UserDetail from "./features/users/pages/UserDetail";
import SearchResults from "./features/tasks/pages/SearchResults";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <HeroSection />
        </Route>
        <Route path="/users/:userId" exact>
          <UserDetail /> {/* Dynamic route for UserDetail */}
        </Route>
        <Route path="/tasks" exact>
          <Tasks />
        </Route>
        <Route path="/tasks/new" exact>
          <NewTask />
        </Route>
        {/* <Route path="/tasks/:taskId" exact>
          <UpdateTask />
        </Route> */}
        <Route path="/all-users" exact>
          <Users />
        </Route>
        <Route path="/tasks/search" exact>
          <SearchResults />
        </Route>
        <Route path="*">
          <NotFound /> {/* Display a custom 404 page */}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
