const express = require("express")
const router = express.Router();

router.get('/', (req,res)=>{
    res.status(200).send("미션 API");
});

router.post("/mission",require("./missionPOST"));
router.delete("/mission",require("./missionDELETE"));

module.exports = router;