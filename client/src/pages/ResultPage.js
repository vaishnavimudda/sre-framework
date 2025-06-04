import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Box } from '@mui/material';

const maturityLevelMap = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Advanced',
  5: 'Expert',
};

const ResultPage = () => {
  const location = useLocation();
  const levelNumber = location.state?.levelNumber;
  const maturityLevel = maturityLevelMap[levelNumber] || 'N/A';

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
        Thank you for taking the assessment!
      </Typography>

      <Box
        sx={{
          mt: 4,
          p: 3,
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: 2,
          backgroundColor: '#f0f7f9',
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Your Assessment Score:
        </Typography>

        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
          {levelNumber || 'N/A'}
        </Typography>

        <Typography variant="h5" color="text.secondary" sx={{ mt: 1 }}>
          {maturityLevel}
        </Typography>
      </Box>
    </Container>
  );
};

export default ResultPage;
