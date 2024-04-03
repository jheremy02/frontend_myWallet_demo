import client from "../../api/client"


export const getRolesService=async(customParams)=>{
    try {
        const response=client.get('/api/roles',{params:customParams})
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

