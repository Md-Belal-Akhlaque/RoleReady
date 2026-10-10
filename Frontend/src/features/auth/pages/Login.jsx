
import "./auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await handleLogin({
        email,
        password
    });

    if (result.success) {
        navigate("/home");
    } else {
        setError(result.message);
    }
};


    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Login</h1>

                {error && (
                    <p className="error-message" role="alert">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="button primary-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/auth/register">Sign Up</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
