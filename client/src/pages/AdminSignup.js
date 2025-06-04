// pages/AdminSignup.js
import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function AdminSignup() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      const signupUrl = auth.settings.authority + "/signup"; // this triggers Hosted UI's sign-up
      window.location.href = signupUrl;
    }
  }, [auth]);

  return <div>Redirecting to admin signup...</div>;
}
