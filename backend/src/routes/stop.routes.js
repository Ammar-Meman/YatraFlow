const express = require("express");
const tripController = require("../controllers/trip.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.patch("/:stopId", authMiddleware, tripController.updateStop);
router.delete("/:stopId", authMiddleware, tripController.deleteStop);

router.post("/:stopId/activities", authMiddleware, tripController.addActivity);
router.get("/:stopId/activities", authMiddleware, tripController.getActivities);
router.patch("/:stopId/activities/reorder",authMiddleware, tripController.reorderActivities)

module.exports = router;
