import jwt from "jsonwebtoken";

const generateToken = (user) => {
    try {
        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return token;
        
    } catch (err) {
        console.error("Error generating token:", err);
        throw new Error("Token generation failed");
    }
};

export default generateToken;
