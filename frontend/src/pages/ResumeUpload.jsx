import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ResumeUpload() {

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    const handleFile = (file) => {

        setMessage("");
        setMessageType("");

        if (!file) {
            return;
        }

        if (file.type !== "application/pdf") {

            setMessage("Only PDF files are allowed.");
            setMessageType("error");

            return;
        }

        if (file.size > 5 * 1024 * 1024) {

            setMessage("File size must be less than 5 MB.");
            setMessageType("error");

            return;
        }

        setSelectedFile(file);
    };

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        handleFile(file);
    };

    const handleDragOver = (event) => {

        event.preventDefault();

        setDragActive(true);
    };

    const handleDragLeave = () => {

        setDragActive(false);
    };

    const handleDrop = (event) => {

        event.preventDefault();

        setDragActive(false);

        const file = event.dataTransfer.files[0];

        handleFile(file);
    };

    const removeFile = () => {

        setSelectedFile(null);

        setMessage("");
        setMessageType("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpload = async () => {

        if (!user || !user.id) {

            setMessage("Please login first.");
            setMessageType("error");

            return;
        }

        if (!selectedFile) {

            setMessage("Please select a resume first.");
            setMessageType("error");

            return;
        }

        setUploading(true);
        setMessage("");
        setMessageType("");

        try {

            const formData = new FormData();

            formData.append("userId", user.id);
            formData.append("file", selectedFile);

            const response = await api.post(
                "/api/resumes/upload",
                formData
            );

            console.log("Resume Upload Response:", response.data);

            setMessage("Resume uploaded successfully.");
            setMessageType("success");

            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {

            console.error("Resume Upload Error:", error);

            if (error.response) {

                setMessage(
                    `Upload failed. Status: ${error.response.status}`
                );

            } else if (error.request) {

                setMessage(
                    "Backend server did not respond."
                );

            } else {

                setMessage(
                    "Something went wrong while uploading."
                );
            }

            setMessageType("error");

        } finally {

            setUploading(false);
        }
    };

    const formatFileSize = (bytes) => {

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <main className="main-content">

                <Navbar />

                <div className="resume-upload-page">

                    <div className="page-header">

                        <div>
                            <h1>Upload Resume</h1>

                            <p>
                                Upload your resume to analyze it against
                                job descriptions.
                            </p>
                        </div>

                        <button
                            className="secondary-button"
                            onClick={() =>
                                navigate("/my-resumes")
                            }
                        >
                            My Resumes
                        </button>

                    </div>

                    <div className="upload-card">

                        <div
                            className={`upload-drop-zone ${
                                dragActive
                                    ? "drag-active"
                                    : ""
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                        >

                            <div className="upload-icon">
                                ↑
                            </div>

                            <h2>
                                Drag & Drop your resume
                            </h2>

                            <p>
                                or click here to browse files
                            </p>

                            <span>
                                PDF files only • Maximum 5 MB
                            </span>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                hidden
                            />

                        </div>

                        {selectedFile && (

                            <div className="selected-file-card">

                                <div className="file-icon">
                                    PDF
                                </div>

                                <div className="file-info">

                                    <h3>
                                        {selectedFile.name}
                                    </h3>

                                    <p>
                                        {formatFileSize(
                                            selectedFile.size
                                        )}
                                    </p>

                                </div>

                                <button
                                    className="remove-file-button"
                                    onClick={removeFile}
                                >
                                    ×
                                </button>

                            </div>
                        )}

                        {message && (

                            <div
                                className={`upload-message ${messageType}`}
                            >
                                {message}
                            </div>
                        )}

                        <div className="upload-actions">

                            <button
                                className="secondary-button"
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="primary-button"
                                onClick={handleUpload}
                                disabled={
                                    uploading ||
                                    !selectedFile
                                }
                            >

                                {uploading
                                    ? "Uploading..."
                                    : "Upload Resume"}

                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default ResumeUpload;