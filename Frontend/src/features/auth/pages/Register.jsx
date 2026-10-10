import{Link, useNavigate} from "react-router";
import {useAuth} from "../hooks/useAuth.js";
import {useState} from "react";

const Register = () => {

  const navigate = useNavigate();
  const {handleRegister,loading} = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await handleRegister({
        username,
        email,
        password
    });

    if (result.success) {
        navigate("/home");
    } else {
        setError(result.message);
    }
};


if (loading) {
    return (
        <main className="auth-page">
            <h1>Registering...</h1>
        </main>
    );
}

  return (
    <>
            <main className="auth-page">
                <div className="form-container">
                    <h1>Sign Up</h1>
                    {error && (
                        <p className="error-message" role="alert">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>

                    <div className="input-group">
                            <label htmlFor="username">Username</label>

                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                required
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>

                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="button primary-button"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>

                    </form>
                    <p>Already have an account? <Link to={"/auth/login"}> Login</Link> </p>
                </div>
            </main>
        </>
  )
}

export default Register