import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import { getAllInterviewReports } from "../services/interview.api.js";
import "../styles/Home.scss";

const InterviewReports = () => {
    const navigate = useNavigate();
    const { reports, setReports, loading, setLoading } = useInterview();
    const [error, setError] = useState("");

    useEffect(() => {
        let isCurrent = true;

        const loadReports = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await getAllInterviewReports();
                if (isCurrent) {
                    setReports(Array.isArray(response?.interviewReports)
                        ? response.interviewReports
                        : []);
                }
            } catch (requestError) {
                if (isCurrent) {
                    if (requestError?.response?.status === 404) {
                        setReports([]);
                    } else {
                        setError(
                            requestError?.response?.data?.message ||
                            "Unable to load your saved interview reports."
                        );
                    }
                }
            } finally {
                if (isCurrent) {
                    setLoading(false);
                }
            }
        };

        loadReports();

        return () => {
            isCurrent = false;
        };
    }, [setLoading, setReports]);

    return (
        <main className="home reports-page">
            <div className="home-background">
                <div className="glow glow-one"></div>
                <div className="glow glow-two"></div>
            </div>

            <header className="topbar">
                <div className="brand">
                    <div className="brand-mark">AI</div>
                    <div className="brand-copy">
                        <h1>InterviewIQ</h1>
                        <span>Saved interview reports</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="reports-new-btn"
                    onClick={() => navigate("/home")}
                >
                    New Report
                </button>
            </header>

            <section className="reports-content">
                <div className="reports-heading">
                    <span>Your library</span>
                    <h2>Interview Reports</h2>
                    <p>Open a saved analysis to review its questions, skill gaps, and preparation plan.</p>
                </div>

                {loading && (
                    <div className="reports-state" role="status">
                        Loading your saved reports...
                    </div>
                )}

                {!loading && error && (
                    <div className="reports-state reports-error" role="alert">
                        {error}
                    </div>
                )}

                {!loading && !error && reports.length === 0 && (
                    <div className="reports-state">
                        <h2>No saved reports yet</h2>
                        <p>Generate an interview report and it will appear here.</p>
                        <button
                            type="button"
                            className="reports-new-btn"
                            onClick={() => navigate("/home")}
                        >
                            Create your first report
                        </button>
                    </div>
                )}

                {!loading && !error && reports.length > 0 && (
                    <div className="saved-report-list">
                        {reports.map((report) => (
                            <article className="saved-report-card" key={report._id}>
                                <div>
                                    <h3>{report.title || "Interview Report"}</h3>
                                    <p>{report.jobDescription || "No job description available."}</p>
                                    <div className="saved-report-meta">
                                        <span className="saved-report-score">
                                            Match score: {report.matchScore ?? "—"}
                                        </span>
                                        <span>{report.technicalQuestions?.length || 0} technical questions</span>
                                        <span>{report.behavioralQuestions?.length || 0} behavioral questions</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="reports-open-btn"
                                    onClick={() => navigate(`/interview/report/${report._id}`)}
                                >
                                    View report
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default InterviewReports;