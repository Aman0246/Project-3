const {CollegeModel}=require("../Models/CollegeModel")
const {InternModel}=require("../Models/InternModel")

const createcolleges=async(req,res)=>{
    let {name,fullName,logoLink}=req.body
    try {
        if(!name||!fullName||!logoLink)return res.status(400).send({status:false,message:"field empty"})
        const samedata=await CollegeModel.findOne({name})
        const samedeta=await CollegeModel.findOne({fullName})
        if(samedeta)return res.status(400).send({status:false,message:"name alredy exist"})
        if(samedata)return res.status(400).send({status:false,message:"fullName alredy exist"})
        const group=await CollegeModel.create({name,fullName,logoLink})
        res.status(201).send({status:true,message:"group",data:group})
    } catch (error) {
        res.status(400).send({status:false,message:error.message})  
    }

}


const collegeDetails=async(req,res)=>{
    try {
       let filter=req.query.collegeName
       if(!filter)return  res.status(404).send({status:false,message:"filter by collegeName"})
        const collegeDetails =await CollegeModel.findOne({name:filter})
        if(!collegeDetails)return res.status(404).send({status:false,message:"detail not found"})
       const interns =await InternModel.find({collegeId:collegeDetails._id}).select({collegeId:0,isDeleted:0})

        const response = {
            name:collegeDetails.name,
            fullName:collegeDetails.fullName,
            logoLink:collegeDetails.logoLink,
            interns: interns
          };

          res.status(200).send({status:true,message:"the Data",data:response})
    } catch (error) {
        res.status(404).send({status:false,message:error.message})     
    }
}



module.exports={createcolleges,collegeDetails}
