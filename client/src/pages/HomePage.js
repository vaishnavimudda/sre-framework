// import React, { useState } from 'react';
// import { Container, Typography, TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { startTest } from '../services/api';
 
// export default function HomePage() {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
 
//   const handleStartAssessment = async () => {
//     try {
//       await startTest({ name, email });
//       navigate('/questionnaire');
//     } catch (error) {
//       alert("Failed to start the assessment.");
//     }
//   };
 
//   return (
//     <Container maxWidth="sm" style={{ marginTop: '4rem' }}>
//       <Typography variant="h4" gutterBottom> Welcome to SRE Maturity Assessment</Typography>
//       <TextField fullWidth label="Name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
//       <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         style={{ marginTop: '1rem' }}
//         onClick={handleStartAssessment}
//         disabled={!name || !email}
//       >
//         Start Assessment
//       </Button>
//     </Container>
//   );
// }
 
import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { startTest } from '../services/api';
 
export default function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
 
  const handleStartAssessment = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Please enter both name and email.");
      return;
    }
    try {
      //modified today
      console.log("send" ,{name, email})
      const result = await startTest({ name, email });
 
      if (result && result.user_id) {
        // Store userId in localStorage for access throughout the app
        localStorage.setItem('userId', result.user_id);
      } else {
        console.error("userId not present in startTest response", result);
        alert("Could not start assessment. Please try again.");
        return;
      }
 
      // await startTest({ name, email });
     
      navigate('/questionnaire');
    } catch (error) {
      alert("Failed to start the assessment.");
    }
  };
 
  return (
    <Container maxWidth="sm" style={{ marginTop: '4rem' }}>
      <Typography variant="h4" gutterBottom> Welcome to SRE Maturity Assessment</Typography>
      <TextField fullWidth label="Name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '1rem' }}
        onClick={handleStartAssessment}
        disabled={!name || !email}
      >
        Start Assessment
      </Button>
    </Container>
  );
}