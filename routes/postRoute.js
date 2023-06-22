import express from 'express'
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"; 
import {
    createBreedPostController,
    getAllBreedPostController,
    postPhotoController,
    postCountController,
    postListController,
    postStatusController,
 

} from "../controllers/postController.js";

// router object
const router = express.Router();


// post request for breeding
router.post(
    "/create-post", requireSignIn, formidable(), createBreedPostController
);

//get all breed post request
router.get("/get-post", getAllBreedPostController);

//get photo
router.get("/post-photo/:pid", postPhotoController);

//product count
router.get("/post-count", postCountController);

//product per page
router.get("/post-list/:page", postListController);

// post status update
router.put(
    "/post-status/:postId", requireSignIn, isAdmin, postStatusController
  );



export default router;