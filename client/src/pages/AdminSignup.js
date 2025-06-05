
// // pages/AdminSignup.js
// import React, { useEffect } from "react";
// import { useAuth } from "react-oidc-context";
 
// export default function AdminSignup() {
//   const auth = useAuth();
 
//   useEffect(() => {
//     if (!auth.isAuthenticated && !auth.isLoading) {
//       const signupUrl = auth.settings.authority + "/signup"; // this triggers Hosted UI's sign-up
//       window.location.href = signupUrl;
//     }
//   }, [auth]);
 
//   return <div>Redirecting to admin signup...</div>;
// }
 
 
import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function AdminSignup() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      const { authority, client_id, redirect_uri, scope } = auth.settings;

      // NOTE: Adjust this for your provider — works for AWS Cognito-style URLs
      const signupUrl = `${authority}/login?client_id=${client_id}&response_type=code&scope=${encodeURIComponent(
        scope
      )}&redirect_uri=${encodeURIComponent(redirect_uri)}&signup=true`;

      window.location.href = signupUrl;
    }
  }, [auth]);

  return <div>Redirecting to admin signup...</div>;
}
