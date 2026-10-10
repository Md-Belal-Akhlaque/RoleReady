import express from "express"
import authRouter from "./routes/auth.route.js";
import interviewRouter from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

app.use(express.json());        // it allows us to parse JSON data in the request body
app.use(cookieParser());        // it allows us to parse cookies in the request headers
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth", authRouter);  // it allows us to use the authRouter for all routes starting with /api/auth
app.use("/api/interview",interviewRouter);  // it allows us to use the interviewRouter for all routes starting with /api/interview


export default app;
