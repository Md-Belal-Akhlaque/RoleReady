import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtToken.js";
import tokenBlacklistModel from "../models/blacklist.token.js";
import mongoose from "mongoose";

/**
 * @name registerUser
 * @desc Register a new user, expects username, email, and password in the request body
 * @access Public
 */
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide username, email and password"
            });
        }

        // Check if username or email already exists
        const exist = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (exist) {
            return res.status(400).json({
                success: false,
                message: "Account already exists with same email or username"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT
        const token = generateToken(newUser);

        // Store JWT in HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Send response to frontend
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};


/**
 * @name loginUser
 * @desc Login a user, expects email and password in the request body
 * @access Public
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Find user by email
        const exist = await userModel.findOne({ email });

        if (!exist) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, exist.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = generateToken(exist);

        // Store JWT in HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Send response to frontend
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: exist._id,
                username: exist.username,
                email: exist.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

const logoutUser = async (req,res) => {
    try {
        const token = req.cookies.token;
        if(token)
            await tokenBlacklistModel.create({token});

        res.clearCookie("token")
        res.status(200).json({message: "User Logout successfully"});
        
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: "Blacklisting failed, error! or LogOut failed",
            error: error.message
        });
    }
}

const getUserDetails = async (req, res) => {
    try{
        // req.user is coming from the middleware req.user = decoded line
        const user = await userModel.findById(req.user._id);
        if(!user)
        {
            return res.status.json(400)({success:false,
                message:"user don't exist"
            })
        }
        return res.status(200).json({
            success: true,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            },
            message:"user details fetched successfully"
        });
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"No user details found",
            error: err.message
        })
    }
}

export { registerUser, loginUser, logoutUser,getUserDetails};