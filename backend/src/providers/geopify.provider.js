const axios = require('axios');

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

const search = async (query, near) => {
  const response = await axios.get (
    "https://api.geoapify.com/v1/geocode/search",
    {
      params: {
        text: query,
        filter: `circle:${near}`,
        apiKey: GEOAPIFY_API_KEY,
      }
    }
  );

  return response.data;
};

const getDetails = async (externalPlaceId) => {
  const response = await axios.get(
    "https://api.geoapify.com/v2/place-details",
    {
      params: {
        id: externalPlaceId,
        apiKey: GEOAPIFY_API_KEY
      }
    }
  )

  return response.data;
}


module.exports = {
  search,
  getDetails,
}

