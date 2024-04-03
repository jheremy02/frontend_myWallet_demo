import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCategoryService, deleteCategoryService, getCategoriesService, updateCategoryService } from '../../components/categories/service';
import { toast } from 'react-toastify';


export const getCategoriesThunk=createAsyncThunk('categories/getCategoriesThunk',async ()=>{
    const response= await getCategoriesService({})
    return response
})

export const createCategoryThunk=createAsyncThunk("categories/createCategoryThunk",async(newCategory)=>{
    const response= await createCategoryService(newCategory)
    return response
})

export const updateCategoryThunk=createAsyncThunk("categories/updateCategoryThunk",async(updatedCategory)=>{
    const response= await updateCategoryService(updatedCategory)
    return response
})

export const deleteCategoryThunk=createAsyncThunk("categories/deleteCategoryThunk",async(idCategory)=>{
    const response = await deleteCategoryService(idCategory)
    return response
})



const initialState = {
    
    categoriesList:[],
    isLoading:false,
    success:true,
    error:false,
    categorySelected:{

    }
  };


  export const categoriesSlice= createSlice({
    name:'categories',
    reducers:{
        categorySelected:(state,action)=>{
            state.categorySelected=action.payload
        }
    },
    initialState,
    
    extraReducers:(builder)=>{

        builder.addCase(getCategoriesThunk.pending,(state, action)=>{
            state.isLoading=true
        })
        
        builder.addCase(getCategoriesThunk.fulfilled,(state, action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {data}=action.payload
            state.categoriesList=data
           //toast.success("Categorias cargadas con exito")
        })

        builder.addCase(getCategoriesThunk.rejected,(state, action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
        })

        builder.addCase(createCategoryThunk.pending,(state, action)=>{
            state.isLoading=true
        })
        
        builder.addCase(createCategoryThunk.fulfilled,(state, action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {payload}=action
            if (payload.success) {
                toast.success('Category registrado con exito!')
              } else {
                toast.warning('Algo salio mal')
              }
        })

        builder.addCase(createCategoryThunk.rejected,(state, action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
        })

        builder.addCase(updateCategoryThunk.pending,(state, action)=>{
            state.isLoading=true
        })
        
        builder.addCase(updateCategoryThunk.fulfilled,(state, action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {payload}=action
            if (payload.success) {
                toast.success('Category actualizado con exito!')
              } else {
                toast.warning('Algo salio mal')
              }
        })

        builder.addCase(updateCategoryThunk.rejected,(state, action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
        })

        builder.addCase(deleteCategoryThunk.pending,(state, action)=>{
            state.isLoading=true
        })
        
        builder.addCase(deleteCategoryThunk.fulfilled,(state, action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {payload}=action
            if (payload.success) {
                toast.success('Category eliminado con exito!')
              } else {
                toast.warning('Algo salio mal')
              }
        })

        builder.addCase(deleteCategoryThunk.rejected,(state, action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
        })

    }
})

export const {categorySelected}=categoriesSlice.actions

export default categoriesSlice.reducer