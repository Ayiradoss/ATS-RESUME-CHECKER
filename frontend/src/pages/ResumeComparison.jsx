import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ResumeComparison() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [resumes, setResumes] = useState([]);
    const [jobDescriptions, setJobDescriptions] = useState([]);

    const [selectedResumeId, setSelectedResumeId] =
        useState("");

    const [selectedJobDescriptionId, setSelectedJobDescriptionId] =
        useState("");

    const [result, setResult] = useState(null);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [loadingData, setLoadingData] =
        useState(true);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    /*
     * Load resumes and job descriptions
     * when the page opens.
     */
    useEffect(() => {

        if (!user || !user.id) {

            setMessage(
                "Please login first."
            );

            setLoadingData(false);

            return;
        }

        fetchResumesAndJobDescriptions();

    }, []);

    /*
     * Automatically select Job Description
     * when coming from My Job Descriptions.
     */
    useEffect(() => {

        const jobDescriptionId =
            searchParams.get("jobDescriptionId");

        if (jobDescriptionId) {

            setSelectedJobDescriptionId(
                jobDescriptionId
            );
        }

    }, [searchParams]);

    /*
     * Get user's resumes and job descriptions.
     */
    const fetchResumesAndJobDescriptions = async () => {

        try {

            const [resumeResponse, jobDescriptionResponse] =
                await Promise.all([

                    api.get(
                        `/api/resumes/user/${user.id}`
                    ),

                    api.get(
                        `/api/job-descriptions/user/${user.id}`
                    )

                ]);

            console.log(
                "Resumes:",
                resumeResponse.data
            );

            console.log(
                "Job Descriptions:",
                jobDescriptionResponse.data
            );

            setResumes(
                resumeResponse.data
            );

            setJobDescriptions(
                jobDescriptionResponse.data
            );

        } catch (error) {

            console.error(
                "Loading Data Error:",
                error
            );

            if (error.response) {

                setMessage(
                    `Failed to load data. Status: ${error.response.status}`
                );

            } else if (error.request) {

                setMessage(
                    "Backend server did not respond."
                );

            } else {

                setMessage(
                    "Error: " + error.message
                );
            }

        } finally {

            setLoadingData(false);
        }
    };

    /*
     * Analyze selected resume
     * with selected job description.
     */
    const handleAnalyze = async (e) => {

        e.preventDefault();

        if (!selectedResumeId) {

            setMessage(
                "Please select a resume."
            );

            return;
        }

        if (!selectedJobDescriptionId) {

            setMessage(
                "Please select a job description."
            );

            return;
        }

        setLoading(true);
        setMessage("");
        setResult(null);

        try {

            const response = await api.get(
                "/resume-comparison",
                {
                    params: {
                        resumeId:
                            selectedResumeId,

                        jobDescriptionId:
                            selectedJobDescriptionId
                    }
                }
            );

            console.log(
                "Comparison Result:",
                response.data
            );

            setResult(
                response.data
            );

            setMessage(
                "Resume analyzed successfully!"
            );

        } catch (error) {

            console.error(
                "Comparison Error:",
                error
            );

            if (error.response) {

                setMessage(
                    `Failed to analyze resume. Status: ${error.response.status}`
                );

            } else if (error.request) {

                setMessage(
                    "Backend server did not respond."
                );

            } else {

                setMessage(
                    "Error: " + error.message
                );
            }

        } finally {

            setLoading(false);
        }
    };

    /*
     * Find selected resume name.
     */
    const selectedResume = resumes.find(
        (resume) =>
            String(resume.id) ===
            String(selectedResumeId)
    );

    /*
     * Find selected job description.
     */
    const selectedJobDescription =
        jobDescriptions.find(
            (jobDescription) =>
                String(jobDescription.id) ===
                String(selectedJobDescriptionId)
        );

    return (
        <div className="dashboard-layout">

            {/* Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <main className="dashboard-main">

                <Navbar />

                <section className="dashboard-content">

                    {/* Page Header */}

                    <div className="page-header">

                        <div>

                            <h1>
                                ATS Resume Analysis
                            </h1>

                            <p>
                                Compare your resume with a job
                                description and discover your ATS match.
                            </p>

                        </div>

                    </div>

                    {/* Loading Data */}

                    {loadingData && (

                        <div className="management-status-card">

                            <div className="loading-spinner"></div>

                            <h3>
                                Preparing analysis...
                            </h3>

                            <p>
                                Loading your resumes and job descriptions.
                            </p>

                        </div>

                    )}

                    {/* Error */}

                    {!loadingData &&
                    message &&
                    !result && (

                        <div className="management-status-card error-status">

                            <div className="status-icon">
                                !
                            </div>

                            <h3>
                                Something went wrong
                            </h3>

                            <p>
                                {message}
                            </p>

                            <button
                                className="secondary-button"
                                onClick={() => {
                                    setMessage("");
                                    fetchResumesAndJobDescriptions();
                                }}
                            >
                                Try Again
                            </button>

                        </div>

                    )}

                    {/* Analysis Selection */}

                    {!loadingData &&
                    (!message || result) && (

                        <>

                            <section className="analysis-selection-section">

                                <div className="analysis-section-header">

                                    <div>

                                        <h2>
                                            Start Analysis
                                        </h2>

                                        <p>
                                            Select a resume and a job
                                            description to compare.
                                        </p>

                                    </div>

                                </div>

                                <form
                                    className="analysis-selection-grid"
                                    onSubmit={handleAnalyze}
                                >

                                    {/* Resume Card */}

                                    <div className="analysis-select-card">

                                        <div className="analysis-card-icon">
                                            📄
                                        </div>

                                        <div className="analysis-card-heading">

                                            <span>
                                                STEP 1
                                            </span>

                                            <h3>
                                                Select Resume
                                            </h3>

                                        </div>

                                        <p>
                                            Choose the resume you want
                                            to analyze.
                                        </p>

                                        <select
                                            className="analysis-select"
                                            value={selectedResumeId}
                                            onChange={(e) => {
                                                setSelectedResumeId(
                                                    e.target.value
                                                );
                                                setMessage("");
                                                setResult(null);
                                            }}
                                        >

                                            <option value="">
                                                -- Select Resume --
                                            </option>

                                            {resumes.map(
                                                (resume) => (

                                                    <option
                                                        key={resume.id}
                                                        value={resume.id}
                                                    >
                                                        {resume.fileName ||
                                                            resume.resumeName ||
                                                            `Resume ${resume.id}`}
                                                    </option>

                                                )
                                            )}

                                        </select>

                                        {selectedResume && (

                                            <div className="selected-item-info">

                                                ✓ Selected:
                                                {" "}
                                                {selectedResume.fileName ||
                                                    selectedResume.resumeName ||
                                                    `Resume ${selectedResume.id}`}

                                            </div>

                                        )}

                                    </div>

                                    {/* Job Description Card */}

                                    <div className="analysis-select-card">

                                        <div className="analysis-card-icon">
                                            💼
                                        </div>

                                        <div className="analysis-card-heading">

                                            <span>
                                                STEP 2
                                            </span>

                                            <h3>
                                                Select Job Description
                                            </h3>

                                        </div>

                                        <p>
                                            Choose the job description
                                            you want to match against.
                                        </p>

                                        <select
                                            className="analysis-select"
                                            value={
                                                selectedJobDescriptionId
                                            }
                                            onChange={(e) => {
                                                setSelectedJobDescriptionId(
                                                    e.target.value
                                                );
                                                setMessage("");
                                                setResult(null);
                                            }}
                                        >

                                            <option value="">
                                                -- Select Job Description --
                                            </option>

                                            {jobDescriptions.map(
                                                (jobDescription) => (

                                                    <option
                                                        key={
                                                            jobDescription.id
                                                        }
                                                        value={
                                                            jobDescription.id
                                                        }
                                                    >
                                                        {
                                                            jobDescription.jobTitle
                                                        }
                                                    </option>

                                                )
                                            )}

                                        </select>

                                        {selectedJobDescription && (

                                            <div className="selected-item-info">

                                                ✓ Selected:
                                                {" "}
                                                {
                                                    selectedJobDescription.jobTitle
                                                }

                                            </div>

                                        )}

                                    </div>

                                    {/* Analyze Area */}

                                    <div className="analysis-action-area">

                                        <div>

                                            <h3>
                                                Ready to analyze?
                                            </h3>

                                            <p>
                                                Our system will compare
                                                your resume skills against
                                                the selected job description.
                                            </p>

                                        </div>

                                        <button
                                            className="primary-button analysis-main-button"
                                            type="submit"
                                            disabled={loading}
                                        >

                                            {loading ? (

                                                <>
                                                    <span className="button-spinner"></span>
                                                    Analyzing...
                                                </>

                                            ) : (

                                                <>
                                                    Analyze Resume
                                                    <span>→</span>
                                                </>

                                            )}

                                        </button>

                                    </div>

                                </form>

                            </section>

                            {/* Success Message */}

                            {message &&
                            result && (

                                <div className="analysis-success-message">
                                    ✓ {message}
                                </div>

                            )}

                            {/* Analysis Result */}

                            {result && (

                                <section className="analysis-result-section">

                                    {/* Result Header */}

                                    <div className="analysis-result-header">

                                        <div>

                                            <span className="result-label">
                                                ANALYSIS COMPLETE
                                            </span>

                                            <h2>
                                                ATS Analysis Result
                                            </h2>

                                            <p>
                                                Resume:
                                                {" "}
                                                <strong>
                                                    {selectedResume?.fileName ||
                                                        selectedResume?.resumeName ||
                                                        `Resume ${selectedResumeId}`}
                                                </strong>
                                                {" "}
                                                •
                                                {" "}
                                                Job:
                                                {" "}
                                                <strong>
                                                    {selectedJobDescription?.jobTitle ||
                                                        `Job Description ${selectedJobDescriptionId}`}
                                                </strong>
                                            </p>

                                        </div>

                                    </div>

                                    {/* Score + Summary */}

                                    <div className="analysis-overview-grid">

                                        {/* Score */}

                                        <div className="ats-score-card">

                                            <div className="score-circle">

                                                <div>

                                                    <strong>
                                                        {result.atsScore}
                                                    </strong>

                                                    <span>
                                                        %
                                                    </span>

                                                </div>

                                            </div>

                                            <h3>
                                                ATS Match Score
                                            </h3>

                                            <p>
                                                Based on matching skills
                                                between your resume and
                                                the job description.
                                            </p>

                                        </div>

                                        {/* Summary */}

                                        <div className="analysis-summary-card">

                                            <h3>
                                                Match Summary
                                            </h3>

                                            <div className="summary-stat-grid">

                                                <div className="summary-stat">

                                                    <span>
                                                        Matched Skills
                                                    </span>

                                                    <strong>
                                                        {
                                                            result.matchedSkillCount
                                                        }
                                                    </strong>

                                                </div>

                                                <div className="summary-stat">

                                                    <span>
                                                        Required Skills
                                                    </span>

                                                    <strong>
                                                        {
                                                            result.totalJdSkills
                                                        }
                                                    </strong>

                                                </div>

                                                <div className="summary-stat">

                                                    <span>
                                                        Missing Skills
                                                    </span>

                                                    <strong>
                                                        {
                                                            result.missingSkills
                                                                ?.length || 0
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Skills */}

                                    <div className="skills-result-grid">

                                        {/* Matched */}

                                        <div className="skills-result-card matched-card">

                                            <div className="skills-result-heading">

                                                <div className="skill-heading-icon">
                                                    ✓
                                                </div>

                                                <div>

                                                    <h3>
                                                        Matched Skills
                                                    </h3>

                                                    <p>
                                                        Skills found in both
                                                        your resume and the JD.
                                                    </p>

                                                </div>

                                            </div>

                                            {result.matchedSkills &&
                                            result.matchedSkills.length > 0 ? (

                                                <div className="skill-badge-list">

                                                    {result.matchedSkills.map(
                                                        (skill, index) => (

                                                            <span
                                                                className="skill-badge matched-skill"
                                                                key={index}
                                                            >
                                                                ✓ {skill}
                                                            </span>

                                                        )
                                                    )}

                                                </div>

                                            ) : (

                                                <div className="no-skills-message">
                                                    No matched skills found.
                                                </div>

                                            )}

                                        </div>

                                        {/* Missing */}

                                        <div className="skills-result-card missing-card">

                                            <div className="skills-result-heading">

                                                <div className="skill-heading-icon">
                                                    !
                                                </div>

                                                <div>

                                                    <h3>
                                                        Missing Skills
                                                    </h3>

                                                    <p>
                                                        Skills required by the
                                                        JD but not found in your resume.
                                                    </p>

                                                </div>

                                            </div>

                                            {result.missingSkills &&
                                            result.missingSkills.length > 0 ? (

                                                <div className="skill-badge-list">

                                                    {result.missingSkills.map(
                                                        (skill, index) => (

                                                            <span
                                                                className="skill-badge missing-skill"
                                                                key={index}
                                                            >
                                                                + {skill}
                                                            </span>

                                                        )
                                                    )}

                                                </div>

                                            ) : (

                                                <div className="no-skills-message">
                                                    🎉 No missing skills. Great match!
                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </section>

                            )}

                            {/* Bottom Navigation */}

                            <div className="analysis-bottom-actions">

                                <button
                                    className="secondary-button"
                                    onClick={() =>
                                        navigate("/my-resumes")
                                    }
                                >
                                    My Resumes
                                </button>

                                <button
                                    className="secondary-button"
                                    onClick={() =>
                                        navigate("/my-job-descriptions")
                                    }
                                >
                                    Job Descriptions
                                </button>

                                <button
                                    className="secondary-button"
                                    onClick={() =>
                                        navigate("/analysis-history")
                                    }
                                >
                                    Analysis History
                                </button>

                            </div>

                        </>
                    )}

                </section>

            </main>

        </div>
    );
}

export default ResumeComparison;