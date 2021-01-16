import './App.scss';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import Login from './components/Login';
import Home from './components/Home';
import Manager from './components/manager/Manager';
import Nav from './components/Nav';
import Split from './components/Split';
import Employees from './components/manager/Employees.js';
import CreateItem from './components/manager/CreateItem.js';
import CreateCategory from './components/manager/CreateCategory.js';
function App() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/menu" component={Home} />
        <Route path="/split" component={Split} />
        <Route path="/manager" exact component={Manager} />
        <Route path="/manager/employees" exact component={Employees} />
        <Route path="/manager/create-menu-item" exact component={CreateItem} />
        <Route
          path="/manager/create-category"
          exact
          component={CreateCategory}
        />
        <Route path="/" component={Home} />
      </Switch>
      <Nav></Nav>
    </Router>
  );
}

export default App;
