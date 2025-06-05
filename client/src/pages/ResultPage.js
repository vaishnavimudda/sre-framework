// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Typography, Container, Box } from '@mui/material';

// const maturityLevelMap = {
//   1: 'Low',
//   2: 'Medium',
//   3: 'High',
//   4: 'Advanced',
//   5: 'Expert',
// };

// const ResultPage = () => {
//   const location = useLocation();
//   const levelNumber = location.state?.levelNumber;
//   const maturityLevel = maturityLevelMap[levelNumber] || 'N/A';

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
//         Thank you for taking the assessment!
//       </Typography>

//       <Box
//         sx={{
//           mt: 4,
//           p: 3,
//           border: '1px solid',
//           borderColor: 'primary.main',
//           borderRadius: 2,
//           backgroundColor: '#f0f7f9',
//           boxShadow: 2,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Your Assessment Score:
//         </Typography>

//         <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
//           {levelNumber || 'N/A'}
//         </Typography>

//         <Typography variant="h5" color="text.secondary" sx={{ mt: 1 }}>
//           {maturityLevel}
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default ResultPage;


import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Paper,
  LinearProgress,
  Rating,
} from '@mui/material';
 
const colorPrimary = '#1976d2';  // MUI default blue
const colorBackground = '#e3f2fd'; // light blue background
const textPrimary = '#0d47a1';    // dark blue for score text
const textSecondary = '#555555';  // dark gray for subtitle
 
const maturityLevelMap = {
  1: 'Very Low',
  2: 'Low',
  3: 'Medium',
  4: 'High',
  5: 'Very High',
};
 
const maturityColorMap = {
  1: '#d32f2f', // red
  2: '#f57c00', // orange
  3: '#fbc02d', // yellow
  4: '#388e3c', // green
  5: '#2e7d32', // dark green
};
 
const suggestionBackground = '#e0f2f1'; // pale teal (your chosen color)
const suggestionBorder = '#b2dfdb';     // soft teal border
const suggestionTextColor = '#00695c';  // deep teal text
 
const ResultPage = () => {
  const location = useLocation();
  const levelNumber = location.state?.levelNumber || 3; // fallback to 3
  const maturityLevel = maturityLevelMap[levelNumber] || 'N/A';
 
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Thank you for taking the assessment!
      </Typography>
 
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: colorBackground,
          mb: 4,
          maxWidth: 360,
          mx: 'auto',
          boxShadow: '0 3px 7px rgba(25, 118, 210, 0.15)', // softer shadow
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: textSecondary }}>
          Your Overall Maturity Score
        </Typography>
 
        <Typography
          variant="h2"
          sx={{ fontWeight: 'bold', color: textPrimary, lineHeight: 1 }}
        >
          {levelNumber}
        </Typography>
 
        <Rating
          name="maturity-rating"
          value={levelNumber}
          max={5}
          readOnly
          precision={0.5}
          size="medium"
          sx={{ color: colorPrimary, mb: 0.5 }}
        />
 
        <Typography variant="subtitle1" color={textSecondary} gutterBottom>
          {maturityLevel}
        </Typography>
 
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={(levelNumber / 5) * 100}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: '#bbdefb', // lighter blue track
              '& .MuiLinearProgress-bar': {
                backgroundColor: colorPrimary,
              },
            }}
          />
        </Box>
      </Paper>
 
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: suggestionBackground,
          border: `1px solid ${suggestionBorder}`,
          maxWidth: 360,
          mx: 'auto',
          boxShadow: '0 2px 6px rgba(0, 105, 92, 0.2)', // teal shadow matching colors
        }}
      >
        <Typography variant="h6" gutterBottom>
  Suggestions to Improve
</Typography>
 
{levelNumber <= 2 && (
  <Typography sx={{ color: 'error.main' }}>
    Your maturity score is low. We recommend focusing on foundational
    practices like automation, monitoring, and incident management.
  </Typography>
)}
 
{levelNumber === 3 && (
  <Typography sx={{ color: 'warning.main' }}>
    Your maturity is medium. Consider improving process automation and
    reliability to move to the next level.
  </Typography>
)}
 
{levelNumber >= 4 && (
  <Typography sx={{ color: 'success.main' }}>
    Great job! You have high maturity. Keep optimizing and scaling your
    practices.
  </Typography>
)}
 
      </Paper>
    </Container>
  );
};
 
export default ResultPage;