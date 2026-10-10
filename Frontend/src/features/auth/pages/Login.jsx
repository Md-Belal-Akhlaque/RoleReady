import "./auth.form.scss";
import { Link,useNavigate } from "react-router";
import {useAuth} from "../hooks/useAuth.js";
import {useState} from "react";

const Login = () => {

    const navigate = useNavigate();

    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await handleLogin({
            email,
            password
        });

        if (success) {
            navigate("/home");
        }
    };

    if (loading) {
        return (
            <main className="auth-page">
                <h1>Loading....</h1>
            </main>
        );
    }

    return (
        <main className="auth-page">
            <div className="form-container">

                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
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
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="button primary-button"
                    >
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?
                    <Link to="/auth/register">
                        Sign Up
                    </Link>
                </p>

            </div>
        </main>
    );
};
// const Login = () => {

//     const navigate = useNavigate();
//     const {loading,handleLogin} = useAuth();
//     const [email,setEmail] = useState("")
//     const [password,setPassword] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // login API call here
//         handleLogin({email,password})
          

//     };
    
//     if(loading)
//         return(<main><h1>Loading....</h1></main>)
    
//     navigate("/home");

//     return (
//         <>
//             <main>
//                 <div className="form-container">
//                     <h1>Login</h1>

//                     <form onSubmit={handleSubmit} action="/login" method="POST">
                        
//                         <div className="input-group">
//                             <label htmlFor="email">Email</label>

//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 placeholder="Enter your email"
//                                 required
//                                 onChange={(e)=>{setEmail(e.target.value)}}
//                             />
//                         </div>

//                         <div className="input-group">
//                             <label htmlFor="password">
//                                 Password
//                             </label>

//                             <input
//                                 type="password"
//                                 name="password"
//                                 id="password"
//                                 placeholder="Enter your Password"
//                                 required
//                                 onChange={(prev)=>{setPassword(prev.target.value)}}
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="button primary-button"
//                         >
//                             Login
//                         </button>
//                     </form>
//                     <p>Don't have an account? <Link to={"/auth/register"}> Sign Up</Link> </p>
//                 </div>
//             </main>
//         </>
//     );
// };

export default Login;