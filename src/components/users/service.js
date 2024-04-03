import client from "../../api/client";

export const getUsersService=async (customParams)=>{
    try {
        const response = await client.get('/api/users')
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}


export const createUserService=async (data)=>{
    try {
        const response = await client.post('/api/users',data)

        return response
    } catch (error) {
        throw new Error(error.message)
    }
}