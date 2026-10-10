

import axios from "axios";

const api = axios.create({
    baseURL: "https://roleready-hlcd.onrender.com",
    withCredentials: true,
});


// Generate new interview report
export const generateInterviewReport = async ({
    selfDescription,
    jobDescription,
    resumeFile,
}) => {

    const formData = new FormData();

    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);

    try {
        const response = await api.post(
            "/api/interview/generate-report",
            formData
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error generating interview report:",
            error
        );

        throw error;
    }
};


// Get one report
export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(
            `/api/interview/report/${interviewId}`
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error fetching interview report:",
            error
        );

        throw error;
    }
};


// Get all reports of logged-in user
export const getAllInterviewReports = async () => {
    try {
        const response = await api.get(
            "/api/interview/reports"
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error fetching all interview reports:",
            error
        );

        throw error;
    }
};