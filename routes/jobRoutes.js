import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobController, getAllJobsController } from '../controllers/jobsController.js'

const router = express.Router()

// routes
// CREATE JOB||POST

router.post('/create-job',userAuth,createJobController)

// GET JOBS||GET
router.get('/get-job',userAuth,getAllJobsController)
export default router