

// import axios from 'axios';

// const ACCESSOR_BASE = 'https://it4au3n7l3.execute-api.ap-south-1.amazonaws.com/dev';

// /**
//  * Start the test by sending user details
//  * @param {Object} userDetails - The user info (name, email, etc.)
//  */
// export const startTest = async (userDetails) => {
//   try {
//     const response = await axios.post(
//       `${ACCESSOR_BASE}/accessor/start`,
//       JSON.stringify(userDetails),
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error starting test:', error);
//     throw error;
//   }
// };

// /**
//  * Fetch questions for the questionnaire
//  */
// export const fetchQuestions = async () => {
//   try {
//     const response = await axios.get(`${ACCESSOR_BASE}/questions`);
//     const data = response.data;

//     if (Array.isArray(data.questions)) {
//       return data.questions;
//     }

//     throw new Error("Invalid response format: 'questions' array is missing.");
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     throw error;
//   }
// };

// /**
//  * Submit all answers at once to the API Gateway, return final maturity_score
//  * @param {Array} answers - Array of { question_id, response_value, user_id }
//  */
// export const submitAnswers = async (answers) => {
//   const url = `${ACCESSOR_BASE}/answers`;
//   let finalMaturityScore = null;

//   for (const answer of answers) {
//     try {
//       // Send the answer object directly, NOT wrapped inside { body: JSON.stringify(answer) }
//       const response = await axios.post(url, answer, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       let responseBody = response.data?.body;

//       if (typeof responseBody === 'string') {
//         responseBody = JSON.parse(responseBody);
//       }

//       if (typeof responseBody?.maturity_score === 'undefined') {
//         console.error('Response data keys:', Object.keys(responseBody));
//         throw new Error('Response missing maturity_score');
//       }

//       finalMaturityScore = responseBody.maturity_score;

//     } catch (error) {
//       console.error('Error submitting answer:', answer, error?.response?.data || error.message);
//       throw error;
//     }
//   }

//   return finalMaturityScore;
// };


import axios from 'axios';
 
const ACCESSOR_BASE = 'https://it4au3n7l3.execute-api.ap-south-1.amazonaws.com/dev';
 
export const startTest = async (userDetails) => {
  try {
    const response = await axios.post(`${ACCESSOR_BASE}/accessor/start`, JSON.stringify(userDetails), {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error starting test:', error);
    throw error;
  }
};
 
export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${ACCESSOR_BASE}/questions`);
    const data = response.data;
 
    console.log("API response:", data);
 
    if (Array.isArray(data.questions)) {
      return data.questions;
    }
 
    throw new Error("Invalid response format: 'questions' array is missing.");
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
 
export const submitAnswers = async (answers) => {
  const baseUrl = 'https://it4au3n7l3.execute-api.ap-south-1.amazonaws.com/dev';
 
  try {
    // Submit all answers in parallel
    await Promise.all(
      answers.map(answer => {
        const { user_id, question_id, response_value } = answer;
        const wrappedPayload = {
          body: JSON.stringify({ user_id, question_id, response_value }),
        };
        return axios.post(`${baseUrl}/submit_answer`, wrappedPayload, {
          headers: { 'Content-Type': 'application/json' },
        }).then(response => {
          console.log(`Submitted answer for question ${question_id}:`, response.data);
        });
      })
    );
 
    const userId = answers[0]?.user_id;
    if (!userId) {
      throw new Error('User ID is missing in answers payload');
    }
 
    const scorePayload = {
      body: JSON.stringify({ user_id: userId }),
    };
 
    const scoreResponse = await axios.post(`${baseUrl}/calculate_score`, scorePayload, {
      headers: { 'Content-Type': 'application/json' },
    });
 
    console.log('Score calculation response:', scoreResponse.data);
 
    const parsedBody = JSON.parse(scoreResponse.data.body);
 
    const { maturity_score } = parsedBody;
    if (typeof maturity_score === 'undefined') {
      throw new Error('maturity_score is missing in the response');
    }
 
    return maturity_score;
 
  } catch (error) {
    console.error('Error during answer submission or score calculation:', error);
    throw error;
  }
};
 
 