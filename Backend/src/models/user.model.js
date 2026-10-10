import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: [true, "Username already exists"], // it ensures that each username is unique in the database
        required: true
    },
    email: {
        type: String,
        unique: [true, "Email already exists"], // it ensures that each email is unique in the database
        required: true
    },
    password:{
        type: String,
        required: true,
        unque: [true, "Password already exists"] // it ensures that each password is unique in the database
    }
})

const userModel = mongoose.model("users",userSchema);

export default userModel;