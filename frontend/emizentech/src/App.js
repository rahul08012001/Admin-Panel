
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
// import Dashboard from './components/Dashboard';
import Passwordchange from './components/changePassword';
// import { ToastContainer } from "react-toastify";
// import Header from './header/App';


  const routes = [
    {
      path: "/",
      element: <ProtectedRoute element={<Home />} />,
      children:[{ path: "Home", element: <Home/> }],
    },
    
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/Otpsend', element: <Otpsend /> },
      { path: '/Forgot', element: <Forgot /> },
      { path: '/Profile', element: <Profile /> },
      // { path: '/Dashboard', element: <Dashboard /> },
      { path: '/Passwordchange', element: <Passwordchange /> },
      // <ToastContainer />
    
     
      
     
  ]

  const Router=()=>{
    const routing=useRoutes(routes)
  
  return routing;
  }



export default Router;
