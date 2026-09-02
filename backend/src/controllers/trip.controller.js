const tripService = require('../services/trip.service')

async function createTrip(req,res,next){
    try{
        const trip = await tripService.createTrip(
            req.user_id,
            req.body
        );

        res.status(201).json({
            success:true,
            data: trip
        });
    }catch(error){
        next(error)
    }
}

async function getTrips(req, res, next){
    try{
        const trips = await tripService.getTrips(req.user_id);

        res.status(200).json({
            success:true,
            data:trips,
        });
    }catch(error){
        next(error);
    }
}

async function getTripById(req, res, next){
    try{
        const trip = await tripService.getTripById(
            req.user_id,
            req.params.tripId
        );

        res.status(200).json({
            success: true,
            data: trip,
        });
    }catch(error){
        next(error)
    }
}

async function updateTrip(req,res,next){
    try{
        const trip = await tripService.updateTrip(
            req.user_id,
            req.params.tripId,
            req.body 
        );

        res.status(200).json({
            success: true,
            data: trip,
        })
    }catch(error){
        next(error);
    }
}

async function deleteTrip(req,res,next){
    try{
        const trip = await tripService.deleteTrip(
            req.user_id,
            req.params.tripId 
        );

        res.status(200).json({
            success: true,
            data: trip,
        })
    }catch(error){
        next(error);
    }
}

async function addStop(req, res, next){
    try{
        const trip = await tripService.addStop(
            req.user_id,
            req.params.tripId,
            req.body
        );

        res.status(201).json({
            success: true,
            data: trip,
        })
    }catch(error){
        next(error);
    }
}

async function getStops(req, res, next){
    try{
        const stops = await tripService.getStops(
            req.user_id,
            req.params.tripId,
            req.body
        );

        res.status(200).json({
            success: true,
            data: stops,
        })
    }catch(error){
        next(error);
    }
}

async function updateStop(req, res, next){
    try{
        const stop = await tripService.updateStop(
            req.user_id,
            req.params.stopId,
            req.body
        )

        res.status(200).json({
            success: true,
            data: stop,
        })
    }catch(error){
        next(error);
    }
}

async function deleteStop(req, res, next){
    try{
        const trip = await tripService.deleteStop(
            req.user_id,
            req.params.stopId
        );

        res.status(200).json({
            success: true,
            data: trip,
        })
    }catch(error){
        next(error);
    }
}

async function reorderStop(req, res, next){

    try{

        const stops = await tripService.reorderStop(
            req.user_id,
            req.params.tripId,
            req.body
        );

        res.status(200).json({
            success: true,
            data: stops,
        });
    }catch(error){
        next(error);
    }
}

async function addActivity(req, res, next){

    try{
        const trip = await tripService.addActivity(
            req.user_id,
            req.params.stopId,
            req.body
        );

        res.status(201).json({
            success: true,
            data: trip,
        });
    }catch(error){
        next(error);
    }
}

async function getActivities(req, res, next){

    try{
        const activities = await tripService.getActivities(
            req.user_id,
            req.params.stopId
        )

        res.status(200).json({
            success: true,
            data: activities,
        })
    }catch(error){
        next(error);
    }
}

async function updateActivity(req, res, next){
    try{
        const activity = await tripService.updateActivity(
            req.user_id,
            req.params.activityId,
            req.body
        );

        res.status(200).json({
            success: true,
            data: activity,
        })
    }catch(error){
        next(error);
    }
}

async function deleteActivity(req, res, next){
    try{
        const activity = await tripService(
            req.user_id,
            req.params.activityId
        );

        res.status(200).json({
            success: true,
            data: activity,
        })
    }catch(error){
        next(error)
    }
}

async function reorderActivities(req, res, next){
   try{
     const activities = await tripService.reorderActivities(
        req.user_id,
        req.params.stopId,
        req.body
    )

    res.status(200).json({
        success: true,
        data: activities,
    });
   }catch(error){
    next(error);
   }
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
    addActivity,
    getActivities,
    updateActivity,
    deleteActivity,
    reorderActivities
}