import axios from 'axios';

// This will prefix all API requests with the base URL
axios.defaults.baseURL = 'https://yt-api.p.rapidapi.com';

const options = {
  params: { geo: 'CA', lang: 'en' },
  headers: {
    'X-RapidAPI-Key': '554b5c9a03msh4a008333f18e61ap1fb405jsnbaa4227abd20',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
  },
};

// Helper function that sends an API request to the given URL
// and returns the obtained result.
export const getData = async (path) => {
  try {
    const response = await axios.get(path, options);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
