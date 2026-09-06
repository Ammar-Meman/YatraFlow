 const geoapify = require("./geopify.provider");

 const placeProvider = {
  search(query, near){
    return geoapify.search(query, near);
  },

  getDetails(externalPlaceId){
    return geoapify.getDetails(externalPlaceId);
  }
 }

 module.exports = placeProvider