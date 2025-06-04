import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editQuestion, setEditQuestion] = useState(null); // Holds current question being edited

  useEffect(() => {
    fetch("https://wlppfehvu0.execute-api.eu-north-1.amazonaws.com/dev/questions")
      .then((res) => res.json())
      .then((data) => {
        if (data.questions) {
          setQuestions(data.questions);
        } else {
          throw new Error(data.error || "Failed to fetch questions");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEditOpen = (question) => {
    setEditQuestion({ ...question });
  };

  const handleEditClose = () => {
    setEditQuestion(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditQuestion((prev) => ({
      ...prev,
      [name]: name === "options" ? value.split(",") : value,
    }));
  };

  const handleUpdate = () => {
    fetch(
      `https://wlppfehvu0.execute-api.eu-north-1.amazonaws.com/dev/questions/${editQuestion.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editQuestion),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setQuestions((prev) =>
            prev.map((q) => (q.id === editQuestion.id ? editQuestion : q))
          );
          handleEditClose();
        } else {
          alert(data.error || "Failed to update question");
        }
      })
      .catch((err) => alert(err.message));
  };

  if (loading) {
    return (
      <Box mt={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={5}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        All Questions
      </Typography>

      {questions.length === 0 ? (
        <Alert severity="info">No questions found.</Alert>
      ) : (
        <Paper elevation={3}>
          <List>
            {questions.map((q) => (
              <React.Fragment key={q.id}>
                <ListItem alignItems="flex-start" secondaryAction={
                  <Button variant="outlined" onClick={() => handleEditOpen(q)}>
                    Update
                  </Button>
                }>
                  <ListItemText
                    primary={`${q.topic} - ${q.level}`}
                    secondary={
                      <>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          {q.question_text}
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {Array.isArray(q.options) ? (
                            q.options.map((opt, idx) => (
                              <li key={idx}>
                                <Typography variant="body2">{opt}</Typography>
                              </li>
                            ))
                          ) : (
                            <Typography color="error">Invalid options</Typography>
                          )}
                        </ul>
                        <Typography variant="caption" color="text.secondary">
                          Weight: {q.weight} | Question Weight: {q.question_weight}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Edit Dialog */}
      {editQuestion && (
        <Dialog open onClose={handleEditClose}>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Topic"
              name="topic"
              value={editQuestion.topic}
              onChange={handleEditChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Level"
              name="level"
              value={editQuestion.level}
              onChange={handleEditChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Question Text"
              name="question_text"
              value={editQuestion.question_text}
              onChange={handleEditChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Weight"
              name="weight"
              type="number"
              value={editQuestion.weight}
              onChange={handleEditChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Question Weight"
              name="question_weight"
              type="number"
              value={editQuestion.question_weight}
              onChange={handleEditChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Options (comma-separated)"
              name="options"
              value={editQuestion.options.join(",")}
              onChange={handleEditChange}
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default QuestionsList;
