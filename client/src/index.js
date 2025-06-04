import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from "react-oidc-context";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
 
 
 
const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_9BhY7e42m",
  client_id: "560v95kl8u0vl1lqt0a173a19a",
  redirect_uri: "http://localhost:3000/admin/panel",
  response_type: "code",
  scope: "email openid phone",
};
 
 
 
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);