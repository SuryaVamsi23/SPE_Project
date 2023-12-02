import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ViewGroups from './Components/ViewGroups/ViewGroups';
import GroupsPage from './Components/GroupsPage/GroupsPage'; 

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ViewGroups} />
        <Route path="/groups" component={GroupsPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
