import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import CreateEmployee from './components/manager/CreateEmployee';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
      </Switch>
      <CreateEmployee></CreateEmployee>
    </Router>
  );
}

export default App;
