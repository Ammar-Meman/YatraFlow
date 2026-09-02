const express = require("express");
const tripController = require("../controllers/trip.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.patch("/:activityId", authMiddleware, tripController.updateActivity);
router.delete("/:activityId", authMiddleware, tripController.deleteActivity);

module.exports = router;
