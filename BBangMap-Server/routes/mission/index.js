const express = require("express")
const router = express.Router();
const missionController = require("../../src/mission/controller")

router.post('/', missionController.createMission);
router.get('/', missionController.missionMain);
router.get('/succeeded', missionController.missionSucceeded);
router.get('/rank', missionController.userRank);
module.exports = router;