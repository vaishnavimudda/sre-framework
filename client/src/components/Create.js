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
    options: ["", "", "", "", ""], // 5 options
    weight: 1,
    question_weight: 10,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("option")) {
      const updatedOptions = [...formData.options];
      updatedOptions[index] = value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        "https://wlppfehvu0.execute-api.eu-north-1.amazonaws.com/dev/questions/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setFormData({
          topic: "",
          level: "",
          question_text: "",
          options: ["", "", "", "", ""],
          weight: 1,
          question_weight: 10,
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

        <Typography variant="subtitle1" mt={2}>
          Options
        </Typography>
        <Grid container spacing={2}>
          {formData.options.map((opt, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <TextField
                label={`Option ${idx + 1}`}
                name={`option${idx}`}
                fullWidth
                required
                value={opt}
                onChange={(e) => handleChange(e, idx)}
              />
            </Grid>
          ))}
        </Grid>

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
