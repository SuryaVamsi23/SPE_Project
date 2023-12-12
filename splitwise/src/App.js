import './App.css';
import LoginScreen from './Components/LoginScreen/LoginScreen';
import ViewGroups from './Components/ViewGroups/ViewGroups';
import GroupsPage from './Components/GroupsPage/GroupsPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path="/viewgroups" exact component={ViewGroups} />
        <Route path="/groups/:group_id" component={GroupsPage} />
      </Switch>
    </Router>
  );
}

export default App;
