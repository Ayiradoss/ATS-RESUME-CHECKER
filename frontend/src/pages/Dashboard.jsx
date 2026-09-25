import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <div className="dashboard-layout">

            {/* Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <main className="dashboard-main">

                <Navbar />

                <section className="dashboard-content">

                    {/* Welcome Section */}

                    <div className="welcome-section">

                        <div>

                            <h1>
                                Welcome back,{" "}
                                {user?.fullName || "there"} 👋
                            </h1>

                            <p>
                                Analyze your resume and improve
                                your chances of getting shortlisted.
                            </p>

                        </div>

                        <button
                            className="primary-button"
                            onClick={() =>
                                navigate(
                                    "/resume-comparison"
                                )
                            }
                        >
                            Analyze Resume
                            <span>→</span>
                        </button>

                    </div>

                    {/* Statistics */}

                    <section className="stats-grid">

                        <StatCard
                            icon="▣"
                            title="My Resumes"
                            value="—"
                            description="Uploaded resumes"
                        />

                        <StatCard
                            icon="▤"
                            title="Job Descriptions"
                            value="—"
                            description="Saved job descriptions"
                        />

                        <StatCard
                            icon="◈"
                            title="Average ATS Score"
                            value="—"
                            description="Based on your analyses"
                        />

                    </section>

                    {/* Quick Actions */}

                    <section className="dashboard-section">

                        <div className="section-heading">

                            <div>
                                <h2>
                                    Quick Actions
                                </h2>

                                <p>
                                    Start your next resume analysis
                                </p>
                            </div>

                        </div>

                        <div className="quick-actions-grid">

                            <QuickActionCard
                                icon="↑"
                                title="Upload Resume"
                                description="Upload a new resume for analysis"
                                onClick={() =>
                                    navigate(
                                        "/resume-upload"
                                    )
                                }
                            />

                            <QuickActionCard
                                icon="+"
                                title="Add Job Description"
                                description="Save a job description"
                                onClick={() =>
                                    navigate(
                                        "/job-description"
                                    )
                                }
                            />

                            <QuickActionCard
                                icon="◈"
                                title="Analyze Resume"
                                description="Compare your resume with a job"
                                onClick={() =>
                                    navigate(
                                        "/resume-comparison"
                                    )
                                }
                            />

                        </div>

                    </section>

                    {/* Management Section */}

                    <section className="dashboard-section">

                        <div className="section-heading">

                            <div>
                                <h2>
                                    Manage
                                </h2>

                                <p>
                                    Access your resumes and job descriptions
                                </p>
                            </div>

                        </div>

                        <div className="management-grid">

                            <button
                                className="management-card"
                                onClick={() =>
                                    navigate(
                                        "/my-resumes"
                                    )
                                }
                            >

                                <div className="management-icon">
                                    📄
                                </div>

                                <div>

                                    <h3>
                                        My Resumes
                                    </h3>

                                    <p>
                                        View your uploaded resumes
                                    </p>

                                </div>

                                <span>
                                    →
                                </span>

                            </button>

                            <button
                                className="management-card"
                                onClick={() =>
                                    navigate(
                                        "/my-job-descriptions"
                                    )
                                }
                            >

                                <div className="management-icon">
                                    💼
                                </div>

                                <div>

                                    <h3>
                                        My Job Descriptions
                                    </h3>

                                    <p>
                                        View your saved job descriptions
                                    </p>

                                </div>

                                <span>
                                    →
                                </span>

                            </button>

                            <button
                                className="management-card"
                                onClick={() =>
                                    navigate(
                                        "/analysis-history"
                                    )
                                }
                            >

                                <div className="management-icon">
                                    📊
                                </div>

                                <div>

                                    <h3>
                                        Analysis History
                                    </h3>

                                    <p>
                                        Review your previous analyses
                                    </p>

                                </div>

                                <span>
                                    →
                                </span>

                            </button>

                        </div>

                    </section>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;