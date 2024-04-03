import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOperationService, deleteOperationService, getOperationsService, updateOperationService } from '../../components/operations/services';


const initialState = {

    operationsList: [],
    isLoading: false,
    success: true,
    error: false,
    operationSelected: {

    }

};

export const createOperationThunk = createAsyncThunk('operations/createOperationThunk', async (newOperation) => {

    const response = await createOperationService(newOperation)
    return response

})


export const updateOperationThunk=createAsyncThunk('operations/updateOperationThunk',async (updatedOperation)=>{
    const response =await updateOperationService(updatedOperation)
    return response 
})


export const getOperationsThunk= createAsyncThunk('operations/getOperationsThunk',async(customParams)=>{
    const response = await getOperationsService(customParams);

    return response
})


export const deleteOperationThunk=createAsyncThunk('',async (idOperation)=>{
    const response = await deleteOperationService(idOperation)
    return response
})


const operationsSlice = createSlice({

    name: 'operationsSlice',
    initialState,
    reducers:{

        operationSelectedReducer:(state,action)=>{

            state.operationSelected=action.payload

        }

    },
    extraReducers: (builder) => {

        builder.addCase(createOperationThunk.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(createOperationThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = false
            state.success = true

        })

        builder.addCase(createOperationThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.success = false
            
        })

        builder.addCase(getOperationsThunk.pending, (state, action) => {
            state.isLoading = true
        })


        builder.addCase(getOperationsThunk.fulfilled, (state, action) => {

            state.isLoading = false
            state.error = false
            state.success = true
            const {data}=action.payload
            state.operationsList=data

        })

        builder.addCase(getOperationsThunk.rejected, (state, action) => {

            state.isLoading = false
            state.error = true
            state.success = false
            
        })

        builder.addCase(updateOperationThunk.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(updateOperationThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = false
            state.success = true

        })

        builder.addCase(updateOperationThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.success = false
            
        })

        builder.addCase(deleteOperationThunk.pending,(state, action)=>{
            state.isLoading = true
        })

        builder.addCase(deleteOperationThunk.fulfilled,(state, action)=>{
            state.isLoading = false
            state.error = false
            state.success = true
        })

        builder.addCase(deleteOperationThunk.rejected,(state, action)=>{
            state.isLoading = false
            state.error = true
            state.success = false
        })

    }
})

export const { operationSelectedReducer}=operationsSlice.actions

export  default operationsSlice.reducer