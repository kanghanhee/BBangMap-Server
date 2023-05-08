module.exports={
    reward: (reward) => {
        if(reward < 5000){
            return "초보자"
        }
        else if(reward < 10000){
            return "중수"
        }
        else if(reward < 30000){
            return "전문가"
        }
        else if(reward < 70000){
            return "달인"
        }
        else if(reward < 200000){
            return "도사"
        }
        else{
            return "김정호"
        }
    }
}