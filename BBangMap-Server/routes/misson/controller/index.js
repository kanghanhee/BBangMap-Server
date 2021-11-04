const express = require("express");
const responseMessage = require("../../modules/responseMessage");
const statusCode = require("../../modules/statusCode");
const util = require("../../modules/util");
const router = express.Router();

/*
post mission
METHOD : POST
URI: localhost:3000/api/mission
REQUEST BODY : title,Content,BarkeryList<Name>,BadgeImg
RESPONSE STATUS:200(OK)
*/

//mission

module.exports = {
    createMission: async (req, res) => {
        try {
            const {
                title,
                contents,
                barkeryName,
                badgeImg
            } = req.body;
        }
    }
}