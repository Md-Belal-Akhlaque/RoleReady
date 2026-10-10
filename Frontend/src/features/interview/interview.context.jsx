import {createContext, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const InterviewContext = createContext();

export const InterviewProvider = ({children})=>{
    const [interviewReport,setInterviewReport] = useState(null);
    const [loading,setLoading] = useState(false);
    const [reports,setReports] = useState([]);
    
    return (
        <InterviewContext.Provider value={{interviewReport,setInterviewReport,loading,setLoading,reports,setReports}}>
            {children}
        </InterviewContext.Provider>
    )
}




// import { createContext, useState } from "react";

// import {
//     generateInterviewReport,
//     getInterviewReportById,
//     getAllInterviewReports,
// } from "../services/interview.api.js";


// const InterviewContext = createContext(null);


// export const InterviewProvider = ({ children }) => {

//     const [interviewReport, setInterviewReport] =
//         useState(null);

//     const [reports, setReports] =
//         useState([]);

//     const [loading, setLoading] =
//         useState(false);


//     // ==========================================
//     // GENERATE REPORT
//     // ==========================================

//     const handleGenerateReport = async ({
//         resumeFile,
//         selfDescription,
//         jobDescription,
//     }) => {

//         setLoading(true);

//         try {

//             const response = await generateInterviewReport({
//                 resumeFile,
//                 selfDescription,
//                 jobDescription,
//             });

//             // Backend response:
//             // {
//             //    interviewReport: {...},
//             //    success: true,
//             //    message: "Report generated successfully"
//             // }

//             const report = response.interviewReport;

//             setInterviewReport(report);

//             return report;

//         } finally {
//             setLoading(false);
//         }
//     };


//     // ==========================================
//     // GET ONE REPORT
//     // ==========================================

//     const handleGetInterviewReport = async (interviewId) => {

//         setLoading(true);

//         try {

//             const response =
//                 await getInterviewReportById(interviewId);

//             const report = response.interviewReport;

//             setInterviewReport(report);

//             return report;

//         } finally {
//             setLoading(false);
//         }
//     };


//     // ==========================================
//     // GET ALL REPORTS
//     // ==========================================

//     const handleGetAllReports = async () => {

//         setLoading(true);

//         try {

//             const response =
//                 await getAllInterviewReports();

//             setReports(response.reports || []);

//             return response;

//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <InterviewContext.Provider
//             value={{
//                 interviewReport,
//                 setInterviewReport,

//                 reports,
//                 setReports,

//                 loading,

//                 handleGenerateReport,
//                 handleGetInterviewReport,
//                 handleGetAllReports,
//             }}
//         >
//             {children}
//         </InterviewContext.Provider>
//     );
// };


// export { InterviewContext };