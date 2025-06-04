import React, { useEffect, useState } from 'react';
// import { Auth } from 'aws-amplify';
import { getCurrentUser } from '@aws-amplify/auth';
import { Navigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

export default function PrivateRoutes({ children }) {
    const auth = useAuth();
  
    if (auth.isLoading) return <div>Loading...</div>;
  
    if (!auth.isAuthenticated) {
      auth.signinRedirect({redirect_uri: "http://localhost:3000/admin/panel"});
      return null;
    }
  
    return children;
  }

// export default function PrivateRoute({ children }) {
//   const [auth, setAuth] = useState(null);

//   useEffect(() => {
//     getCurrentUser()
//       .then(() => setAuth(true))
//       .catch(() => setAuth(false));
//   }, []);

//   if (auth === null) {
//     return <div>Loading...</div>;
//   }

//   return auth ? children : <Navigate to="/admin" />;
// }
