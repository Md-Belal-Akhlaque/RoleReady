import axios from "axios";

const api = axios.create({
  baseURL: "https://roleready-hlcd.onrender.com/",
  withCredentials: true,
});

export default api;

export const register = async ({ username, email, password }) => {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};

// export const login = async ({email,password})=>{
//     try{

//         const response = await api.post("/api/auth/login",{
//             email,
//             password
//         });
//         console.log(response);

//         return response.data;

//     }catch(err){
//         console.log(err)
//         console.log(err.message);
//     }
// }

export const login = async ({ email, password }) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const logout = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/get-me", {
      withCredentials: true,
    });

    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
