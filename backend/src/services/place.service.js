const mongoose = require("mongoose");
const Place = require("../models/Place");
const placeProvider = require("../providers/placeProvider.adapter")

const getPlaceById = async (placeId) =>{
    if(!mongoose.Types.ObjectId.isValid(placeId)){
        throw new Error("Invalid place ID");
    }

    const place = await Place.findById(placeId);

    if(!place){
        throw new Error("Place not found");
    }

    return place;
};

function mapProviderPlace(place){
    const properties = place.properties;

    return {
        externalPlaceId: properties.place_id,
        provider: "geoapify",
        name: properties.name,
        address: properties.formatted,
        category: properties.category || properties.
        categories?.find((category)=>
            category.startsWith("tourism.")
        ) || properties.categories?.[0],

        location: {
            type: "Point",
            coordinates: [
                properties.lon,
                properties.lat
            ],
        },

        openingHours: {
            available: !!properties.opening_hours,
            periods: properties.opening_hours || undefined,
        },

        lastVerifiedAt: new Date(),
    };
};

const searchPlaces = async (query, near) => {
    if(!query){
        throw new Error("Search query is required");
    }

    if(!near){
        throw new Error("Location is required");
    }

    const result = await placeProvider.search(query, near);

    if(!result.features || result.features.length ===  0){
        return [];
    }

    const places = result.features.map(mapProviderPlace);

    const savedPlaces = [];

    for(const place of places){
        const existingPlace = await Place.find({
            externalPlaceId: place.externalPlaceId,
        });

        if(existingPlace){
            savedPlaces.push(existingPlace);
            continue;
        }

        const newPlace = await Place.create(place);
        savedPlaces.push(newPlace);
    }

    return savedPlaces;
}

const getDetails = async (externalPlaceId) => {
    if(!externalPlaceId){
        throw new Error("External place ID is required");
    }

    const result = await placeProvider.getDetails(externalPlaceId);

    if(!result.features || result.features.length === 0){
        throw new Error("Place not found");
    }

    const place = result.features[0];

    const mappedPlace = mapProviderPlace(place);

    const existingPlace = await Place.findOne({
        externalPlaceId: mappedPlace.externalPlaceId,
    })

    if(existingPlace){
        Object.assign(existingPlace, mappedPlace);

        await existingPlace.save();

        return existingPlace;
    }

    return await Place.create(mappedPlace);
}

const refreshPlace = async (placeId) => {
    if (!mongoose.Types.ObjectId.isValid(placeId)) {
        throw new Error("Invalid place ID");
    }

    const place = await Place.findById(placeId);

    if(!place){
        throw new Error("Place not found");
    }

    const result = await placeProvider.getDetails(
        place.externalPlaceId
    )

    if(!result.features || result.features.length === 0){
        throw new Error("Place not found from provider");
    }

    const mappedPlace = mapProviderPlace(result.features[0]);

    place.name = mappedPlace.name;
    place.address = mappedPlace.address;
    place.category = mappedPlace.category;
    place.location = mappedPlace.location;

    await place.save();

    return place;
}

const reportPlace = async (placeId) => {
    if (!mongoose.Types.ObjectId.isValid(placeId)) {
        throw new Error("Invalid place ID");
    }

    const place = await Place.findById(placeId);

    if(!place){
        throw new Error("Place not found");
    }

    place.reportedIncorrectCount += 1;
    place.needsReverification = true;

    await place.save();

    await refreshPlace(placeId);

    return place;
}

function isPlaceFresh(place){
    if(!place.lastVerifiedAt){
        return false;
    }

    const now = new Date();

    const differenceInMilliseconds = 
    now - place.lastVerifiedAt;

    const differenceInDays = differenceInMilliseconds/(1000*60*60*24)

    return differenceInDays <= 90;
}

module.exports = {
    getPlaceById,
    searchPlaces,
    getDetails,
    refreshPlace,
    reportPlace,
    isPlaceFresh,
}