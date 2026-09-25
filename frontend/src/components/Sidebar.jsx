import { useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <div className="logo-icon">
                    A
                </div>

                <div>
                    <h2>
                        ATS Checker
                    </h2>

                    <span>
                        Resume Intelligence
                    </span>
                </div>
            </div>

            <nav className="sidebar-nav">

                <button
                    className="nav-item active"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    <span>⌂</span>
                    Dashboard
                </button>

                <button
                    className="nav-item"
                    onClick={() =>
                        navigate("/my-resumes")
                    }
                >
                    <span>▣</span>
                    My Resumes
                </button>

                <button
                    className="nav-item"
                    onClick={() =>
                        navigate("/my-job-descriptions")
                    }
                >
                    <span>▤</span>
                    Job Descriptions
                </button>

                <button
                    className="nav-item"
                    onClick={() =>
                        navigate("/resume-comparison")
                    }
                >
                    <span>◈</span>
                    Analyze Resume
                </button>

                <button
                    className="nav-item"
                    onClick={() =>
                        navigate("/analysis-history")
                    }
                >
                    <span>◷</span>
                    Analysis History
                </button>

            </nav>

            <div className="sidebar-bottom">

                <button
                    className="nav-item"
                    onClick={() =>
                        alert(
                            "Settings will be added later."
                        )
                    }
                >
                    <span>⚙</span>
                    Settings
                </button>

                <button
                    className="nav-item logout"
                    onClick={handleLogout}
                >
                    <span>↪</span>
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;