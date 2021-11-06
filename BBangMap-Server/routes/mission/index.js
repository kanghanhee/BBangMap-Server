const express = require("express")
const router = express.Router();
const missionController = require("../../src/mission/controller/index")

router.get('/', (req, res) => {
    res.status(200).send("미션 API");
});
router.post('/', missionController.createMission);
module.exports = router;