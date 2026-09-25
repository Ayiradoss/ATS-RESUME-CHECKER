import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function JobDescription() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [jobTitle, setJobTitle] = useState("");
    const [description, setDescription] = useState("");

    const [message, setMessage] = useState("");
    const [jobDescription, setJobDescription] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Check login
        if (!user) {
            setMessage("Please login first.");
            navigate("/login");
            return;
        }

        // Check user ID
        if (!user.id) {
            setMessage(
                "User ID not found. Please login again."
            );

            localStorage.removeItem("user");
            navigate("/login");
            return;
        }

        // Validate job title
        if (!jobTitle.trim()) {
            setMessage("Please enter a job title.");
            return;
        }

        // Validate description
        if (!description.trim()) {
            setMessage("Please enter a job description.");
            return;
        }

        setLoading(true);
        setMessage("");
        setJobDescription(null);

        try {

            const response = await api.post(
                "/job-descriptions",
                null,
                {
                    params: {
                        userId: user.id,
                        jobTitle: jobTitle,
                        description: description
                    }
                }
            );

            console.log(
                "Job Description Response:",
                response.data
            );

            setJobDescription(response.data);

            setMessage(
                "Job description added successfully!"
            );

            setJobTitle("");
            setDescription("");

        } catch (error) {

            console.error(
                "Job Description Error:",
                error
            );

            if (error.response) {

                console.log(
                    "Status:",
                    error.response.status
                );

                console.log(
                    "Response:",
                    error.response.data
                );

                setMessage(
                    `Failed to add job description. Status: ${error.response.status}`
                );

            } else if (error.request) {

                setMessage(
                    "Request sent, but no response received from backend."
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
                                Add Job Description
                            </h1>

                            <p>
                                Save a job description to compare
                                it with your resume.
                            </p>

                        </div>

                        <button
                            className="secondary-button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            ← Dashboard
                        </button>

                    </div>

                    {/* Form Card */}

                    <div className="job-description-card">

                        <div className="form-card-header">

                            <div className="form-header-icon">
                                💼
                            </div>

                            <div>

                                <h2>
                                    Job Details
                                </h2>

                                <p>
                                    Enter the job information below.
                                </p>

                            </div>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="job-description-form"
                        >

                            {/* Job Title */}

                            <div className="form-group">

                                <label htmlFor="jobTitle">
                                    Job Title
                                </label>

                                <input
                                    id="jobTitle"
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) =>
                                        setJobTitle(e.target.value)
                                    }
                                    placeholder="Example: Java Developer"
                                    disabled={loading}
                                />

                                <span className="input-help">
                                    Enter the position you are applying for.
                                </span>

                            </div>

                            {/* Job Description */}

                            <div className="form-group">

                                <div className="label-row">

                                    <label htmlFor="description">
                                        Job Description
                                    </label>

                                    <span className="character-count">
                                        {description.length} characters
                                    </span>

                                </div>

                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Paste the complete job description here..."
                                    rows="12"
                                    disabled={loading}
                                />

                                <span className="input-help">
                                    Include responsibilities, requirements,
                                    skills and qualifications.
                                </span>

                            </div>

                            {/* Message */}

                            {message && (
                                <div
                                    className={
                                        jobDescription
                                            ? "form-message success-message"
                                            : "form-message error-message"
                                    }
                                >
                                    <span>
                                        {jobDescription ? "✓" : "!"}
                                    </span>

                                    <p>
                                        {message}
                                    </p>
                                </div>
                            )}

                            {/* Submit */}

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() =>
                                        navigate("/dashboard")
                                    }
                                    disabled={loading}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Saving..."
                                        : "Save Job Description"}

                                    {!loading && (
                                        <span>→</span>
                                    )}
                                </button>

                            </div>

                        </form>

                    </div>

                    {/* Saved Result */}

                    {jobDescription && (
                        <div className="saved-job-card">

                            <div className="saved-job-icon">
                                ✓
                            </div>

                            <div className="saved-job-content">

                                <h2>
                                    Job Description Saved
                                </h2>

                                <p>
                                    Your job description has been
                                    successfully saved.
                                </p>

                                <div className="saved-job-details">

                                    <div>
                                        <span>
                                            Job ID
                                        </span>

                                        <strong>
                                            {jobDescription.id}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Job Title
                                        </span>

                                        <strong>
                                            {jobDescription.jobTitle}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                            <button
                                className="secondary-button"
                                onClick={() =>
                                    navigate(
                                        "/my-job-descriptions"
                                    )
                                }
                            >
                                View My Jobs →
                            </button>

                        </div>
                    )}

                </section>

            </main>

        </div>
    );
}

export default JobDescription;
