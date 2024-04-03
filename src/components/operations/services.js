import client from "../../api/client"

export async function createOperationService(newOperation) {
    try {
        const response= client.post('/api/operations',newOperation)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}


export async function getOperationsService(customParams) {
    try {
        const response=await client.get('/api/operations',{params:customParams})
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}


export async function updateOperationService(updatedOperation) {
    try {
        const response =await client.put('/api/operations',updatedOperation)

        return response
    } catch (error) {
        
        if (error.statusCode && error.statusCode===409) {
            throw new Error('Conflicto de datos , organize correctamente sus operaciones para evitar saldos negativos en la cuenta afectada.')
        }
        throw new Error(error.message)
    }
}

export async function deleteOperationService(idOperation) {
    try {
        const response =await client.delete('/api/operations',{params:{id:idOperation}})

        return response
    } catch (error) {
       
        throw new Error(error.message)
    }
}

export async function getOperationsReport(customParams) {
    try {
        const response = await client.get('/api/operations/getOperationsReport',{params:customParams})
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}