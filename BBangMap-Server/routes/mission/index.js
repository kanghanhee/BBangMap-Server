const express = require("express")
const router = express.Router();
const missionController = require("../../src/mission/controller")

router.get('/', (req, res) => {
    res.status(200).send("미션 API");
});
router.post('/', missionController.createMission);
router.get('/', missionController.monthlyMission);
module.exports = router;