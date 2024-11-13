import axios from 'axios';

// Function to fetch time data for a specific timezone
export const getTime = async (timezone) => {
  try {
    const response = await axios.get(`http://worldtimeapi.org/api/timezone/${timezone}`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching time data:", error);
    return null; // Return null if there was an error
  }
};
