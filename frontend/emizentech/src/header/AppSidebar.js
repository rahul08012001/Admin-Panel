// import { useState } from 'react';
// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
// import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
// import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import Header from './AppHeader';
// function App() {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <>
//     <Header active={"Resume Temples"} />
//     <div id="app" style={{ height: '80vh', display: 'flex' }}>
//       <Sidebar style={{ height: '80vh' }} collapsed={collapsed}>
//         <Menu>
//           <MenuItem
//             icon={<MenuOutlinedIcon />}
//             onClick={toggleSidebar}
//             style={{ textAlign: 'center' }}
//           >
//             <h2>Admin</h2>
//           </MenuItem>

//           <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
//           <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
//           <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
//           <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
//           <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
//           <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
//         </Menu>
//       </Sidebar>
//       <main>
//         <h1 style={{ color: 'white', marginLeft: '5rem' }}>React-Pro-Sidebar</h1>
//       </main>
//     </div>

// </>  );
// }

// export default App;

// import { Menu, MenuItem } from 'react-pro-sidebar';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
// import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
// import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// function Sidebar({ collapsed, toggleSidebar }) {
//   return (
//     <Sidebar style={{ height: '80vh' }} collapsed={collapsed}>
//       <Menu>
//         <MenuItem
//           icon={<MenuOutlinedIcon />}
//           onClick={toggleSidebar}
//           style={{ textAlign: 'center' }}
//         >
//           <h2>Admin</h2>
//         </MenuItem>

//         <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
//         <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
//         <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
//         <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
//         <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
//         <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
//       </Menu>
//     </Sidebar>
//   );
// }

// export default Sidebar;

// sidebar.js
import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Header from './AppHeader';

function App() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Header active={"Resume Temples"} sidebarCollapsed={collapsed} />
      <div id="app" style={{ height: '80vh', display: 'flex' }}>
        <Sidebar style={{ height: '80vh' }} collapsed={collapsed}>
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={toggleSidebar}
              style={{ textAlign: 'center' }}
            >
             
            </MenuItem>

            <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
            <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
            <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
            <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
          </Menu>
        </Sidebar>
        <main>
          <h1 style={{ color: 'white', marginLeft: '5rem' }}>React-Pro-Sidebar</h1>
        </main>
      </div>
    </>
  );
}

export default App;
