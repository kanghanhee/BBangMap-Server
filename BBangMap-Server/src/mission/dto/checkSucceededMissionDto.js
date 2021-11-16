const {
    isMissionBakery
} = require("../util");

const checkSucceededMissionDto = (bakery, mission, rank) => {
    return {
        rank: rank.grade,
        isMissionBakery: bakery,
        isSuccessMission: mission
    }
}
module.exports = checkSucceededMissionDto;