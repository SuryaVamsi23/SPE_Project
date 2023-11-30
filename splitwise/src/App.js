import logo from './logo.svg';
import './App.css';
import Login from './Components/LoginScreen/login';
import HomeScreen from './Components/HomeScreen/HomeScreen';
import Groups from './Components/GroupsPage/GroupsPage';
import ViewGroups from './Components/ViewGroups/ViewGroups';
import GroupCard from './Components/ViewGroups/GroupCard';
function App() {
  return (
    <div>
      {/* <Login/> */}
      <ViewGroups/>
       {/* <GroupCard groupName="Goa Trip"/> */}
      {/* <HomeScreen/> */}
      {/* <SideNav/> */}
      {/* <Groups/>  */}
    </div>
  );
}

export default App;
