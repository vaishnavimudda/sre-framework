// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Card, CardContent, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
// import { fetchQuestions, submitAnswers } from '../services/api';
// import { useNavigate } from 'react-router-dom';
 
// const Questionnaire = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         const data = await fetchQuestions();
//         console.log('Fetched questions:', data);
//         if (Array.isArray(data)) {
//           setQuestions(data);
//         } else {
//           alert('Unexpected data format');
//         }
//       } catch (error) {
//         alert('Failed to load questions.');
//       }
//     };
 
//     loadQuestions();
//   }, []);
 
//   const handleOptionChange = (questionId, selectedOption) => {
//     setAnswers({ ...answers, [questionId]: selectedOption });
//   };
 
//   const handleSubmit = async () => {
//     try {
//       const userId = localStorage.getItem('userId');
//   if (!userId) {
//     alert("User ID not found. Please restart the assessment.");
//     return;
//   }
//       const payload = Object.entries(answers)
//   .map(([question_id, response_value]) => ({
//     question_id: parseInt(question_id, 10),
//     response_value: parseInt(response_value, 10),
//     user_id: userId,
//   }));
//   const result = await submitAnswers(payload);
//   console.log("Full API response:", result);
//   // console.log("Data from API:", result.data);
 
//   const score = result;
 
//     console.log(" Maturity result:", score);
//     // Pass the raw numeric score to ResultPage
// if ([1, 2, 3, 4, 5].includes(score)) {
//   navigate('/result', { state: { levelNumber: score } });
// } else {
//   console.error("Maturity level mapping failed.");
// }
 
 
//   } catch (error) {
//     console.error("Submission error:", error);
//   }
// };
 
//   return (
 
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h5" gutterBottom>Questions</Typography>
//       {questions.map((q, idx) => {
//         console.log("Rendering question:", q);
//         return (
//           <Card key={q.id || idx} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="subtitle1">
//                 Q{idx + 1}: {q.question_text || 'No question text'}
//               </Typography>
//               <RadioGroup
//                 value={answers[q.id] || ''}
//                 onChange={(e) => handleOptionChange(q.id, e.target.value)}
//               >
//                 {Array.isArray(q.options) &&
//   (q.options.includes('scale')
//     ? [1, 2, 3, 4, 5].map((option) => (
//         <FormControlLabel
//           key={option}
//           value={String(option)}
//           control={<Radio />}
//           label={String(option)}
//         />
//       ))
//     : q.options
//         .slice()
//         .sort((a, b) => Number(a) - Number(b))
//         .map((option, i) => (
//           <FormControlLabel
//             key={i}
//             value={option}
//             control={<Radio />}
//             label={option}
//           />
//         ))
//   )
// }
 
//               </RadioGroup>
//             </CardContent>
//           </Card>
//         );
//       })}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         disabled={Object.keys(answers).length !== questions.length}
//       >
//         Submit Answers
//       </Button>
//     </Container>
//   );
 
 
// };
 
// export default Questionnaire;
 
 
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { fetchQuestions, submitAnswers } from '../services/api';
import { useNavigate } from 'react-router-dom';

const scaleLabels = [
  '1 – Very Low',
  '2 – Low',
  '3 – Medium',
  '4 – High',
  '5 – Very High',
];

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        console.log('Fetched questions:', data);
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          alert('Unexpected data format');
        }
      } catch (error) {
        alert('Failed to load questions.');
      }
    };

    loadQuestions();
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert("User ID not found. Please restart the assessment.");
        return;
      }

      const payload = Object.entries(answers).map(([question_id, response_value]) => ({
        question_id: parseInt(question_id, 10),
        response_value: parseInt(response_value, 10),
        user_id: userId,
      }));

      const result = await submitAnswers(payload);
      console.log("Full API response:", result);

      const score = result;

      if ([1, 2, 3, 4, 5].includes(score)) {
        navigate('/result', { state: { levelNumber: score } });
      } else {
        console.error("Maturity level mapping failed.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      {/* Fixed scale label header */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          top: 64, // Adjust based on your AppBar height
          left: 0,
          right: 0,
          zIndex: 1000,
          py: 1,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Container maxWidth="md">
          <Box display="flex" justifyContent="space-between">
            {scaleLabels.map((label, index) => (
              <Typography key={index} variant="caption" sx={{ textAlign: 'center', flex: 1 }}>
                {label}
              </Typography>
            ))}
          </Box>
        </Container>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Questions
      </Typography>

      {/* Add padding top to avoid hiding first question behind fixed header */}
      <Box mt={8}>
        {questions.map((q, idx) => (
          <Card key={q.id || idx} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">
                Q{idx + 1}: {q.question_text || 'No question text'}
              </Typography>
              <RadioGroup
                value={answers[q.id] || ''}
                onChange={(e) => handleOptionChange(q.id, e.target.value)}
              >
                {Array.isArray(q.options) &&
                  (q.options.includes('scale')
                    ? [1, 2, 3, 4, 5].map((option) => (
                        <FormControlLabel
                          key={option}
                          value={String(option)}
                          control={<Radio />}
                          label={String(option)}
                        />
                      ))
                    : q.options
                        .slice()
                        .sort((a, b) => Number(a) - Number(b))
                        .map((option, i) => (
                          <FormControlLabel
                            key={i}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        )))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
        >
          Submit Answers
        </Button>
      </Box>
    </Container>
  );
};

export default Questionnaire;
