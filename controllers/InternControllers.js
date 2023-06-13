const {InternModel}=require("../Models/InternModel")
const { isValidObjectId } = require("mongoose")
const createIntern=async(req,res)=>{
    const {name,email,mobile,collegeId}=req.body
    try {
        if(!isValidObjectId(collegeId))return res.status(400).send({status:false,message:"college Id is invalid"})
        const data= await InternModel.create({name,email,mobile,collegeId})
        const datafind=await InternModel.findOne({email})
        if(datafind)return res.status(400).send({status:false,message:"collage alredy exist"})
        res.status(201).send({status:true,message:"data",data:data})
    } catch (error) {
        res.status(400).send({status:false,message:error.message})
    }
}
module.exports={createIntern}
