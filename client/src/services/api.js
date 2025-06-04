

// // import axios from 'axios';

// // const ACCESSOR_BASE = 'https://it4au3n7l3.execute-api.ap-south-1.amazonaws.com/dev';

// // // Start the test by sending user details
// // export const startTest = async (userDetails) => {
// //   try {
// //     const response = await axios.post(
// //       `${ACCESSOR_BASE}/accessor/start`,
// //       JSON.stringify(userDetails),
// //       {
// //         headers: { 'Content-Type': 'application/json' },
// //       }
// //     );
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error starting test:', error);
// //     throw error;
// //   }
// // };

// // // Fetch questions for the questionnaire
// // export const fetchQuestions = async () => {
// //   try {
// //     const response = await axios.get(`${ACCESSOR_BASE}/questions`);
// //     const data = response.data;

// //     if (Array.isArray(data.questions)) {
// //       return data.questions;
// //     }

// //     throw new Error("Invalid response format: 'questions' array is missing.");
// //   } catch (error) {
// //     console.error('Error fetching questions:', error);
// //     throw error;
// //   }
// // };

// // // Submit answers one-by-one and return the final maturity_score
// // export const submitAnswers = async (answers) => {
// //   const url = `${ACCESSOR_BASE}/answers`;
// //   let finalMaturityScore = null;

// //   for (const answer of answers) {
// //     try {
// //       const payload = {
// //         body: JSON.stringify(answer), // API Gateway Lambda expects this format
// //       };

// //       const response = await axios.post(url, payload, {
// //         headers: { 'Content-Type': 'application/json' },
// //       });

// //       // API Gateway wraps Lambda response in a stringified "body"
// //       const body = JSON.parse(response.data.body);

// //       if (typeof body.maturity_score === 'undefined') {
// //         throw new Error('Response missing maturity_score');
// //       }

// //       finalMaturityScore = body.maturity_score;

// //     } catch (error) {
// //       console.error('Error submitting answer:', answer, error);
// //       throw error;
// //     }
// //   }

// //   return finalMaturityScore;
// // };

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
//  * Submit answers one-by-one to the API Gateway, return final maturity_score
//  * @param {Array} answers - Array of { question_id, response_value, user_id }
//  */
// export const submitAnswers = async (answers) => {
//   const url = `${ACCESSOR_BASE}/answers`;
//   let finalMaturityScore = null;

//   for (const answer of answers) {
//     try {
//       const payload = {
//         body: JSON.stringify(answer) // Expected format for API Gateway
//       };

//       const response = await axios.post(url, payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       // Lambda responses are often stringified JSON inside the "body"
//       let responseBody = response.data?.body;

//       // Parse the response body if it's a string
//       if (typeof responseBody === 'string') {
//         responseBody = JSON.parse(responseBody);
//       }

//       if (typeof responseBody?.maturity_score === 'undefined') {
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

/**
 * Start the test by sending user details
 * @param {Object} userDetails - The user info (name, email, etc.)
 */
export const startTest = async (userDetails) => {
  try {
    const response = await axios.post(
      `${ACCESSOR_BASE}/accessor/start`,
      JSON.stringify(userDetails),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error starting test:', error);
    throw error;
  }
};

/**
 * Fetch questions for the questionnaire
 */
export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${ACCESSOR_BASE}/questions`);
    const data = response.data;

    if (Array.isArray(data.questions)) {
      return data.questions;
    }

    throw new Error("Invalid response format: 'questions' array is missing.");
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

/**
 * Submit all answers at once to the API Gateway, return final maturity_score
 * @param {Array} answers - Array of { question_id, response_value, user_id }
 */
export const submitAnswers = async (answers) => {
  const url = `${ACCESSOR_BASE}/answers`;
  let finalMaturityScore = null;

  for (const answer of answers) {
    try {
      // Send the answer object directly, NOT wrapped inside { body: JSON.stringify(answer) }
      const response = await axios.post(url, answer, {
        headers: { 'Content-Type': 'application/json' },
      });

      let responseBody = response.data?.body;

      if (typeof responseBody === 'string') {
        responseBody = JSON.parse(responseBody);
      }

      if (typeof responseBody?.maturity_score === 'undefined') {
        console.error('Response data keys:', Object.keys(responseBody));
        throw new Error('Response missing maturity_score');
      }

      finalMaturityScore = responseBody.maturity_score;

    } catch (error) {
      console.error('Error submitting answer:', answer, error?.response?.data || error.message);
      throw error;
    }
  }

  return finalMaturityScore;
};
