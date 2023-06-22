import express from "express";
import {
    registerController, 
    loginController, 
    testController, 
    forgotPasswordController, 
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    //getPostController,
    //getAllPostController,
    //postStatusController,


} from "../controllers/authController.js";
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST METHOD
router.post("/login", loginController)

// Forgot Password || POST METHOD
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user auth routes
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
});

//protected admin auth routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
});

//update profile route
router.put("/profile", requireSignIn, updateProfileController);

//orders route 
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId", requireSignIn, isAdmin, orderStatusController
);


// //posts route 
// router.get("/posts", requireSignIn, getPostController);

// //all posts
// router.get("/all-posts", requireSignIn, isAdmin, getAllPostController);

// // posts status update
// router.put(
//   "/posts-status/:postId", requireSignIn, isAdmin, postStatusController
// );


export default router;