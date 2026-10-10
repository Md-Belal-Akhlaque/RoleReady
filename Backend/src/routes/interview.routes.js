import express from "express"
import interviewController from "../controllers/interview.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file.middleware.js";

const {
	generateInterviewReportController,
	generateInterviewReportByIdController,
	getAllInterviewReportsController,
} = interviewController;

const interviewRouter = express.Router();


/**
 * @router POST /api/interview/generate-report
 * @description Generate an interview report based on the candidate's resume, self-description, and job description.,resume pdf, job description, self description
 * @body { resume: string, selfDescription: string, jobDescription: string }
 * @returns { interviewReport: object }
 * @access Private
 */
interviewRouter.post("/generate-report",authMiddleware,upload,generateInterviewReportController);

/**
 * @router GET /api/interview/report/:interviewId
 * @description Get an interview report by its ID
 * @params { interviewId: string }
 * @returns { interviewReport: object }
 * @access Private
 * 
 */
interviewRouter.get("/report/:interviewId",authMiddleware,generateInterviewReportByIdController);

/**
 * @router GET /api/interview/reports
 * @description Get all interview reports for the authenticated user
 * @returns { interviewReports: array }
 * @access Private
 */
interviewRouter.get("/reports",authMiddleware,getAllInterviewReportsController);

export default interviewRouter;
