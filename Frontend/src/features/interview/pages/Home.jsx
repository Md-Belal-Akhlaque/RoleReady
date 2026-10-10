import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth.js";
import {useInterview} from "../hooks/useInterview.js";
import {generateInterviewReport} from "../services/interview.api.js";

import "../styles/Home.scss";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_SELF_DESCRIPTION = 1000;

const Home = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);


    const { user, handleLogout } = useAuth();
    const { setInterviewReport } = useInterview();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resume, setResume] = useState(null);

    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState("");

    const handleResumeChange = (file) => {
        setError("");

        if (!file) return;

        if (file.type !== "application/pdf") {
            setError("Please upload a PDF resume.");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError("Resume must be smaller than 5MB.");
            return;
        }

        setResume(file);
    };

    const handleFileInput = (e) => {
        const file = e.target.files?.[0];
        handleResumeChange(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files?.[0];
        handleResumeChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeResume = () => {
        setResume(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!resume) {
            setError("Please upload your resume.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        if (!selfDescription.trim()) {
            setError("Please enter your self description.");
            return;
        }

        try {
            setGenerating(true);

            const response = await generateInterviewReport({
                resumeFile: resume,
                selfDescription,
                jobDescription,
            });

            const report = response?.interviewReport;
            if (!report?._id) {
                throw new Error("The generated report did not include an ID.");
            }

            setInterviewReport(report);
            navigate(`/interview/report/${report._id}`);

        } catch (error) {
            console.error(error);

            setError(
                error?.response?.data?.message ||
                "Something went wrong while generating your report."
            );
        } finally {
            setGenerating(false);
        }
    };

    const handleSignout = async () => {
        try {
            await handleLogout();
            navigate("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <main className="home">
            <div className="home-background">
                <div className="glow glow-one"></div>
                <div className="glow glow-two"></div>
            </div>

            {generating && (
                <div className="generation-overlay" role="status" aria-live="polite">
                    <div className="generation-overlay-card">
                        <span className="generation-mark" aria-hidden="true">
                            <span className="generation-ring"></span>
                            <span className="generation-core">AI</span>
                        </span>
                        <h2>Preparing your interview report</h2>
                        <p>Analyzing your resume and matching it to the role.</p>
                        <span className="generation-dots" aria-hidden="true">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </div>
                </div>
            )}

            <header className="topbar">
                <div className="brand">
                    <div className="brand-mark">
                        AI
                    </div>

                    <div className="brand-copy">
                        <h1>InterviewIQ</h1>
                        <span>AI-powered interview preparation</span>
                    </div>
                </div>

                <div className="topbar-right">
                    <div className="user-pill">
                        <div className="avatar">
                            {user?.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="user-info">
                            <strong>{user?.username || "Candidate"}</strong>
                            <span>{user?.email || "Ready for your next interview"}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="reports-nav-btn"
                        onClick={() => navigate("/interview/reports")}
                    >
                        Saved Reports
                    </button>

                    <button
                        type="button"
                        className="logout-btn"
                        onClick={handleSignout}
                    >
                        <span>↪</span>
                        Logout
                    </button>
                </div>
            </header>

            <section className="hero">
                <div className="hero-badge">
                    <span className="dot"></span>
                    AI Career Copilot
                </div>

                <h2>
                    Turn your resume into an
                    <span> interview strategy.</span>
                </h2>

                <p>
                    Upload your resume, paste the job description, and tell us
                    about yourself. We’ll identify skill gaps, predict interview
                    questions, and build a focused preparation plan.
                </p>
            </section>

            <section className="workspace">
                <form onSubmit={handleSubmit} className="report-form">

                    {/* LEFT COLUMN */}
                    <div className="main-column">

                        {/* Job Description */}
                        <section className="card">
                            <div className="card-heading">
                                <div className="heading-icon blue-icon">
                                    JD
                                </div>

                                <div>
                                    <h3>Job Description</h3>
                                    <p>
                                        Paste the job description you're applying for.
                                    </p>
                                </div>

                                <span className="required-tag">
                                    Required
                                </span>
                            </div>

                            <textarea
                                className="job-input"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder={`Example:

We are looking for a React Developer with experience in JavaScript, REST APIs, Node.js and MongoDB...

Paste the complete job description here.`}
                            />

                            <div className="input-footer">
                                <span>
                                    Include responsibilities, requirements and nice-to-have skills.
                                </span>

                                <span className="character-count">
                                    {jobDescription.length} chars
                                </span>
                            </div>
                        </section>


                        {/* Resume */}
                        <section className="card">
                            <div className="card-heading">
                                <div className="heading-icon purple-icon">
                                    CV
                                </div>

                                <div>
                                    <h3>Your Resume</h3>
                                    <p>
                                        Upload the latest version of your resume.
                                    </p>
                                </div>

                                <span className="required-tag">
                                    PDF
                                </span>
                            </div>

                            {!resume ? (
                                <div
                                    className="upload-area"
                                    onClick={() => fileInputRef.current?.click()}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <div className="upload-icon">
                                        ↑
                                    </div>

                                    <h4>Drop your resume here</h4>

                                    <p>
                                        or click to browse from your computer
                                    </p>

                                    <span className="upload-limit">
                                        PDF only · Max 5MB
                                    </span>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileInput}
                                        hidden
                                    />
                                </div>
                            ) : (
                                <div className="file-preview">
                                    <div className="file-icon">
                                        PDF
                                    </div>

                                    <div className="file-details">
                                        <strong>{resume.name}</strong>

                                        <span>
                                            {(resume.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                    </div>

                                    <div className="file-status">
                                        ✓ Uploaded
                                    </div>

                                    <button
                                        type="button"
                                        className="remove-file"
                                        onClick={removeResume}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </section>


                        {/* Self Description */}
                        <section className="card">
                            <div className="card-heading">
                                <div className="heading-icon green-icon">
                                    ME
                                </div>

                                <div>
                                    <h3>Tell us about yourself</h3>
                                    <p>
                                        Give the AI some context beyond your resume.
                                    </p>
                                </div>

                                <span className="optional-tag">
                                    Recommended
                                </span>
                            </div>

                            <textarea
                                className="self-input"
                                value={selfDescription}
                                maxLength={MAX_SELF_DESCRIPTION}
                                onChange={(e) =>
                                    setSelfDescription(e.target.value)
                                }
                                placeholder={`Example:

I'm an MCA student and aspiring full-stack developer. I'm strongest in React and JavaScript, while I'm currently improving SQL, system design and DSA...`}
                            />

                            <div className="input-footer">
                                <span>
                                    Mention your strengths, weaknesses, goals and current skills.
                                </span>

                                <span className="character-count">
                                    {selfDescription.length}/{MAX_SELF_DESCRIPTION}
                                </span>
                            </div>
                        </section>


                        {/* Error */}
                        {error && (
                            <div className="error-box">
                                <span className="error-icon">!</span>

                                <div>
                                    <strong>Something needs your attention</strong>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}


                        {/* Submit */}
                        <button
                            type="submit"
                            className={`generate-btn ${generating ? "loading" : ""}`}
                            disabled={generating}
                            aria-busy={generating}
                        >
                            {generating ? (
                                <>
                                    <span className="generation-mark" aria-hidden="true">
                                        <span className="generation-ring"></span>
                                        <span className="generation-core">AI</span>
                                    </span>
                                    <span className="generation-copy" role="status" aria-live="polite">
                                        <strong>Building your interview report</strong>
                                        <small>Analyzing resume and job description</small>
                                    </span>
                                    <span className="generation-dots" aria-hidden="true">
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="sparkle">✦</span>
                                    Generate Interview Report
                                    <span className="arrow">→</span>
                                </>
                            )}
                        </button>

                        <div className="secure-note">
                            <span>🔒</span>
                            Your resume and personal information are processed securely.
                        </div>
                    </div>


                    {/* RIGHT SIDEBAR */}
                    <aside className="side-column">

                        <div className="side-card">
                            <div className="side-card-top">
                                <span className="mini-badge">HOW IT WORKS</span>
                            </div>

                            <div className="steps">

                                <div className="step">
                                    <div className="step-number">01</div>

                                    <div>
                                        <h4>Analyze your profile</h4>
                                        <p>
                                            We extract your experience, skills and projects.
                                        </p>
                                    </div>
                                </div>

                                <div className="connector"></div>

                                <div className="step">
                                    <div className="step-number">02</div>

                                    <div>
                                        <h4>Compare with the JD</h4>
                                        <p>
                                            AI identifies strengths and missing skills.
                                        </p>
                                    </div>
                                </div>

                                <div className="connector"></div>

                                <div className="step">
                                    <div className="step-number">03</div>

                                    <div>
                                        <h4>Build your strategy</h4>
                                        <p>
                                            Get questions, skill gaps and a preparation plan.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="side-card tips-card">
                            <div className="tips-icon">
                                ✦
                            </div>

                            <h3>Get better results</h3>

                            <ul>
                                <li>Paste the complete job description.</li>
                                <li>Use your latest resume.</li>
                                <li>Be honest about your strengths and gaps.</li>
                                <li>Mention projects you're actually comfortable discussing.</li>
                            </ul>
                        </div>


                        <div className="side-card stats-card">
                            <div className="stat">
                                <strong>01</strong>
                                <span>Resume analyzed</span>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="stat">
                                <strong>05</strong>
                                <span>Report sections</span>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="stat">
                                <strong>AI</strong>
                                <span>Personalized coaching</span>
                            </div>
                        </div>

                    </aside>

                </form>
            </section>
        </main>
    );
};

export default Home;