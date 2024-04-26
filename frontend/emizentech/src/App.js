
import './App.css';
import { useRoutes } from 'react-router-dom';
import ProtectedRoute from './pages/privateRoute';
// import { Provider } from 'react-redux';
// import store from './redux/store';
import Register from './pages/Register';

import Login from './pages/Login';
import Otpsend from './pages/Forgotpassword';
import Forgot from './pages/Resetpassword';
import Home from './pages/Home';
import Profile from './components/profile';
import Admin from './views/projects/superAdmin';
import Role from './views/ManageAccounts/ManageAccounts';
import Addrole from './views/ManageAccounts/addRole';
import Updaterole from './views/ManageAccounts/updateRole';
import Employee from './views/projects/addSubAdmin';
import UpdateEmployee from './views/projects/updateEmployee';
import Subadmin from './views/projects/subAdmin';
import Passwordchange from './components/changePassword';
import Dashboard from './components/Dashboard';

  const routes = [
    {
      path: "/",
      element: <ProtectedRoute element={<Dashboard />} />,
      children:[{ path: "Dashboard", element: <Dashboard/> }],
    },
    
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/Otpsend', element: <Otpsend /> },
      { path: '/Forgot', element: <Forgot /> },
      { path: '/Profile', element: <Profile /> },
      
      { path: '/Employee', element: <Employee /> },
      { path: '/updateEmployee/:id', element: <UpdateEmployee /> },
      { path: '/Passwordchange', element: <Passwordchange /> },
      { path: '/Admin', element: <Admin /> },
      { path: '/Subadmin', element: <Subadmin /> },
      { path: '/Role', element: <Role /> },
      { path: '/Addrole', element: <Addrole /> },
      { path: '/Updaterole/:id', element: <Updaterole /> },
     
  ]

  const Router=()=>{
    const routing=useRoutes(routes)
  
  return routing;
  }



export default Router;
