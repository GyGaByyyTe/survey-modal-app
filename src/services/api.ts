import { Question } from "../types";

/**
 * Fetches survey questions from the server
 * @returns Promise with an array of Question objects
 */
export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch("/questions.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
