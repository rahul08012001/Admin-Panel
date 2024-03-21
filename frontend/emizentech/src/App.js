
import './App.css';
import { useRoutes } from 'react-router-dom';
import ProtectedRoute from './pages/privateRoute';
import { Provider } from 'react-redux';
import store from './redux/store'
import Register from './pages/Register';
import Admin from './pages/Home';
import Login from './pages/Login';
import Otpsend from './pages/Forgotpassword';
import Forgot from './pages/Resetpassword';

// import Header from './header/App';


  const routes = [
    {
      path: "/",
      element: <ProtectedRoute element={<Admin />} />,
      children:[{ path: "Admin", element: <Admin/> }],
    },
    
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/Otpsend', element: <Otpsend /> },
      { path: '/Forgot', element: <Forgot /> },
     
    
     
      
     
  ]

  const Router=()=>{
    const routing=useRoutes(routes)
  
  return routing;
  }


const AppRouter =()=>{
  return(
<Provider store={store}>
  <Router/>
</Provider>
  )
}

export default AppRouter;
