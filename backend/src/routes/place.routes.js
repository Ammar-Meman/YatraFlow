const express = require("express");
const placeController = require("../controllers/place.controller");

const router = express.Router();

router.get("/search", placeController.searchPlaces);
router.get("/:placeId", placeController.getPlaceById);
router.get("/:placeId/refresh", placeController.refreshPlace);
router.post("/:placeId/report", placeController.reportPlace);
router.post("/resolve", placeController.resolvePlace)

module.exports = router;