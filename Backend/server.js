import dotenv from "dotenv";
dotenv.config();
import app from "../Backend/src/app.js";
import connectDB from "../Backend/src/config/db.js";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})