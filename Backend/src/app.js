import express from "express";
import authRouter from "./routes/auth.route.js";
import interviewRouter from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://role-ready-mu.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as
      // certain server-to-server or local health checks.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json()); // it allows us to parse JSON data in the request body
app.use(cookieParser()); // it allows us to parse cookies in the request headers

app.use("/api/auth", authRouter); // it allows us to use the authRouter for all routes starting with /api/auth
app.use("/api/interview", interviewRouter); // it allows us to use the interviewRouter for all routes starting with /api/interview

export default app;
