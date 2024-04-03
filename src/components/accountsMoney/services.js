import client from "../../api/client"

export const createAccountMoneyService=async (newAccount)=>{
    try {
        const response = await client.post("/api/accounts-money",newAccount)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAccounstMoneyService=async(customParams)=>{
    try {
        const response= await client.get("/api/accounts-money",{params:customParams})
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateAccountMoneyService=async(updatedAccount)=>{
    try {
        const response = await client.put("/api/accounts-money",updatedAccount)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteAccountMoneyService=async(idAccount)=>{
    try {
        const response = await client.delete(`/api/accounts-money/${idAccount}`);
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}
