import client, { setAuthorizationHeader } from "../../api/client"
import { storage } from "../../utils/storage";


export const loginService=async(data)=>{
    try {
        const response = await client.post('/api/auth/login',data)
        console.log(response)
        setAuthorizationHeader(response.token);
        storage.set('authToken', response.token);
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const registerUserService=async (data)=>{
    try {
        const response = await client.post('/api/auth/register',data)

        return response
    } catch (error) {
        throw new Error(error.message)
    }
}