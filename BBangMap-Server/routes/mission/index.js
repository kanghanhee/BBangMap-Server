const express = require('express');

const router = express.Router();
const missionController = require('../../src/mission/controller');
const authUtil = require('../../middlewares/authUtil');

router.post('/', authUtil.checkUuid, missionController.createMission);
router.get('/', authUtil.checkUuid, missionController.missionMain);
router.get('/succeeded/:missionId', authUtil.checkUuid, missionController.missionSucceeded);
router.get('/rank', authUtil.checkUuid, missionController.userRank);
router.get('/rank/:bakeryId', authUtil.checkUuid, missionController.checkRank); // test. 후기작성. 삭제에 추가

module.exports = router;
