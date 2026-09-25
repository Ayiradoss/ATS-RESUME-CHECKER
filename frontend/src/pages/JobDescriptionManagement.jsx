import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function JobDescriptionManagement() {

    const navigate = useNavigate();

    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        if (!user || !user.id) {

            setMessage("Please login first.");
            setLoading(false);

            return;
        }

        fetchJobDescriptions();

    }, []);

    const fetchJobDescriptions = async () => {

        try {

            const response = await api.get(
                `/api/job-descriptions/user/${user.id}`
            );

            console.log(
                "User Job Descriptions:",
                response.data
            );

            setJobDescriptions(response.data);

        } catch (error) {

            console.error(
                "Job Description Error:",
                error
            );

            if (error.response) {

                setMessage(
                    `Failed to load job descriptions. Status: ${error.response.status}`
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

    const handleAnalyze = (jobDescriptionId) => {

        navigate(
            `/resume-comparison?jobDescriptionId=${jobDescriptionId}`
        );
    };

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
                                My Job Descriptions
                            </h1>

                            <p>
                                Manage your saved job descriptions
                                and analyze them with your resumes.
                            </p>

                        </div>

                        <button
                            className="primary-button"
                            onClick={() =>
                                navigate("/job-description")
                            }
                        >
                            + Add Job Description
                        </button>

                    </div>

                    {/* Loading */}

                    {loading && (

                        <div className="management-status-card">

                            <div className="loading-spinner"></div>

                            <h3>
                                Loading job descriptions...
                            </h3>

                            <p>
                                Please wait while we fetch your
                                saved job descriptions.
                            </p>

                        </div>

                    )}

                    {/* Error */}

                    {!loading && message && (

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
                                onClick={fetchJobDescriptions}
                            >
                                Try Again
                            </button>

                        </div>

                    )}

                    {/* Empty State */}

                    {!loading &&
                    !message &&
                    jobDescriptions.length === 0 && (

                        <div className="management-status-card">

                            <div className="empty-state-icon">
                                💼
                            </div>

                            <h2>
                                No Job Descriptions Yet
                            </h2>

                            <p>
                                You haven't saved any job descriptions.
                                Add your first one to start analyzing
                                your resume.
                            </p>

                            <button
                                className="primary-button"
                                onClick={() =>
                                    navigate("/job-description")
                                }
                            >
                                + Add Job Description
                            </button>

                        </div>
                    )}

                    {/* Job Description List */}

                    {!loading &&
                    !message &&
                    jobDescriptions.length > 0 && (

                        <section className="job-management-section">

                            <div className="management-list-header">

                                <div>

                                    <h2>
                                        Saved Job Descriptions
                                    </h2>

                                    <p>
                                        {jobDescriptions.length}{" "}
                                        {jobDescriptions.length === 1
                                            ? "job description"
                                            : "job descriptions"}{" "}
                                        saved
                                    </p>

                                </div>

                                <button
                                    className="secondary-button"
                                    onClick={fetchJobDescriptions}
                                >
                                    ↻ Refresh
                                </button>

                            </div>

                            <div className="job-description-list">

                                {jobDescriptions.map(
                                    (jobDescription) => (

                                        <div
                                            className="job-management-card"
                                            key={jobDescription.id}
                                        >

                                            {/* Icon */}

                                            <div className="job-card-icon">
                                                💼
                                            </div>

                                            {/* Main Content */}

                                            <div className="job-card-content">

                                                <div className="job-card-title-row">

                                                    <h3>
                                                        {jobDescription.jobTitle}
                                                    </h3>

                                                    <span className="job-id-badge">
                                                        ID #{jobDescription.id}
                                                    </span>

                                                </div>

                                                <p className="job-description-preview">
                                                    {jobDescription.description}
                                                </p>

                                                <div className="job-card-meta">

                                                    <span>
                                                        📄 Job Description
                                                    </span>

                                                    <span>
                                                        • Saved Job
                                                    </span>

                                                </div>

                                            </div>

                                            {/* Action */}

                                            <button
                                                className="analyze-button"
                                                onClick={() =>
                                                    handleAnalyze(
                                                        jobDescription.id
                                                    )
                                                }
                                            >
                                                Analyze Resume
                                                <span>
                                                    →
                                                </span>
                                            </button>

                                        </div>
                                    )
                                )}

                            </div>

                        </section>
                    )}

                </section>

            </main>

        </div>
    );
}

export default JobDescriptionManagement;
