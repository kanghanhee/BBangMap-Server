const express = require("express")
const router = express.Router();

router.get('/', (req,res)=>{
    res.status(200).send("리뷰 API");
});

module.exports = router;