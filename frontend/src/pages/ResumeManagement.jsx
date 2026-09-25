import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ResumeManagement() {

    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (!user || !user.id) {

            setMessage("Please login first.");
            setLoading(false);

            return;
        }

        fetchResumes();

    }, []);

    const fetchResumes = async () => {

        try {

            setLoading(true);
            setMessage("");

            const response = await api.get(
                `/api/resumes/user/${user.id}`
            );

            console.log(
                "Resume Management Response:",
                response.data
            );

            setResumes(response.data);

        } catch (error) {

            console.error(
                "Resume Management Error:",
                error
            );

            if (error.response) {

                setMessage(
                    `Failed to load resumes. Status: ${error.response.status}`
                );

            } else if (error.request) {

                setMessage(
                    "Backend server did not respond."
                );

            } else {

                setMessage(
                    "Something went wrong while loading resumes."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    const formatDate = (dateValue) => {

        if (!dateValue) {
            return "Date not available";
        }

        return new Date(dateValue).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    const getResumeName = (resume) => {

        if (resume.fileName) {
            return resume.fileName;
        }

        if (resume.filename) {
            return resume.filename;
        }

        if (resume.originalFileName) {
            return resume.originalFileName;
        }

        return `Resume #${resume.id}`;
    };

    const getUploadDate = (resume) => {

        if (resume.uploadedAt) {
            return resume.uploadedAt;
        }

        if (resume.createdAt) {
            return resume.createdAt;
        }

        return null;
    };

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <main className="main-content">

                <Navbar />

                <div className="management-page">

                    <div className="management-header">

                        <div>

                            <h1>
                                My Resumes
                            </h1>

                            <p>
                                Manage your uploaded resumes
                                and analyze them against job
                                descriptions.
                            </p>

                        </div>

                        <div className="header-actions">

                            <button
                                className="secondary-button"
                                onClick={fetchResumes}
                                disabled={loading}
                            >
                                {loading
                                    ? "Refreshing..."
                                    : "Refresh"}
                            </button>

                            <button
                                className="primary-button"
                                onClick={() =>
                                    navigate("/resume-upload")
                                }
                            >
                                + Upload Resume
                            </button>

                        </div>

                    </div>

                    {message && (

                        <div className="management-message error">
                            {message}
                        </div>

                    )}

                    {loading && (

                        <div className="loading-container">

                            <div className="loading-spinner"></div>

                            <p>
                                Loading your resumes...
                            </p>

                        </div>

                    )}

                    {!loading &&
                        !message &&
                        resumes.length === 0 && (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    📄
                                </div>

                                <h2>
                                    No resumes yet
                                </h2>

                                <p>
                                    Upload your first resume
                                    to start analyzing your
                                    resume against job
                                    descriptions.
                                </p>

                                <button
                                    className="primary-button"
                                    onClick={() =>
                                        navigate(
                                            "/resume-upload"
                                        )
                                    }
                                >
                                    Upload Your First Resume
                                </button>

                            </div>

                        )}

                    {!loading &&
                        !message &&
                        resumes.length > 0 && (

                            <>

                                <div className="resume-count">

                                    <strong>
                                        {resumes.length}
                                    </strong>

                                    {resumes.length === 1
                                        ? " resume"
                                        : " resumes"}

                                </div>

                                <div className="resume-grid">

                                    {resumes.map(
                                        (resume) => (

                                            <div
                                                className="resume-card"
                                                key={resume.id}
                                            >

                                                <div className="resume-card-top">

                                                    <div className="resume-file-icon">
                                                        PDF
                                                    </div>

                                                    <span className="resume-status">
                                                        Uploaded
                                                    </span>

                                                </div>

                                                <div className="resume-card-body">

                                                    <h2>
                                                        {getResumeName(
                                                            resume
                                                        )}
                                                    </h2>

                                                    <p className="resume-id">
                                                        Resume ID:{" "}
                                                        {resume.id}
                                                    </p>

                                                    <p className="resume-date">
                                                        Uploaded:{" "}
                                                        {formatDate(
                                                            getUploadDate(
                                                                resume
                                                            )
                                                        )}
                                                    </p>

                                                </div>

                                                <div className="resume-card-actions">

                                                    <button
                                                        className="primary-button full-width"
                                                        onClick={() =>
                                                            navigate(
                                                                `/resume-comparison?resumeId=${resume.id}`
                                                            )
                                                        }
                                                    >
                                                        Analyze Resume
                                                    </button>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </>

                        )}

                </div>

            </main>

        </div>
    );
}

export default ResumeManagement;