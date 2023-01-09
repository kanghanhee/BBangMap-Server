const countOfYearAndMonthDto = (researchInfo) => {
    return researchInfo.map(researchInfo => {
        return {
            year : researchInfo.Year,
            month : researchInfo.Month,
            count : researchInfo.Count
        }
    })
}

module.exports = countOfYearAndMonthDto;