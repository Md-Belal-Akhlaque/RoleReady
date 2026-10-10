import {Router} from "express";
import {loginUser, registerUser, logoutUser,getUserDetails} from "../controllers/auth.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @router POST /api/auth/register
 * @desc Register a new user
 * @access Public
 *
 */

authRouter.post('/register',registerUser);

/**
 * @router POST /api/auth/login
 * @description Login a user
 * @access Public
 *
 */

authRouter.post('/login',loginUser)

/**
 * @router POST /api/auth/logout
 * @description clear token from user cookie and add the token to the blacklist
 * @access Public
 */

authRouter.post('/logout',logoutUser)

/**
 * @router GET /api/auth/ get-me
 * @description get the details of the logged in user
 * @access Private
 */

authRouter.get('/get-me',authMiddleware,getUserDetails);

export default authRouter;