const createMissonBakeryDto = (mission, bakeryId) => {
    return {
        BakeryId: bakeryId,
        MissionId: mission.id
    }
}
module.exports = createMissonBakeryDto;