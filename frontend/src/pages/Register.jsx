
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");

        if (!fullName.trim()) {
            setMessage("Please enter your full name.");
            return;
        }

        if (!email.trim()) {
            setMessage("Please enter your email.");
            return;
        }

        if (!password.trim()) {
            setMessage("Please enter a password.");
            return;
        }

        if (password.length < 6) {
            setMessage(
                "Password must be at least 6 characters."
            );
            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/api/users/register",
                {
                    fullName: fullName,
                    email: email,
                    password: password
                }
            );

            console.log(
                "Register Response:",
                response.data
            );

            setMessage(
                "Registration successful! Please login."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            console.error(
                "Register Error:",
                error
            );

            if (error.response) {

                if (error.response.status === 409) {

                    setMessage(
                        "Email already exists."
                    );

                } else {

                    setMessage(
                        `Registration failed. Status: ${error.response.status}`
                    );
                }

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

    return (
        <div className="auth-page">

            {/* LEFT SIDE */}

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
                        Take your resume
                        <br />
                        to the next level.
                    </h1>

                    <p>
                        Create your account and start
                        analyzing your resume against
                        real job requirements.
                    </p>

                </div>

                <div className="auth-feature">

                    <div className="feature-icon">
                        ✓
                    </div>

                    <div>

                        <strong>
                            Improve Your ATS Score
                        </strong>

                        <p>
                            Find missing skills and optimize
                            your resume for better results.
                        </p>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}

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
                            Create your account
                        </h1>

                        <p>
                            Start improving your resume today.
                        </p>

                    </div>


                    <form
                        onSubmit={handleRegister}
                        className="auth-form"
                    >

                        {/* FULL NAME */}

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                placeholder="Enter your full name"
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Create a password"
                            />

                        </div>


                        {/* MESSAGE */}

                        {message && (

                            <div
                                className={
                                    message.includes(
                                        "successful"
                                    )
                                        ? "success-message"
                                        : "error-message"
                                }
                            >
                                {message}
                            </div>

                        )}


                        {/* REGISTER BUTTON */}

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating account..."
                                : "Create Account"}

                            {!loading && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </form>


                    {/* LOGIN LINK */}

                    <div className="auth-switch">

                        <span>
                            Already have an account?
                        </span>

                        <button
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Sign in
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;