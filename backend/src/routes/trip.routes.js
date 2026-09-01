const express = require("express");
const tripController = require("../controllers/trip.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router();

router.post("/",authMiddleware, tripController.createTrip);
router.get("/",authMiddleware, tripController.getTrips)

// Static /stops routes MUST come before /:tripId to avoid "stops" matching as a tripId
router.patch("/stops/:stopId", authMiddleware, tripController.updateStop);
router.delete("/stops/:stopId", authMiddleware, tripController.deleteStop)

router.get("/:tripId",authMiddleware, tripController.getTripById)
router.patch("/:tripId",authMiddleware, tripController.updateTrip);
router.delete("/:tripId",authMiddleware, tripController.deleteTrip);

router.post("/:tripId/stops",authMiddleware, tripController.addStop);
router.get("/:tripId/stops",authMiddleware,tripController.getStops)
router.patch("/:tripId/stops/reorder", authMiddleware, tripController.reorderStop)

module.exports = router;