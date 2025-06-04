import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { startTest } from '../services/api';
 
export default function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
 
  const handleStartAssessment = async () => {
    try {
      await startTest({ name, email });
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
 