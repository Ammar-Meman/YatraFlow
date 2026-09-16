const express = require("express");
const placeController = require("../controllers/place.controller");

const router = express.Router();

router.get("/search", placeController.searchPlaces);
router.post("/resolve", placeController.resolvePlace);
router.get("/:placeId", placeController.getPlaceById);
router.post("/:placeId/refresh", placeController.refreshPlace);
router.post("/:placeId/report", placeController.reportPlace);

module.exports = router;