
// here we will verify the JWT token sent by the client in the request headers and if it is valid, we will allow the request to proceed to the next middleware or route handler, otherwise we will return an error response
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.token.js";


const authMiddleware = async (req,res,next) =>{
    try{
        // get the token from the request headers
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided, authorization denied"
            });
        }

        const isBlacklisted = await tokenBlacklistModel.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({
                success: false,
                message: "Authorization denied"
            });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token, authorization denied"
        });
    }
};


export default authMiddleware;