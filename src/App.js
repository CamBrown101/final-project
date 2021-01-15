import './App.scss';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import Login from './components/Login';
import Home from './components/Home';
import CreateEmployee from './components/manager/CreateEmployee';

function App() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/menu" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
      <CreateEmployee></CreateEmployee>
    </Router>
  );
}

export default App;
