import client from "../../api/client"


export const getCurrenciesService = async () => {
    try {
        const response = await client.get('/api/currency')
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export async  function   updateMyCurrency(updatedCurrency) {
    try {
        const response = await client.put('/api/currency',updatedCurrency)

        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getCurrencyUser = async () => {
    try {
        const response= client.get('/api/currency/myCurrency');
        return response
    } catch (error) {   
        throw new Error(error.message);
    }
}

