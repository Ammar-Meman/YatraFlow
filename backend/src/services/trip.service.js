const Trip = require("../models/Trip");

async function createTrip(userId, tripData){
    const trip = await Trip.create({
        userId,
        ...tripData,
    });

    return trip;
};

async function getTrips(userId){
    const trips = await Trip.find({userId});

    return trips;
}

// Find the requested trip and verify that the logged-in user owns it
async function getTripById(userId, tripId){
    const trip = await Trip.findOne({
        _id: tripId,
        userId,
    })

    if(!trip){
        const error = new Error("Trip not found");
        error.statusCode = 404;
        throw error;
    }

    return trip;
}

async function updateTrip(userId, tripId, tripData){
    const trip = await Trip.findOneAndUpdate(
        {
            _id:tripId,
            userId,
        },
        tripData,
        {
            new:true,
            runValidators: true,
        }
    );

    if(!trip){
        const error = new Error("Trip not found");
        error.statusCode = 404;
        throw error;
    }

    return trip;
}

async function deleteTrip(userId, tripId){
    const trip = await Trip.findOneAndDelete({
        _id: tripId,
        userId,
    })

    if(!trip){
        const error = new Error("Trip not found");
        error.statusCode = 404;
        throw error;
    }

    return trip;
}

async function addStop(userId, tripId, stopData){
    const trip = await Trip.findOne({
        _id: tripId,
        userId,
    });

    if(!trip){
        const error = new Error("Trip not found");
        error.statusCode = 404;
        throw error;
    }

    trip.stops.push(stopData);

    await trip.save();

    return trip;
}

async function getStops(userId, tripId){
    const trip = await Trip.findOne({
        _id: tripId,
        userId,
    })

    if(!trip){
        const error = new Error("Trip not found");
        error.statusCode = 404;
        throw error;
    }

    return trip.stops;
}

async function updateStop(userId, stopId, stopData){
    const trip = await Trip.findOne({
        userId,
        "stops._id": stopId,
    });

    if(!trip){
        const error = new Error("Stop not found");
        error.statusCode = 404;
        throw error;
    }
    // Find the stop with the given stopId from the trip's embedded stops array
    const stop = trip.stops.id(stopId);

    Object.assign(stop, stopData);

    await trip.save();

    return stop;
}

async function deleteStop(userId, stopId){
    const trip = await Trip.findOne({
        userId,
        "stops._id": stopId,
    });

    if(!trip){
        const error = new Error("Stop not found");
        error.statusCode = 404;
        throw error;
    }

    const stop = trip.stops.id(stopId);

    stop.deleteOne();

    await trip.save();

    return trip;
}

async function reorderStop(userId, tripId, stopsData){

    const trip = await Trip.findOne({
        _id: tripId,
        userId,
    })

    if(!trip){
        const error = new Error("Trip not found");
        error.statusCode = 404;
        throw error;
    }

    // Go through each stop that needs to be reordered
    stopsData.forEach((item)=>{

         // Find the specific stop inside the trip using its stop ID
        const stop = trip.stops.id(item.stopId);

        if(stop){
            stop.order = item.order;
        }
    });

    await trip.save();

    return trip.stops;
}

module.exports = {
    createTrip,
    getTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    addStop,
    getStops,
    updateStop,
    deleteStop,
    reorderStop,
}