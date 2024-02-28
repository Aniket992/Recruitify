import jobsModel from "../models/jobsModel.js";


// ====== CREATE JOB ======
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

// ======= GET JOBS ===========
export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
      totalJobs:jobs.length,
      jobs,
      
    });
  };

  // ======= UPDATE JOBS ===========
  export const updateJobController = async(req,res,next) => {
   const {id} = req.params
   const {company,position} = req.body

//    validation
if(!company||!position){
    next('Please provide All Fields')
}
//   find job
const job = await jobsModel.findOne({_id:id})


// validation
if(!job){
    next(`no jobs found with this id ${id}`)
}
//  if(!req.user.userId === job.createdBy.toString()){
//     next("you are not Authorized to update this job")
//     return ;

//  } 
 const updateJob = await jobsModel.findOne({_id:id},req.body,{
    new:true,
    runValidators:true
 });
 job.company = company
job.position = position
await job.save()
 res.status(200).json({updateJob});
  };
    //logic filters

    //sorting
