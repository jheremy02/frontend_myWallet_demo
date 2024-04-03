import client from "../../api/client"


export const getCategoriesService=async (customParams)=>{
    try {
        const response=await client.get('/api/categories',{params:customParams})
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createCategoryService=async(newCategory)=>{
    try {
        const response=await client.post('/api/categories',newCategory)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateCategoryService= async (updatedCategory)=>{
    try {
        const response=await client.put('/api/categories',updatedCategory)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}


export const deleteCategoryService= async (idCategory)=>{
    try {
        const response=await client.delete(`/api/categories/${idCategory}`)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}