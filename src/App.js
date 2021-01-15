import "./App.scss";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./UserContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Manager from "./components/manager/Manager";
import Nav from "./components/Nav";
import CreateEmployee from "./components/manager/CreateEmployee.js";
import CreateItem from "./components/manager/CreateItem.js";
import CreateCategory from "./components/manager/CreateCategory.js";
import TimecardEntry from "./components/TimecardEntry";

function App() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/menu" component={Home} />
        <Route path="/manager" exact component={Manager} />
        <Route
          path="/manager/create-employee"
          exact
          component={CreateEmployee}
        />
        <Route path="/manager/create-menu-item" exact component={CreateItem} />
        <Route
          path="/manager/create-category"
          exact
          component={CreateCategory}
        />
        <Route path="/" component={Home} />
      </Switch>
      <TimecardEntry></TimecardEntry>
      <Nav></Nav>
    </Router>
  );
}

export default App;
