
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const API_BASE_URL = "https://wlppfehvu0.execute-api.eu-north-1.amazonaws.com/dev";

// const QuestionsList = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/questions`);
//       const data = await res.json();
//       setQuestions(data.questions || []);
//     } catch (err) {
//       toast.error("Failed to fetch questions.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteQuestion = async (id) => {
//     if (!window.confirm(`Are you sure you want to delete question ID ${id}?`)) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/questions/delete/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error || "Delete failed");
//       setQuestions((prev) => prev.filter((q) => q.id !== id));
//       toast.success(`Deleted question ID ${id}.`);
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleEditClick = (q) => {
//     navigate(`/edit/${q.id}`, { state: { question: q } });
//   };

//   return (
//     <div className="p-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h2 className="text-2xl font-bold mb-4">Questions</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {questions.map((q) => (
//             <div key={q.id} className="border p-4 rounded shadow bg-white">
//               <h3 className="text-xl font-semibold">ID: {q.id}</h3>
//               <p><strong>Topic:</strong> {q.topic}</p>
//               <p><strong>Level:</strong> {q.level}</p>
//               <p><strong>Question:</strong> {q.question_text}</p>
//               <p><strong>Weight:</strong> {q.weight}</p>
//               <p><strong>Question Weight:</strong> {q.question_weight}</p>
//               <p><strong>Options:</strong> {JSON.stringify(q.options)}</p>

//               <div className="mt-4 flex gap-2">
//                 <button
//                   onClick={() => deleteQuestion(q.id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleEditClick(q)}
//                   className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionsList;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://wlppfehvu0.execute-api.eu-north-1.amazonaws.com/dev";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/questions`);
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      toast.error("Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm(`Are you sure you want to delete question ID ${id}?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/questions/delete/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Delete failed");
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      toast.success(`Deleted question ID ${id}.`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditClick = (q) => {
    navigate(`/edit/${q.id}`, { state: { question: q } });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Typography variant="h4" gutterBottom>
        Questions
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {questions.map((q) => (
            <Grid item xs={12} sm={6} md={4} key={q.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>ID: {q.id}</Typography>
                  <Typography><strong>Topic:</strong> {q.topic}</Typography>
                  <Typography><strong>Level:</strong> {q.level}</Typography>
                  <Typography><strong>Question:</strong> {q.question_text}</Typography>
                  <Typography><strong>Weight:</strong> {q.weight}</Typography>
                  <Typography><strong>Question Weight:</strong> {q.question_weight}</Typography>
                  <Typography><strong>Options:</strong> {JSON.stringify(q.options)}</Typography>

                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteQuestion(q.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(q)}
                    >
                      Edit
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default QuestionsList;

