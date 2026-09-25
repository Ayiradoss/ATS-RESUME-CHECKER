import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setMessage("");

        if (!email.trim()) {
            setMessage("Please enter your email.");
            return;
        }

        if (!password.trim()) {
            setMessage("Please enter your password.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/api/users/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log(
                "Login Response:",
                response.data
            );

            /*
             * Save logged-in user
             * in localStorage.
             */
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            setMessage(
                "Login successful!"
            );

            /*
             * Go to Dashboard
             */
            navigate("/dashboard");

        } 
        catch (error) {

            console.error(
                "Login Error:",
                error
            );

            if (error.response) {


                if (error.response.status === 401) {

                    setMessage(
                        "Invalid email or password."
                    );

                } 
                else {

                    setMessage(
                        `Login failed. Status: ${error.response.status}`
                    );
                }

            } 
            else if (error.request) {

                setMessage(
                    "Backend server did not respond."
                );

            }
            else {

                setMessage(
                    "Error: " + error.message
                );
            }

        } 
        finally {
            
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* Left Side */}

            <div className="auth-left">

                <div className="auth-brand">

                    <div className="auth-logo">
                        A
                    </div>

                    <h2>
                        ATS Checker
                    </h2>

                </div>

                <div className="auth-intro">

                    <p className="auth-label">
                        RESUME INTELLIGENCE
                    </p>

                    <h1>
                        Build a resume
                        <br />
                        that gets noticed.
                    </h1>

                    <p>
                        Compare your resume with job
                        descriptions, discover missing skills,
                        and improve your ATS score.
                    </p>

                </div>

                <div className="auth-feature">

                    <div className="feature-icon">
                        ✓
                    </div>

                    <div>
                        <strong>
                            Smart Resume Analysis
                        </strong>

                        <p>
                            Identify matched and missing
                            skills instantly.
                        </p>
                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="auth-right">

                <div className="auth-form-container">

                    <div className="mobile-brand">

                        <div className="auth-logo">
                            A
                        </div>

                        <h2>
                            ATS Checker
                        </h2>

                    </div>

                    <div className="auth-heading">

                        <h1>
                            Welcome back
                        </h1>

                        <p>
                            Sign in to continue to your dashboard.
                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="auth-form"
                    >

                        {/* Email */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your email"
                            />

                        </div>

                        {/* Password */}

                        <div className="form-group">

                            <div className="label-row">

                                <label>
                                    Password
                                </label>

                            </div>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your password"
                            />

                        </div>

                        {/* Message */}

                        {message && (

                            <div
                                className={
                                    message ===
                                    "Login successful!"
                                        ? "success-message"
                                        : "error-message"
                                }
                            >
                                {message}
                            </div>

                        )}

                        {/* Button */}

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"}

                            {!loading && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </form>

                    {/* Register */}

                    <div className="auth-switch">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            onClick={() =>
                                navigate("/register")
                            }
                        >
                            Create account
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;