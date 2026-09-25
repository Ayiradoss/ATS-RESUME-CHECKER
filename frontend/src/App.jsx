import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import JobDescription from "./pages/JobDescription";
import ResumeComparison from "./pages/ResumeComparison";
import AnalysisHistory from "./pages/AnalysisHistory";
import ResumeManagement from "./pages/ResumeManagement";
import JobDescriptionManagement from "./pages/JobDescriptionManagement";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Default Page */}
                <Route
                    path="/"
                    element={
                        <Navigate to="/login" />
                    }
                />

                {/* Authentication */}
                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard />
                    }
                />

                {/* Resume */}
                <Route
                    path="/resume-upload"
                    element={
                        <ResumeUpload />
                    }
                />

                <Route
                    path="/my-resumes"
                    element={
                        <ResumeManagement />
                    }
                />

                {/* Job Description */}
                <Route
                    path="/job-description"
                    element={
                        <JobDescription />
                    }
                />

                <Route
                    path="/my-job-descriptions"
                    element={
                        <JobDescriptionManagement />
                    }
                />

                {/* Resume Comparison */}
                <Route
                    path="/resume-comparison"
                    element={
                        <ResumeComparison />
                    }
                />

                {/* Analysis History */}
                <Route
                    path="/analysis-history"
                    element={
                        <AnalysisHistory />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;