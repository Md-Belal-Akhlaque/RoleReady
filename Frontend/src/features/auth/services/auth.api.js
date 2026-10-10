import axios from "axios";

 

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const register = async({username,email,password})=>{
    try{

        const response = await api.post("/api/auth/register",{
            username,
            email,
            password
        });

        console.log(response);
        
        return response.data;

    }catch(err){
        console.log(err)
        console.log(err.message);
    }
}

export const login = async ({email,password})=>{
    try{

        const response = await api.post("/api/auth/login",{
            email,
            password
        });
        console.log(response);

        return response.data;

    }catch(err){
        console.log(err)
        console.log(err.message);
    }
}

export const logout = async()=>{
    try {
        const response = await api.post("/api/auth/logout");
            console.log(response);
            return response.data;

    } catch (error) {
        console.log(error);
    }
}

export const getMe = async()=>{
    try {
        const response = await api.get("/api/auth/get-me",{
            withCredentials:true
        })

        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}