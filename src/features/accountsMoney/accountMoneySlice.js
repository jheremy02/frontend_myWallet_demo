
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAccountMoneyService, deleteAccountMoneyService, getAccounstMoneyService, updateAccountMoneyService } from '../../components/accountsMoney/services'
import { toast } from 'react-toastify';


const initialState = {
    
    accountsMoneyList:[],
    isLoading:false,
    success:true,
    error:false,
    accountMoneySelected:{

    }

  };

export const createAccountMoneyThunk=createAsyncThunk("accountsMoney/createAccountMoneyThunk",async(newAccount)=>{
    const response= await createAccountMoneyService(newAccount)
    return response
})


export const getAccounstMoneyThunk=createAsyncThunk("accountsMoney/getAccounstMoneyThunk",async (customParams)=>{
    const response = await getAccounstMoneyService(customParams)
    return response
})

export const updateAccountMoneyThunk=createAsyncThunk("accountsMoney/updateAccountMoneyThunk",async (updatedAccount)=>{
    const response= await updateAccountMoneyService(updatedAccount)
    return response
})


export const deleteAccountMoneyThunk=createAsyncThunk("accountsMoney/deleteAccountMoneyThunk",async (idAccount)=>{
    const response = await deleteAccountMoneyService(idAccount)
    return response 
})





const accountsMoneySlice=createSlice({
    name:"accountsMoney",
    initialState,
    reducers:{
        accountMoneySelected:(state,action)=>{
            state.accountMoneySelected=action.payload
        }
    },

    extraReducers:(builder)=>{

        builder.addCase(createAccountMoneyThunk.pending,(state,action)=>{
            state.isLoading=true
        })

        builder.addCase(createAccountMoneyThunk.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {payload}=action
            if (payload.success) {
                toast.success('Cuenta registrada con exito!')
              } else {
                toast.warning('Algo salio mal')
              }
        })

        builder.addCase(createAccountMoneyThunk.rejected,(state,action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
        })

        builder.addCase(getAccounstMoneyThunk.pending,(state,action)=>{
            state.isLoading=true
        })

        builder.addCase(getAccounstMoneyThunk.fulfilled,(state,action)=>{
   
            state.isLoading=false
            state.error=false
            state.success=true
            const {data}=action.payload
            state.accountsMoneyList=data
            //toast.success("Cuentas cargadas con exito")
        })

        builder.addCase(getAccounstMoneyThunk.rejected,(state,action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
        })

        builder.addCase(updateAccountMoneyThunk.pending,(state,action)=>{
            state.isLoading=true
        })

        builder.addCase(updateAccountMoneyThunk.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {payload}=action
            
            if (payload.success) {
                toast.success('Cuenta actualizada con exito!')
              } else {
                toast.warning('Algo salio mal')
              }
        })

        builder.addCase(updateAccountMoneyThunk.rejected,(state,action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
        })

        builder.addCase(deleteAccountMoneyThunk.pending,(state,action)=>{
            state.isLoading=true
        })

        builder.addCase(deleteAccountMoneyThunk.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {payload}=action
            
            if (payload.success) {
                toast.success('Eliminado con exito!')
              } else {
                toast.warning('Algo salio mal')
              }
        })

        builder.addCase(deleteAccountMoneyThunk.rejected,(state,action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
        })
    }

})


export const {accountMoneySelected}=accountsMoneySlice.actions

export  default accountsMoneySlice.reducer