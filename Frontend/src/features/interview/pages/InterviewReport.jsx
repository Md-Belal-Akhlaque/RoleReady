import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import { getInterviewReportById } from "../services/interview.api.js";
import "../styles/InterviewReport.scss";

const InterviewReport = () => {
    const navigate = useNavigate();
    const { interviewId } = useParams();
    const { interviewReport, setInterviewReport, loading, setLoading } = useInterview();
    const [fetchError, setFetchError] = useState("");

    const [activeSection, setActiveSection] = useState("technical");

    useEffect(() => {
        let isCurrent = true;

        const fetchReport = async () => {
            setLoading(true);
            setFetchError("");

            try {
                const response = await getInterviewReportById(interviewId);
                if (isCurrent) {
                    setInterviewReport(response.interviewReport);
                }
            } catch (error) {
                if (isCurrent) {
                    setFetchError(
                        error?.response?.data?.message ||
                        "Unable to load this interview report."
                    );
                }
            } finally {
                if (isCurrent) {
                    setLoading(false);
                }
            }
        };

        fetchReport();

        return () => {
            isCurrent = false;
        };
    }, [interviewId, setInterviewReport, setLoading]);

    const report = interviewReport?._id === interviewId ? interviewReport : null;

    if (!report) {
        return (
            <main className="report-page report-empty">
                <div className="empty-card">
                    <div className="empty-icon">{loading ? "…" : "!"}</div>

                    <h1>{loading ? "Loading report" : "Unable to load report"}</h1>

                    <p>
                        {loading
                            ? "Your saved interview report is being retrieved."
                            : fetchError || "Return home to generate a new interview report."}
                    </p>

                    <button
                        type="button"
                        className="report-btn"
                        onClick={() => navigate("/home")}
                    >
                        Go to Home
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="report-page">

            {/* Background */}
            <div className="report-background">
                <div className="report-glow report-glow-one"></div>
                <div className="report-glow report-glow-two"></div>
            </div>


            {/* Header */}
            <header className="report-header">

                <div className="report-brand">
                    <div className="report-brand-icon">
                        AI
                    </div>

                    <div>
                        <h1>InterviewIQ</h1>
                        <span>Interview Report</span>
                    </div>
                </div>


                <div className="header-actions">

                    <div className="match-score">
                        <div
                            className="score-ring"
                            style={{ "--score": Number(report.matchScore) || 0 }}
                        >
                            <span>{report.matchScore ?? 0}</span>
                        </div>

                        <div>
                            <span className="score-label">
                                MATCH SCORE
                            </span>

                            <strong>
                                Profile Match
                            </strong>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="new-report-btn"
                        onClick={() => navigate("/home")}
                    >
                        <span aria-hidden="true">+</span>
                        New Report
                    </button>

                </div>

            </header>


            {/* Main layout */}
            <section className="report-layout">

                {/* LEFT */}
                <aside className="report-sidebar">

                    <div className="sidebar-label">
                        REPORT
                    </div>

                    <button
                        type="button"
                        aria-pressed={activeSection === "technical"}
                        className={
                            activeSection === "technical"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() => setActiveSection("technical")}
                    >
                        <span className="nav-icon">01</span>

                        <span>
                            <strong>Technical Questions</strong>
                            <small>
                                {report.technicalQuestions?.length || 0} questions
                            </small>
                        </span>
                    </button>


                    <button
                        type="button"
                        aria-pressed={activeSection === "behavioral"}
                        className={
                            activeSection === "behavioral"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() => setActiveSection("behavioral")}
                    >
                        <span className="nav-icon">02</span>

                        <span>
                            <strong>Behavioral Questions</strong>
                            <small>
                                {report.behavioralQuestions?.length || 0} questions
                            </small>
                        </span>
                    </button>


                    <button
                        type="button"
                        aria-pressed={activeSection === "roadmap"}
                        className={
                            activeSection === "roadmap"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() => setActiveSection("roadmap")}
                    >
                        <span className="nav-icon">03</span>

                        <span>
                            <strong>Preparation Roadmap</strong>
                            <small>
                                {report.preparationPlan?.length || 0} days
                            </small>
                        </span>
                    </button>


                    <div className="sidebar-divider"></div>


                    <div className="sidebar-summary">

                        <span>AI INSIGHT</span>

                        <p>
                            Focus your preparation on the highest-impact
                            skill gaps before the interview.
                        </p>

                    </div>

                </aside>


                {/* CENTER */}
                <section className="report-main">

                    {activeSection === "technical" && (
                        <TechnicalSection
                            questions={report.technicalQuestions}
                        />
                    )}

                    {activeSection === "behavioral" && (
                        <BehavioralSection
                            questions={report.behavioralQuestions}
                        />
                    )}

                    {activeSection === "roadmap" && (
                        <RoadmapSection
                            preparationPlan={report.preparationPlan}
                        />
                    )}

                </section>


                {/* RIGHT */}
                <aside className="skills-sidebar">

                    <section className="score-panel">
                        <span className="score-label">MATCH SCORE</span>
                        <div
                            className="score-ring score-ring-large"
                            style={{ "--score": Number(report.matchScore) || 0 }}
                        >
                            <span>{report.matchScore ?? 0}</span>
                        </div>
                        <strong>Profile Match</strong>
                    </section>

                    <div className="skills-heading">

                        <div>
                            <span>ANALYSIS</span>
                            <h2>Skill Gaps</h2>
                        </div>

                        <div className="gap-count">
                            {report.skillGaps?.length || 0}
                        </div>

                    </div>


                    <div className="skills-list">

                        {report.skillGaps?.map((item, index) => (
                            <div
                                className="skill-card"
                                key={`${item.skill}-${index}`}
                            >

                                <div className="skill-top">

                                    <span
                                        className={`severity ${item.severity || "low"}`}
                                    >
                                        {item.severity || "low"}
                                    </span>

                                </div>

                                <h3>{item.skill}</h3>

                            </div>
                        ))}

                    </div>


                    <div className="quick-summary">

                        <span>PREPARATION PRIORITY</span>

                        <div className="priority-bars">

                            <div>
                                <span>Critical</span>
                                <i className="priority critical"></i>
                            </div>

                            <div>
                                <span>Important</span>
                                <i className="priority important"></i>
                            </div>

                            <div>
                                <span>Optional</span>
                                <i className="priority optional"></i>
                            </div>

                        </div>

                    </div>

                </aside>

            </section>

        </main>
    );
};


/* ======================================================
   TECHNICAL
====================================================== */

const TechnicalSection = ({ questions }) => {

    return (
        <div className="content-section">

            <div className="section-header">
                <div>
                    <span className="section-eyebrow">
                        TECHNICAL ASSESSMENT
                    </span>

                    <h2>
                        Technical Questions
                    </h2>

                    <p>
                        Questions likely to be asked based on your
                        projects, skills and the target role.
                    </p>
                </div>

                <div className="question-count">
                    {questions?.length || 0}
                </div>
            </div>


            <div className="question-list">

                {questions?.map((item, index) => (

                    <article
                        className="question-card"
                        key={index}
                    >

                        <div className="question-number">
                            {String(index + 1).padStart(2, "0")}
                        </div>


                        <div className="question-content">

                            <h3>
                                {item.question}
                            </h3>


                            <div className="question-block intention">

                                <span>
                                    INTERVIEWER INTENTION
                                </span>

                                <p>{item.intension}</p>

                            </div>


                            <div className="question-block answer">

                                <span>
                                    WHAT TO COVER
                                </span>

                                <p>
                                    {item.answer}
                                </p>

                            </div>

                        </div>

                    </article>

                ))}

            </div>

        </div>
    );
};


/* ======================================================
   BEHAVIORAL
====================================================== */

const BehavioralSection = ({ questions }) => {

    return (
        <div className="content-section">

            <div className="section-header">
                <div>
                    <span className="section-eyebrow">
                        BEHAVIORAL ASSESSMENT
                    </span>

                    <h2>
                        Behavioral Questions
                    </h2>

                    <p>
                        Questions designed around your experience,
                        communication and problem-solving approach.
                    </p>
                </div>

                <div className="question-count">
                    {questions?.length || 0}
                </div>
            </div>


            <div className="question-list">

                {questions?.map((item, index) => (

                    <article
                        className="question-card"
                        key={index}
                    >

                        <div className="question-number">
                            {String(index + 1).padStart(2, "0")}
                        </div>


                        <div className="question-content">

                            <h3>
                                {item.question}
                            </h3>


                            <div className="question-block intention">

                                <span>
                                    INTERVIEWER INTENTION
                                </span>

                                <p>{item.intension}</p>

                            </div>


                            <div className="question-block answer">

                                <span>
                                    ANSWER FRAMEWORK
                                </span>

                                <p>
                                    {item.answer}
                                </p>

                            </div>

                        </div>

                    </article>

                ))}

            </div>

        </div>
    );
};


/* ======================================================
   ROADMAP
====================================================== */

const RoadmapSection = ({ preparationPlan }) => {

    return (
        <div className="content-section">

            <div className="section-header">

                <div>
                    <span className="section-eyebrow">
                        PREPARATION ROADMAP
                    </span>

                    <h2>
                        Your Interview Plan
                    </h2>

                    <p>
                        A focused day-by-day plan based on your
                        profile and target role.
                    </p>
                </div>

            </div>


            <div className="roadmap">

                {preparationPlan?.map((item, index) => (

                    <article
                        className="roadmap-card"
                        key={index}
                    >

                        <div className="roadmap-day">
                            <span>DAY</span>
                            <strong>
                                {String(item.day).padStart(2, "0")}
                            </strong>
                        </div>


                        <div className="roadmap-content">

                            <h3>Preparation priorities</h3>


                            <div className="roadmap-grid">

                                <div>
                                    <span>TASKS</span>

                                    <ul>
                                        {item.task?.map(
                                            (task, taskIndex) => (
                                                <li key={taskIndex}>
                                                    {task}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>


                                <div>
                                    <span>FOCUS</span>

                                    <div className="focus-list">

                                        {item.focus?.map(
                                            (focus, focusIndex) => (
                                                <span key={focusIndex}>
                                                    {focus}
                                                </span>
                                            )
                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </article>

                ))}

            </div>

        </div>
    );
};

export default InterviewReport;