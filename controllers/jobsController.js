import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";
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
  const { status, workType, search, sort } = req.query;
  // condiions for searching filters
  const querryObject = {
    createdBy: req.user.userId,
  };
  //logic filters
  if (status && status !== "all") {
    querryObject.status = status;
  }
  if (workType && workType !== "all") {
    querryObject.workType = workType;
  }
  if (search) {
    querryObject.position = { $regex: search, $options: "i" };
  }
  let queryResult = jobsModel.find(querryObject);

  //sorting
  if (sort === "latest") {
    queryResult = await queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = await queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = await queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = await queryResult.sort("-position");
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const totalJobs = await jobsModel.countDocuments(queryResult);

  queryResult = queryResult.skip(skip).limit(limit);
  const currentPageJob = await jobsModel.countDocuments(queryResult);

  const jobsOutOfTotaljobs = `${currentPageJob}-${totalJobs}`;
  //jobs count
  const numOfPages = Math.ceil(totalJobs / limit);
  const jobs = await queryResult;
  const pagesOutOfTotalpages = `${page}-${numOfPages}`;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    pagesOutOfTotalpages,
    jobsOutOfTotaljobs,
    jobs,
  });
};

// ======= UPDATE JOBS ===========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  //    validation
  if (!company || !position) {
    next("Please provide All Fields");
  }
  //   find job
  const job = await jobsModel.findOne({ _id: id });

  // validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("you are not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOne({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  job.company = company;
  job.position = position;
  await job.save();
  res.status(200).json({ updateJob });
};

// =====DELETE JOB=====
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  // validation
  if (!id) {
    next("please provide job id ");
  }
  const job = await jobsModel.findOne({ _id: id });
  if (!job) {
    next(`no job  is found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("you are not Authorized to update this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "job deleted successfully" });
};

//rate a job//////////

export const rateJobController = async (req, res, next) => {
  try {
      const { id } = req.params;
      const { rating } = req.body;

      // Check if the job with the provided ID exists
      const job = await jobsModel.findOne({ _id: id });

      if (!job) {
          return next(`No job found with this id: ${id}`);
      }

      if (rating === undefined || rating === null) {
          return next("Please provide a valid rating");
      }

      // Update the job with the new rating
      job.rating = rating;
      await job.save();

      return res.status(200).json({ message: 'Job rated successfully', job });
  } catch (error) {
      // Handle any unexpected errors
      return next(error);
  }
};


// JOB STATS & FILTERS
export const jobStatsController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    //  search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };
  // monthly yearly stats
  let montlyApplications = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  montlyApplications = montlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMMM Y");
      return { date, count };
    })
    .reverse();

  res
    .status(200)
    .json({ totalJob: stats.length, defaultStats, montlyApplications });
};

//sorting
