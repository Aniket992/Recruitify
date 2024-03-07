import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { addExperienceController, updateUserController } from '../controllers/userController.js';

// router object
const router = express.Router()

// routes
// GET USERS||GET

// UPDATE USER||PUT
router.put('/update-user',userAuth,updateUserController)

//ADD EXPERIENCE||PATCH
router.patch('/add-experience',userAuth,addExperienceController)

//REMOVE EXPERIENCE||DELETE
router.delete('/delete-experience',userAuth,)
// GET ALL USERS || GET
// router.get('/get-users', userAuth, getAllUsersController);


// // GET USER PROFILE || GET
// router.get('/user-profile', userAuth, getUserProfileController);


// // CHANGE PASSWORD || PUT
// router.put('/change-password', userAuth, changePasswordController);


// // UPLOAD PROFILE PICTURE || POST
// router.post('/upload-profile-picture', userAuth, uploadProfilePictureController);


// // GET USER NOTIFICATIONS || GET
// router.get('/user-notifications', userAuth, getUserNotificationsController);


// // SUBSCRIBE TO NEWSLETTER || POST
// router.post('/subscribe-newsletter', userAuth, subscribeNewsletterController);


// // UNSUBSCRIBE FROM NEWSLETTER || DELETE
// router.delete('/unsubscribe-newsletter', userAuth, unsubscribeNewsletterController);


// // GET USER PREFERENCES || GET
// router.get('/user-preferences', userAuth, getUserPreferencesController);


// // UPDATE USER PREFERENCES || PUT
// router.put('/update-user-preferences', userAuth, updateUserPreferencesController);


// // DELETE USER ACCOUNT || DELETE
// router.delete('/delete-user', userAuth, deleteUserAccountController);

export default router
