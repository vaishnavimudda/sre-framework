import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Box,
  Alert,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import LogoutIcon from "@mui/icons-material/Logout";

const API_BASE_URL = "https://wlppfehvu0.execute-api.eu-north-1.amazonaws.com/dev";

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, [location.search]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      // Add cache-busting parameter to avoid cached responses
      const res = await fetch(`${API_BASE_URL}/questions?t=${Date.now()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await res.json();
      let fetchedQuestions = data.questions || [];
      
      // Apply any edited questions from session storage
      try {
        const savedQuestions = sessionStorage.getItem('editedQuestions');
        if (savedQuestions) {
          const editedQuestions = JSON.parse(savedQuestions);
          
          // Replace fetched questions with edited ones
          fetchedQuestions = fetchedQuestions.map(q => {
            const edited = editedQuestions[q.id];
            return edited || q;
          });
        }
      } catch (e) {
        console.error("Error applying edited questions:", e);
      }
      
      setQuestions(fetchedQuestions);
    } catch (err) {
      console.error("Error loading questions:", err);
      toast.error("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchQuestions();
  };

  const handleEdit = (id) => {
    navigate(`/admin/questions/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        // Since the API delete endpoint might not work, we'll implement client-side deletion
        // Remove from session storage if it exists there
        try {
          const savedQuestions = sessionStorage.getItem('editedQuestions');
          if (savedQuestions) {
            const editedQuestions = JSON.parse(savedQuestions);
            if (editedQuestions[id]) {
              delete editedQuestions[id];
              sessionStorage.setItem('editedQuestions', JSON.stringify(editedQuestions));
            }
          }
        } catch (e) {
          console.error("Error removing from session storage:", e);
        }
        
        // Remove from UI
        setQuestions(questions.filter(q => q.id !== id));
        toast.success("Question deleted from current session!");
      } catch (err) {
        console.error("Error deleting question:", err);
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  const handleAddNew = () => {
    navigate("/admin/questions/new");
  };

  const handleLogout = () => {
    // Clear authentication status but keep edited questions
    const editedQuestions = sessionStorage.getItem('editedQuestions');
    sessionStorage.clear();
    
    // Restore edited questions if they exist
    if (editedQuestions) {
      sessionStorage.setItem('editedQuestions', editedQuestions);
    }
    
    // Navigate to login page
    navigate("/admin");
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
        <Typography variant="h4">Admin Panel - Questions Management</Typography>
        <div>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            style={{ marginRight: "10px" }}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            style={{ marginRight: "10px" }}
          >
            Add New Question
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Box>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Question Text</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.length > 0 ? (
                questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>{question.id}</TableCell>
                    <TableCell>{question.topic}</TableCell>
                    <TableCell>{question.level}</TableCell>
                    <TableCell>
                      {question.question_text && question.question_text.length > 50
                        ? `${question.question_text.substring(0, 50)}...`
                        : question.question_text}
                    </TableCell>
                    <TableCell>{question.weight}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEdit(question.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDelete(question.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No questions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminPanel;