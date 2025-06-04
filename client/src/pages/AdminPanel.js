import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Divider,
  ListItemIcon,
  Container,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
// import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

import CreateQuestionPage from '../components/Create';
import QuestionsList from '../components/Fetch';

const drawerWidth = 240;

function getUsernameFromToken() {
  const token = localStorage.getItem('idToken'); // Adjust key as needed
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['cognito:username'] || payload['username'] || null;
  } catch {
    return null;
  }
}

export default function AdminPanel() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = getUsernameFromToken();
    setUsername(user);
  }, []);

  const handleLogout = () => {
    const clientId = '560v95kl8u0vl1lqt0a173a19a';
    const logoutUrl = `https://eu-north-19bhy7e42m.auth.eu-north-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=http://localhost:3000/`;
    window.location.href = logoutUrl;
  };

  const renderComponent = () => {
    if (activeComponent === 'add') return <CreateQuestionPage />;
    if (activeComponent === 'fetch') return <QuestionsList />;
    // Default view: show welcome message
    return (
      <Typography variant="h5" color="textPrimary" sx={{ mt: 4 }}>
        {username ? `Hi, welcome ${username}` : 'Hi, welcome Admin'}
      </Typography>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => setActiveComponent('add')}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Question" />
            </ListItem>
            <ListItem button onClick={() => setActiveComponent('fetch')}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Fetch Questions" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* offset for AppBar */}
        <Container maxWidth="md">{renderComponent()}</Container>
      </Box>
    </Box>
  );
}
