const placeService = require("../services/place.service");

const getPlaceById = async (req, res, next) => {
  try {
    const { placeId } = req.params;

    const place = await placeService.getPlaceById(placeId);

    res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    next(error);
  }
};

const searchPlaces = async (req, res, next) => {
  try {
    const { q, near } = req.query;

    const places = await placeService.searchPlaces(q, near);

    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

const resolvePlace = async (req, res, next) => {
  try{
    const {externalPlaceId} = req.body;

    if(!externalPlaceId){
      return res.status(400).json({
        success: false,
        message: "externalPlaceId is required",
      })
    }

    const details = await placeService.getDetails(externalPlaceId);

    res.status(200).json({
      success: true,
      data: details,
    })
  }catch(error){
    next(error);
  }
}

const refreshPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params;

    const place = await placeService.getPlaceById(placeId);

    if(!place){
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    const refreshed = await placeService.getDetails(place.externalPlaceId);

    res.status(200).json({
      success: true,
      data: refreshed,
    });
  } catch (error) {
    next(error);
  }
}

const reportPlace = async (req, res, next) => {
  try{
    const {placeId} = req.params;

    const place = await placeService.reportPlace(placeId);

    res.status(200).json({
      success: true,
      data: place,
    });
  }catch(error){
    next(error);
  }
}

module.exports = {
  getPlaceById,
  searchPlaces,
  resolvePlace,
  refreshPlace,
  reportPlace,
}