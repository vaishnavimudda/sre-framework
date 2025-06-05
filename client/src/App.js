import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";

import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminPanel from "./pages/AdminPanel";
import EditQuestion from "./pages/EditQuestion";
import HomePage from "./pages/HomePage";
import Questionnaire from "./pages/Questionnaire";
import ResultPage from "./pages/ResultPage";

import CreateQuestionPage from './components/Create';
import QuestionsList from './components/Fetch';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ef6c00' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Simple authentication check
function PrivateRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* Global toast container */}
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route
            path="/admin/panel"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/questions/edit/:id"
            element={
              <PrivateRoute>
                <EditQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/questions/new"
            element={
              <PrivateRoute>
                <CreateQuestionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/questions"
            element={
              <PrivateRoute>
                <QuestionsList />
              </PrivateRoute>
            }
          />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;