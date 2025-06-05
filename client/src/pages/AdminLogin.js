

// import React from 'react';
// import { Button, Typography, Container } from '@mui/material';
// import { useAuth } from "react-oidc-context";

// export default function AdminLogin() {
 
//   const auth = useAuth();
 

//    const handleOIDCLogin =  () => {
//     try {
//        auth.signinRedirect({
//         provider: 'COGNITO', // default Cognito Hosted UI provider
//       });
//     } catch (err) {
//       console.error('OIDC login error:', err);
//     }
//   };
 
//   return (
//     <Container maxWidth="xs" style={{ marginTop: '4rem' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Admin Login
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleOIDCLogin}
//         style={{ marginTop: '2rem' }}
//       >
//         Login/Signup with Admin Account
//       </Button>
 
//     </Container>
//   );
// }
 
// import React from 'react';
// import { Button, Typography, Container, Stack } from '@mui/material';
// import { useAuth } from "react-oidc-context";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const auth = useAuth();
//   const navigate = useNavigate();

//   const handleOIDCLogin = () => {
//     try {
//       auth.signinRedirect(); // Login via Hosted UI
//     } catch (err) {
//       console.error('OIDC login error:', err);
//     }
//   };

//   const handleSignupRedirect = () => {
//     navigate('/adminsignup'); // Go to signup route
//   };

//   return (
//     <Container maxWidth="xs" style={{ marginTop: '4rem' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Admin Login
//       </Typography>
//       <Stack spacing={2} mt={4}>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleOIDCLogin}
//         >
//           Login with Admin Account
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           fullWidth
//           onClick={handleSignupRedirect}
//         >
//           Signup with Admin Account
//         </Button>
//       </Stack>
//     </Container>
//   );
// }

import React from 'react';
import { Button, Typography, Container } from '@mui/material';
// import { getCurrentUser } from 'aws-amplify/auth';
// import { signInWithRedirect } from 'aws-amplify/auth';
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
        Login/Signup with Admin Account
      </Button>
 
    </Container>
  );
}
 
 