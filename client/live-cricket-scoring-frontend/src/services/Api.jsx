import axios from "axios";

const API_URL = 'https://live-cricket-scoring-app.onrender.com/api/matches/';

export const getAllMatch = async (id) => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match data:', error);
    return null;
  }
};

export const getMatchById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match data:', error);
    return null;
  }
};

export const updateMatch = async (id,data) =>{
  try {
    const response = await axios.put(`${API_URL}/update/${id}`,data);
    return response.data;
  } catch (error) {
    console.error('Error fetching match data:', error);
    return null;
  }
}

// Add more API functions like createMatch, updateMatch, etc.
