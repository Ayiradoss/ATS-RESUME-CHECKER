import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AnalysisHistory() {

    const navigate = useNavigate();

    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    // ==========================================
    // Get Analysis History
    // ==========================================

    useEffect(() => {

        if (!user || !user.id) {

            setMessage(
                "Please login first."
            );

            setLoading(false);

            return;
        }

        fetchAnalyses();

    }, []);


    const fetchAnalyses = async () => {

        setLoading(true);
        setMessage("");

        try {

            const response = await api.get(
                `/api/analyses/user/${user.id}`
            );

            console.log(
                "Analysis History:",
                response.data
            );

            setAnalyses(response.data);

        } catch (error) {

            console.error(
                "Analysis History Error:",
                error
            );

            if (error.response) {

                setMessage(
                    `Failed to load analysis history. Status: ${error.response.status}`
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


    // ==========================================
    // Start New Analysis
    // ==========================================

    const handleNewAnalysis = () => {

        navigate(
            "/resume-comparison"
        );

    };


    // ==========================================
    // Page
    // ==========================================

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
                                Analysis History
                            </h1>

                            <p>
                                Review your previous resume
                                and job description analyses.
                            </p>

                        </div>


                        <button
                            className="primary-button"
                            onClick={handleNewAnalysis}
                        >
                            + New Analysis
                        </button>

                    </div>


                    {/* Loading */}

                    {loading && (

                        <div className="management-status-card">

                            <div className="loading-spinner"></div>

                            <h3>
                                Loading analysis history...
                            </h3>

                            <p>
                                Please wait while we fetch
                                your previous analyses.
                            </p>

                        </div>

                    )}


                    {/* Error */}

                    {!loading &&
                    message && (

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
                                onClick={fetchAnalyses}
                            >
                                Try Again
                            </button>

                        </div>

                    )}


                    {/* Empty State */}

                    {!loading &&
                    !message &&
                    analyses.length === 0 && (

                        <div className="management-status-card">

                            <div className="empty-state-icon">
                                📊
                            </div>

                            <h2>
                                No Analysis History Yet
                            </h2>

                            <p>
                                You haven't analyzed any resumes yet.
                                Start your first analysis to see the
                                results here.
                            </p>

                            <button
                                className="primary-button"
                                onClick={handleNewAnalysis}
                            >
                                Analyze a Resume
                            </button>

                        </div>

                    )}


                    {/* Analysis List */}

                    {!loading &&
                    !message &&
                    analyses.length > 0 && (

                        <section className="history-section">

                            {/* List Header */}

                            <div className="history-list-header">

                                <div>

                                    <h2>
                                        Previous Analyses
                                    </h2>

                                    <p>
                                        {analyses.length}{" "}
                                        {analyses.length === 1
                                            ? "analysis"
                                            : "analyses"}{" "}
                                        completed
                                    </p>

                                </div>


                                <button
                                    className="secondary-button"
                                    onClick={fetchAnalyses}
                                >
                                    ↻ Refresh
                                </button>

                            </div>


                            {/* Analysis Cards */}

                            <div className="analysis-history-list">

                                {analyses.map(
                                    (analysis) => (

                                        <div
                                            className="analysis-history-card"
                                            key={analysis.id}
                                        >

                                            {/* Top Row */}

                                            <div className="history-card-top">

                                                <div className="history-card-icon">
                                                    📊
                                                </div>


                                                <div className="history-card-title">

                                                    <span className="history-label">
                                                        ANALYSIS #{analysis.id}
                                                    </span>

                                                    <h3>
                                                        {analysis.jobDescription?.jobTitle ||
                                                            "Job Description"}
                                                    </h3>

                                                </div>


                                                <div className="history-score">

                                                    <strong>
                                                        {analysis.atsScore}
                                                    </strong>

                                                    <span>
                                                        %
                                                    </span>

                                                    <small>
                                                        ATS Score
                                                    </small>

                                                </div>

                                            </div>


                                            {/* Details */}

                                            <div className="history-card-details">

                                                <div className="history-detail">

                                                    <span>
                                                        Resume
                                                    </span>

                                                    <strong>
                                                        Resume #
                                                        {analysis.resume?.id ||
                                                            "N/A"}
                                                    </strong>

                                                </div>


                                                <div className="history-detail">

                                                    <span>
                                                        Job Description
                                                    </span>

                                                    <strong>
                                                        JD #
                                                        {analysis.jobDescription?.id ||
                                                            "N/A"}
                                                    </strong>

                                                </div>


                                                <div className="history-detail">

                                                    <span>
                                                        Analyzed At
                                                    </span>

                                                    <strong>
                                                        {analysis.analyzedAt
                                                            ? new Date(
                                                                analysis.analyzedAt
                                                            ).toLocaleString()
                                                            : "N/A"}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* Skills */}

                                            <div className="history-skills-grid">

                                                {/* Matched */}

                                                <div className="history-skill-group">

                                                    <div className="history-skill-title">

                                                        <span className="matched-dot">
                                                            ✓
                                                        </span>

                                                        Matched Skills

                                                    </div>


                                                    <div className="history-skill-list">

                                                        {analysis.matchedSkills ? (

                                                            analysis.matchedSkills
                                                                .split(",")
                                                                .map(
                                                                    (skill, index) => (

                                                                        <span
                                                                            className="history-skill matched-history-skill"
                                                                            key={index}
                                                                        >
                                                                            {skill.trim()}
                                                                        </span>

                                                                    )
                                                                )

                                                        ) : (

                                                            <span className="history-no-skill">
                                                                No matched skills
                                                            </span>

                                                        )}

                                                    </div>

                                                </div>


                                                {/* Missing */}

                                                <div className="history-skill-group">

                                                    <div className="history-skill-title">

                                                        <span className="missing-dot">
                                                            !
                                                        </span>

                                                        Missing Skills

                                                    </div>


                                                    <div className="history-skill-list">

                                                        {analysis.missingSkills ? (

                                                            analysis.missingSkills
                                                                .split(",")
                                                                .map(
                                                                    (skill, index) => (

                                                                        <span
                                                                            className="history-skill missing-history-skill"
                                                                            key={index}
                                                                        >
                                                                            {skill.trim()}
                                                                        </span>

                                                                    )
                                                                )

                                                        ) : (

                                                            <span className="history-no-skill">
                                                                No missing skills
                                                            </span>

                                                        )}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Card Footer */}

                                            <div className="history-card-footer">

                                                <span>
                                                    Resume analysis completed
                                                </span>


                                                <button
                                                    className="history-analyze-button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/resume-comparison?jobDescriptionId=${analysis.jobDescription?.id}`
                                                        )
                                                    }
                                                >
                                                    Analyze Again
                                                    <span>
                                                        →
                                                    </span>
                                                </button>

                                            </div>

                                        </div>

                                    )
                                )}

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
                                navigate("/dashboard")
                            }
                        >
                            Dashboard
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AnalysisHistory;