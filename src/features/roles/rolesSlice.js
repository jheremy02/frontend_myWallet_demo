import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRolesService } from '../../components/roles/service'
import { toast } from 'react-toastify'


export const getRolesThunk=createAsyncThunk('roles/getRolesThunk',async(params)=>{
    const response = await getRolesService(params)
  
    return response
})

const initialState={
    rolesList:[],
    isLoading:false,
    success:true,
    error:false
}

export const rolesSlice= createSlice({
    name:'roles',
    reducers:{},
    initialState,
    
    extraReducers:(builder)=>{

        builder.addCase(getRolesThunk.pending, (state, action) => {
            // Add user to the state array
            state.isLoading=true
          })
          builder.addCase(getRolesThunk.fulfilled, (state, action) => {
            const {payload}=action
            // Add user to the state array
            state.isLoading=false
            state.error=false
            state.success=true
            state.rolesList=payload.data
            console.log(payload)
            if (payload.success) {
                toast.success('Roles Cargados con exito!')
              } else {
                toast.warning('Algo salio mal')
              }
          })

          builder.addCase(getRolesThunk.rejected, (state, action) => {
            state.isLoading=false
            state.error=true
            state.success=false
            const {error}=action
            toast.error(error.message)
          })
          


    }
})

export default rolesSlice.reducer