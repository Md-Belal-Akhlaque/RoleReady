import generateInterviewReport from "../services/ai.service.js";
import { PDFParse } from "pdf-parse";
import interviewReportModel from "../models/interviewReport.model.js";

const generateInterviewReportController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume."
            });
        }

        const selfDescription = typeof req.body.selfDescription === "string"
            ? req.body.selfDescription.trim()
            : "";
        const jobDescription = typeof req.body.jobDescription === "string"
            ? req.body.jobDescription.trim()
            : "";

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Self description and job description are required."
            });
        }

        const parser = new PDFParse({
            data: req.file.buffer
        });

        let resumeText;
        try {
            const resumeContent = await parser.getText();
            resumeText = resumeContent.text?.replace(/\0/g, "").trim();
        } finally {
            await parser.destroy();
        }

        if (!resumeText) {
            return res.status(422).json({
                success: false,
                message: "We could not read text from this PDF. Please upload a text-based PDF resume."
            });
        }

        console.info("[Interview] Input text lengths", {
            resume: resumeText.length,
            selfDescription: selfDescription.length,
            jobDescription: jobDescription.length
        });

        const reportAI = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            ...reportAI,
            user: req.user._id,
            selfDescription,
            jobDescription
        });
        res.status(200).json({ interviewReport, success: true, message: "Report generated successfully" });

    } catch (error) {
        console.error("Error generating interview report:", error);

        res.status(500).json({
            error: "Failed to generate interview report",
            success: false
        });
    }
};

/**
 * @router GET /api/interview/report/:interviewId
 * @description Get an interview report by its ID controller
 * 
 */

const generateInterviewReportByIdController = async (req, res) => {
    const { interviewId } = req.params;
    try {
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user._id });
        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            })

        }
        res.status(200).json({ interviewReport, success: true, message: "Report fetched successfully" });
    } catch (error) {
        console.error("Error fetching interview report:", error);

        res.status(500).json({
            error: "Failed to fetch interview report",
            success: false
        });
    }

}

/**
 * @router GET /api/interview/reports
 * @description Get all interview reports for the authenticated user controller
 * 
 */

const getAllInterviewReportsController = async (req, res) => {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user._id }).sort({ createdAt: -1 });
        if(!interviewReports || interviewReports.length === 0){
            return res.status(404).json({
                success: false,
                message: "No interview reports found"
            });
        }

        res.status(200).json({ interviewReports, success: true, message: "Reports fetched successfully" });
    } catch (error) {
        console.error("Error fetching interview reports:", error);
        res.status(500).json({
            error: "Failed to fetch interview reports",
            success: false
        });
    }
};

export default { generateInterviewReportController, generateInterviewReportByIdController, getAllInterviewReportsController };