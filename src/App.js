import './App.scss';
import { useContext, useState } from 'react';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
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
import ProductionContainer from './components/productionScreen/ProductionContainer';

function App() {
  const { user } = useContext(UserContext);
  const [bill, setBill] = useState({
    items: [],
    tax: 0,
    subtotal: 0,
    total: 0,
  });
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/menu"
          render={(props) =>
            user.auth ? (
              <Home {...props} bill={bill} setBill={setBill} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/split"
          render={(props) =>
            user.auth ? (
              <Split {...props} bill={bill} setBill={setBill} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/manager"
          exact
          render={(props) =>
            user.auth ? <Manager /> : <Redirect to="/login" />
          }
        />
        <Route path="/timecard" component={TimecardEntry} />
        <Route
          path="/manager/employees"
          exact
          render={(props) =>
            user.auth ? <Employees /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/manager/create-menu-item"
          exact
          render={(props) =>
            user.auth ? <CreateItem /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/manager/create-category"
          exact
          render={(props) =>
            user.auth ? <CreateCategory /> : <Redirect to="/login" />
          }
        />
        <Route path="/food-production" component={ProductionContainer} />
        <Route
          path="/"
          render={(props) => (user.auth ? <Home /> : <Redirect to="/login" />)}
        />
      </Switch>
      <Nav></Nav>
    </Router>
  );
}

export default App;
