import axios from "axios";

const api = axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})

export async function register({email,contact,password,fullname, isSeller}){
    console.log(email,contact,fullname,isSeller)

    const response = await api.post("/register",{
        email,
        contact,
        password,
        fullname,
        isSeller
    })
    console.log(response.data)

    return response.data
}

export async function login({email,password}){

    /** axios ka instance pe host define nahi karte,  jis tab par is api ko call kiya jayega usi ke host ko consider karte hai 
     * 
     * http://localhost:5173/api/auth/login
     */


    const response = await api.post("/login",{
        email,
        password

    })
    return response.data
}

export async function getMe(){
    const response = await api.get("/me")
    return response.data
}