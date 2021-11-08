const {
    isMissionBakery
} = require("../util");

const checkSucceededMissionDto = (bakery, mission, rank) => {
    return {
        rank: rank.rank,
        isMissionBakery: bakery,
        isSuccessMission: mission
    }
}
module.exports = checkSucceededMissionDto;