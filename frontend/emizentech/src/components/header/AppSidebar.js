import React,{useState} from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import InsightsIcon from "@mui/icons-material/Insights";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HelpIcon from "@mui/icons-material/Help";
import { useSelector } from "react-redux";

const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const appBarColor = "#fafafa"; // Define the header color here

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: appBarColor, // Set the background color here
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function HeaderBar(role) {
console.log("role",role);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.isLoginIn.user.user

  );
  // console.log("user___", user);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/Dashboard");
  };

  const removeToken = (token) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.setToken(null);
    console.log("User logOut successfully");
    navigate("/login");
  };


  if(user?.role==="Admin"){
   
 
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="#03a9f4"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            style={{ fontFamily: '"Khand", sans-serif', color: "#03a9f4" }}
          >
            <div onClick={handleHome}>EmizenTech</div>
          </Typography>

          <Toolbar sx={{ marginLeft: "auto" }}>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ marginLeft: " 0 auto" }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={`http://localhost:8005/upload/images/${user?.image}`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to="/Profile"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/Passwordchange"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Change Password</Typography>
                </MenuItem>
               
                <MenuItem icon={<LogoutIcon />} onClick={removeToken}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#03a9f4" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
      
    

          <ListItem key="Dashboard" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                // minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InsightsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
  
          <ListItem key="Employee" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              component={Link} 
              to="/Admin"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        
        
          <ListItem key="subAdmin" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              component={Link} 
              to="/Subadmin"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
               <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Sub Admin" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Tasks" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              component={Link} 
              to="/Subadmin"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TaskAltIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="manageAccounts" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              component={Link} 
              to="/ManageAccounts"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="User Management" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Wallets" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              > 
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Wallets" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Help" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {/* Repeat the above structure for other list items */}
        </List>

        <Divider />
      </Drawer>
      <DrawerHeader />
    </Box>
  );

              }
              else 
              if(user?.role==="Subadmin"){
               
             
              return (
                <Box sx={{ display: "flex" }}>
                  <CssBaseline />
                  <AppBar position="fixed" open={open}>
                    <Toolbar>
                      <IconButton
                        color="#03a9f4"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                          marginRight: 5,
                          ...(open && { display: "none" }),
                        }}
                      >
                        <MenuIcon />
                      </IconButton>
            
                      <Typography
                        variant="h4"
                        style={{ fontFamily: '"Khand", sans-serif', color: "#03a9f4" }}
                      >
                        <div onClick={handleHome}>EmizenTech</div>
                      </Typography>
            
                      <Toolbar sx={{ marginLeft: "auto" }}>
                        <Box sx={{ flexGrow: 0 }}>
                          <Tooltip title="Open settings">
                            <IconButton
                              onClick={handleOpenUserMenu}
                              sx={{ marginLeft: " 0 auto" }}
                            >
                              <Avatar
                                alt="Remy Sharp"
                                src={`http://localhost:8005/upload/images/${user?.image}`}
                              />
                            </IconButton>
                          </Tooltip>
                          <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                          >
                            <MenuItem
                              component={Link}
                              to="/Profile"
                              onClick={handleCloseUserMenu}
                            >
                              <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              to="/Passwordchange"
                              onClick={handleCloseUserMenu}
                            >
                              <Typography textAlign="center">Change Password</Typography>
                            </MenuItem>
                           
                            <MenuItem icon={<LogoutIcon />} onClick={removeToken}>
                              <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Toolbar>
                    </Toolbar>
                  </AppBar>
                  <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                      <IconButton onClick={handleDrawerClose} sx={{ color: "#03a9f4" }}>
                        {theme.direction === "rtl" ? (
                          <ChevronRightIcon />
                        ) : (
                          <ChevronLeftIcon />
                        )}
                      </IconButton>
                    </DrawerHeader>
                    <Divider />
            
                    <List>
                  
                
            
                      <ListItem key="Dashboard" disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          sx={{
                            // minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <InsightsIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Dashboard"
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
              
                    
                      <ListItem key="subAdmin" disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                          component={Link} 
                          to="/Subadmin"
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                           <DashboardIcon />
                          </ListItemIcon>
                          <ListItemText primary="Sub Admin" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                      <ListItem key="Tasks" disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                          component={Link} 
                          to="/Subadmin"
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <TaskAltIcon />
                          </ListItemIcon>
                          <ListItemText primary="Tasks" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                      <ListItem key="manageAccounts" disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                          component={Link} 
                          to="/ManageAccounts"
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <ManageAccountsIcon />
                          </ListItemIcon>
                          <ListItemText primary="User Management" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                      <ListItem key="Wallets" disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          > 
                            <AccountBalanceWalletIcon />
                          </ListItemIcon>
                          <ListItemText primary="Wallets" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                      <ListItem key="Help" disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <HelpIcon />
                          </ListItemIcon>
                          <ListItemText primary="Help" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                      {/* Repeat the above structure for other list items */}
                    </List>
            
                    <Divider />
                  </Drawer>
                  <DrawerHeader />
                </Box>
              );
            
                          }
  
}


