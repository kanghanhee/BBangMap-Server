const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const adminService = require('../service')

module.exports = {
    changeImageUrl: async (req, res) => {
        const imageArr = req.files.map((f)=>f.location);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_IMAGE,imageArr));
    },
    researchCount: async (req, res) =>{
        const result = await adminService.researchCount();
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RESEARCH_COUNT, result));
    },
    likeCountOfReview: async (req,res)=>{

    },
    saveCountOfReview: async(req,res)=>{

    },
    likeCountOfCuration: async(req,res)=>{

    },
    saveCountOfBakery: async(req,res)=>{

    },
    visitCountOfBakery: async(req,res)=>{

    },
    joinCountOfUser: async(req,res)=>{

    }
}