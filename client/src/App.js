// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "react-oidc-context";
// import './App.css';
// import 'react-toastify/dist/ReactToastify.css';
// import AdminLogin from "./pages/AdminLogin";
// import AdminSignup from "./pages/AdminSignup";
// import AdminPanel from "./pages/AdminPanel";
// import HomePage from "./pages/HomePage";
// import Questionnaire from "./pages/Questionnaire";
// import ResultPage from "./pages/ResultPage";
// import CreateQuestionPage from './components/Create';
// import QuestionsList from './components/Fetch';
// import UpdateQuestionForm from './components/Update';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2', // blue
//     },
//     secondary: {
//       main: '#ef6c00', // orange
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//   },
// });

// function PrivateRoute({ children }) {
//   const auth = useAuth();

//   if (auth.isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!auth.isAuthenticated) {
//     auth.signinRedirect(); // redirect to Cognito login
//     return null;
//   }

//   return children;
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route path="/admin/signup" element={<AdminSignup />} />

//           <Route
//             path="/admin/panel"
//             element={
//               <PrivateRoute>
//                 <AdminPanel />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/admin/add-question"
//             element={
//               <PrivateRoute>
//                 <CreateQuestionPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//            path="/admin/questions"
//            element={
//              <PrivateRoute>
//                 <QuestionsList />
//              </PrivateRoute>
//            }
//          />
//           <Route
//           path="/admin/update-question"
//           element={
//              <PrivateRoute>
//                 <UpdateQuestionForm />
//              </PrivateRoute>
//          }
//         />

//           <Route path="/questionnaire" element={<Questionnaire />} />
//           <Route path="/result" element={<ResultPage />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";

import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminPanel from "./pages/AdminPanel";
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

function PrivateRoute({ children }) {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (!auth.isAuthenticated) {
    auth.signinRedirect(); // redirect to Cognito
    return null;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* ✅ Global toast container */}
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
            path="/admin/add-question"
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
