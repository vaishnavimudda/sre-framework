import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://wlppfehvu0.execute-api.eu-north-1.amazonaws.com/dev";

// Store edited questions in memory
export const editedQuestions = {};

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    level: 1,
    question_text: "",
    weight: 1,
    question_weight: 10,
    options: { type: "scale", min: 1, max: 5 },
  });

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      // Check if we have an edited version first
      if (editedQuestions[id]) {
        setFormData(editedQuestions[id]);
        setLoading(false);
        return;
      }

      const listRes = await fetch(`${API_BASE_URL}/questions`);
      const listData = await listRes.json();
      const questions = listData.questions || [];
      
      const question = questions.find(q => q.id === parseInt(id) || q.id === id);
      
      if (!question) {
        throw new Error("Question not found");
      }

      setFormData({
        topic: question.topic || "",
        level: question.level || 1,
        question_text: question.question_text || "",
        weight: question.weight || 1,
        question_weight: question.question_weight || 10,
        options: question.options || { type: "scale", min: 1, max: 5 },
      });
    } catch (err) {
      console.error("Error fetching question:", err);
      toast.error("Failed to load question.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "level" || name === "weight" || name === "question_weight"
          ? Number(value)
          : value,
    }));
  };

  const handleOptionsChange = (e) => {
    const value = e.target.value;
    try {
      const parsed = JSON.parse(value);
      setFormData((prev) => ({ ...prev, options: parsed }));
    } catch {
      // Do nothing for now, JSON is invalid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Format data exactly as expected by the Lambda function
      const updatedQuestion = {
        topic: formData.topic,
        level: Number(formData.level),
        question_text: formData.question_text,
        weight: Number(formData.weight),
        question_weight: Number(formData.question_weight),
        options: formData.options
      };
      
      // Store in memory for immediate UI update
      editedQuestions[id] = {
        id: parseInt(id),
        ...updatedQuestion
      };
      
      // Send to API with correct endpoint format
      const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        toast.success("Question updated successfully!");
        setTimeout(() => {
          // Clear edited questions from memory since it's now in the database
          delete editedQuestions[id];
          navigate("/admin/panel");
        }, 1500);
      } else {
        toast.error(`Error: ${responseData.error || "Update failed"}`);
      }
    } catch (err) {
      console.error("Error updating question:", err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : (
        <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            Edit Question ID: {id}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Level"
              name="level"
              type="number"
              value={formData.level}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Question Text"
              name="question_text"
              value={formData.question_text}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              required
            />
            <TextField
              label="Weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Question Weight"
              name="question_weight"
              type="number"
              value={formData.question_weight}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Options (JSON format)"
              name="options"
              value={JSON.stringify(formData.options, null, 2)}
              onChange={handleOptionsChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
              error={
                (() => {
                  try {
                    JSON.parse(JSON.stringify(formData.options));
                    return false;
                  } catch {
                    return true;
                  }
                })()
              }
              helperText='Must be valid JSON (e.g. {"type": "scale", "min": 1, "max": 5})'
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate("/admin/panel")}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default EditQuestion;