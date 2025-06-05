import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";

const CreateQuestionForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    level: "",
    question_text: "",
    weight: 1,
    question_weight: 10,
    options: {
      max: 5,
      min: 1,
      type: "scale"
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Format the data for submission
      const submissionData = {
        ...formData,
        level: Number(formData.level),
        weight: Number(formData.weight),
        question_weight: Number(formData.question_weight)
      };

      const res = await fetch(
        "https://wlppfehvu0.execute-api.eu-north-1.amazonaws.com/dev/questions/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setFormData({
          topic: "",
          level: "",
          question_text: "",
          weight: 1,
          question_weight: 10,
          options: {
            max: 5,
            min: 1,
            type: "scale"
          }
        });
      } else {
        setMessage({ type: "error", text: data.error || "Submission failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network or server error." });
    }

    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Create a New Question
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Topic"
          name="topic"
          fullWidth
          margin="normal"
          required
          value={formData.topic}
          onChange={handleChange}
        />
        <TextField
          label="Level"
          name="level"
          type="number"
          fullWidth
          margin="normal"
          required
          value={formData.level}
          onChange={handleChange}
        />
        <TextField
          label="Question Text"
          name="question_text"
          fullWidth
          margin="normal"
          required
          multiline
          rows={3}
          value={formData.question_text}
          onChange={handleChange}
        />

        <Alert severity="info" sx={{ my: 2 }}>
          Using default scale options (min: 1, max: 5, type: scale)
        </Alert>

        <TextField
          label="Weight"
          name="weight"
          type="number"
          fullWidth
          margin="normal"
          value={formData.weight}
          onChange={handleChange}
        />
        <TextField
          label="Question Weight"
          name="question_weight"
          type="number"
          fullWidth
          margin="normal"
          value={formData.question_weight}
          onChange={handleChange}
        />

        <Box mt={3} textAlign="right">
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Submit Question"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateQuestionForm;