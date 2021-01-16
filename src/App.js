import './App.scss';
import { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import Login from './components/Login';
import Home from './components/Home';
import Manager from './components/manager/Manager';
import Nav from './components/Nav';
import Employees from './components/manager/Employees.js';
import CreateItem from './components/manager/CreateItem.js';
import CreateCategory from './components/manager/CreateCategory.js';
import TimecardEntry from './components/TimecardEntry';
import Split from './components/Split';

function App() {
  const { user } = useContext(UserContext);
  const [bill, setBill] = useState({
    items: [],
    tax: 0,
    subtotal: 0,
    total: 0,
  });
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/menu"
          render={(props) => <Home {...props} bill={bill} setBill={setBill} />}
        />
        <Route
          path="/split"
          render={(props) => <Split {...props} bill={bill} setBill={setBill} />}
        />
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
      <TimecardEntry></TimecardEntry>
      <Nav></Nav>
    </Router>
  );
}

export default App;
