import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, IconButton, Grid, Paper 
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import axios from "axios";
import { OutboundRounded } from "@mui/icons-material";

const drawerWidth = 240; // Sidebar width

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [count, setCount] = useState({ userCount: 0, productCount: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (!token) {
      setIsAuthenticated(false);
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 sec
    } else {
      setIsAuthenticated(true);
      axios.get("http://localhost:9000/admin/viewcount")
        .then((res) => setCount(res.data))
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  // If not authenticated, show an "Intruder Alert" message
  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          backgroundColor: "#212121",
          color: "#fff",
        }}
      >
     <Typography variant="h4">🚨⚠️ Intruder Alert! ⚠️🚨</Typography>
<Typography variant="h6" sx={{ mt: 2 }}>
  Nice try, but you’re not supposed to be here. 🚫🔒
</Typography>
<Typography variant="h6" sx={{ mt: 1 }}>
  Redirecting you to the login page in 5 seconds... ⏳🚪
</Typography>

      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, backgroundColor: "#212121", color: "#fff", height: "100%" }}>
      <Toolbar />
      <List>
        <ListItem button onClick={() => navigate("/admin")}>
          <ListItemIcon sx={{ color: "#fff" }}><HomeIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={() => navigate("/admin/viewbridal")}>
          <ListItemIcon sx={{ color: "#fff" }}><ProductionQuantityLimitsIcon /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>

        <ListItem button onClick={() => navigate("/admin/viewauction")}>
          <ListItemIcon sx={{ color: "#fff" }}><ProductionQuantityLimitsIcon /></ListItemIcon>
          <ListItemText primary="Auction" />
        </ListItem>
         
        <ListItem button onClick={() => navigate("/admin/orders")}>
          <ListItemIcon sx={{ color: "#fff" }}><OutboundRounded /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>


        <ListItem button onClick={() => navigate("/admin/viewuser")}>
          <ListItemIcon sx={{ color: "#fff" }}><PersonIcon /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: "#fff" }}><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Sidebar for Larger Screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" }
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Main Content with Sidebar Padding */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          p: 3,
          minHeight: "100vh",
          ml: { xs: 0, sm: `${drawerWidth}px` } // Push content right on large screens
        }}
      >
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#1976d2" }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" sx={{ display: { sm: "none" } }} onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        {/* User & Product Count Display */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#1976d2", color: "#fff" }}>
              <PersonIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{count.userCount}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#d32f2f", color: "#fff" }}>
              <ProductionQuantityLimitsIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">{count.productCount}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* This allows nested pages to render inside AdminDashboard */}
        <Outlet />
      </Box>
    </Box>
  );
}
