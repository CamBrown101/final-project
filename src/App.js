import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
