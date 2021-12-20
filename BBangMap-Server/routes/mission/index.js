const express = require('express');

const router = express.Router();
const missionController = require('../../src/mission/controller');
const authUtil = require('../../middlewares/authUtil');

router.post('/', authUtil.checkToken, missionController.createMission);
router.get('/', authUtil.checkToken, missionController.missionMain);
router.get('/succeeded/:missionId', authUtil.checkToken, missionController.missionSucceeded);
router.get('/rank', authUtil.checkToken, missionController.userRank);
router.get('/rank/:bakeryId', authUtil.checkToken, missionController.checkRank); // test. 후기작성. 삭제에 추가

module.exports = router;
