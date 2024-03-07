import userModel from "../models/userModel.js";

export const updateUserController = async (req,res,next) =>{
    const {name,email,location} = req.body
    if(!name||!email||!location){
        next('please provide All Fields')
    }
    const user = await userModel.findOne({_id:req.user.userId})
    user.name = name
    user.email = email
    user.location = location

    await user.save()
    const token  = user.createJWT();
    res.status(200).json({
        user,
        token,
    });
};

export const addExperienceController = async(req,res,next) =>{
    const {company,position,year} = req.body
    if(!company||!position||!year){
        next('Please Provide All Fields')
    }
    const user = await userModel.findOne({_id:req.user.userId})

    user.experience.push({
        company,
        position,
        year,
      })

    await user.save()
    const token  = user.createJWT();
    res.status(200).json({
        user,
        token,
    });
}

export const removeExperienceController = async(req,res,next) =>{
    
}
