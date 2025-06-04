import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useAuth } from "react-oidc-context";
export default function AdminLogin() {
 
  const auth = useAuth();
   const handleOIDCLogin =  () => {
    try {
       auth.signinRedirect({
        provider: 'COGNITO', // default Cognito Hosted UI provider
      });
    } catch (err) {
      console.error('OIDC login error:', err);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '4rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Login
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleOIDCLogin}
        style={{ marginTop: '2rem' }}
      >
        Login with Admin Account
      </Button>

      <Typography align="center" style={{ marginTop: '1rem' }}>
        Don’t have an account? Admins can{' '}
        <a
          href={process.env.SIGNUP_URL}

          style={{ color: '#1976d2', textDecoration: 'none' }}
        >
          Sign Up Here
        </a>
      </Typography>
    </Container>
  );
}
