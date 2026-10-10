import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import {
    login,
    register,
    logout,
    getMe
} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const {
        user,
        setUser,
        loading,
        setLoading
    } = context;

    // const handleLogin = async ({ email, password }) => {
    //     setLoading(true);

    //     try {
    //         const data = await login({ email, password });

    //         setUser(data.user);

    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     } finally {
    //         setLoading(false);
    //     }
    // };


const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
        const data = await login({ email, password });

        if (!data?.success || !data?.user) {
            return {
                success: false,
                message: data?.message || "Login failed."
            };
        }

        setUser(data.user);

        return {
            success: true,
            message: data.message
        };

    } catch (error) {
        console.error(
            "Login error:",
            error.response?.data || error.message
        );

        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Unable to login. Please try again."
        };

    } finally {
        setLoading(false);
    }
};



const handleRegister = async ({ username, email, password }) => {
    setLoading(true);




    try {

            console.log("Register payload:", {
                    username,
                    email,
                    passwordProvided: Boolean(password)
                }); 

        const data = await register({
            username,
            email,
            password
        });

        if (!data?.success || !data?.user) {
            return {
                success: false,
                message: data?.message || "Registration failed."
            };
        }

        setUser(data.user);

        return {
            success: true,
            message: data.message
        };

    } catch (error) {
        console.error(
            "Registration error:",
            error.response?.data || error.message
        );

        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Unable to register. Please try again."
        };

    } finally {
        setLoading(false);
    }
};


    const handleLogout = async () => {
        setLoading(true);

        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetme = async () => {
        setLoading(true);

        try {
            const data = await getMe();
            setUser(data.user);

            return true;
        } catch (error) {
            setUser(null);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetme
    };
};




