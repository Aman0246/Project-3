const {CollegeModel}=require("../Models/CollegeModel")
const {InternModel}=require("../Models/InternModel")

const createcolleges=async(req,res)=>{
    let {name,fullName,logoLink}=req.body
    try {
     const group=await CollegeModel.create({name,fullName,logoLink})
        res.status(201).send({status:true,message:group})
  
    } catch (error) {
        res.status(400).send({status:false,message:error.message})  
    }

}


const collegeDetails=async(req,res)=>{
    try {
       let filter=req.query.collegeName
       if(!filter)return  res.status(400).send({status:false,message:"filter by collegeName"})
       
        const collegeDetails =await CollegeModel.findOne({name:filter})
       const interns =await InternModel.find({collegeId:collegeDetails._id}).select({collegeId:0,isDeleted:0})

        const response = {
            name:collegeDetails.name,
            fullName:collegeDetails.fullName,
            logoLink:collegeDetails.logoLink,
            interns: interns
          };

          res.status(200).send({status:true,data:response})
    } catch (error) {
        
    }
}
// .select({_id:0,isDeleted:0})


module.exports={createcolleges,collegeDetails}
