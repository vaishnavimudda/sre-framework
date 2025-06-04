import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField fullWidth margin="normal" label="Email" />
        <TextField fullWidth margin="normal" label="Password" type="password" />
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
