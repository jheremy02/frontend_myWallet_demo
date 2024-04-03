import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserService, getUsersService } from '../../components/users/service'
import { toast } from 'react-toastify'
import { loginService, registerUserService } from '../../components/auth/service'
import { storage } from '../../utils/storage'

export const getUsersThunk=createAsyncThunk('users/getUsersThunk',async(params)=>{

    const response = await getUsersService(params)
  
    return response
  
  })

export const createUserThunk=createAsyncThunk('users/createUserThunk',async(data)=>{
    const response=await createUserService(data)
    return response
})

export const registerUserThunk=createAsyncThunk('users/registerUserThunk',async(data)=>{
  const response=await registerUserService(data)
  return response
})

export const loginUserThunk=createAsyncThunk('users/loginUserThunk',async (data) =>{
  const response = await loginService(data)
  return response
} )

const accessToken = storage.get("authToken");

  const initialState = {
    
    usersList:[],
    isLoading:false,
    success:true,
    error:false,
    isLogged:!!accessToken,
    userLogged:null
  };

export const usersSlice= createSlice({
    name:'users',
    reducers:{
      userIsLogged:(state,action)=>{
        state.isLogged=action.payload
      },

      userLogged:(state,action)=>{
        state.userLogged=action.payload
      }

    },
    initialState,
    
    extraReducers:(builder)=>{

        builder.addCase(getUsersThunk.pending, (state, action) => {
            // Add user to the state array
            state.isLoading=true
          })
        
          builder.addCase(getUsersThunk.fulfilled, (state, action) => {
            // Add user to the state array
            //toast.dismiss(state.isLoading)
            
            state.usersList=action.payload
            state.isLoading=false
            
          })
      
          builder.addCase(getUsersThunk.rejected, (state, action) => {
            // Add user to the state array
            
            state.isLoading=false
            const {error}=action
            toast.error(error.message)
      
          })

          builder.addCase(createUserThunk.pending,(state, action)=>{
            state.isLoading=true
          })

          builder.addCase(createUserThunk.fulfilled,(state, action)=>{
            
            const {payload}=action
            state.isLoading=false
            state.success=true
            state.error=false

            if (payload.success) {
              toast.success('Usuario registrado con exito')
            } else {
              toast.warning('Algo salio mal')
            }

          })
          
          builder.addCase(createUserThunk.rejected, (state, action) => {
            // Add user to the state array
            console.log(action)
            state.isLoading=false
            const {error}=action
           toast.error(error.message)
      
          })


          builder.addCase(loginUserThunk.pending,(state, action)=>{
            state.isLoading=true
          })

          builder.addCase(loginUserThunk.fulfilled,(state, action)=>{
            const {payload}=action
            state.isLoading=false
            state.success=true
            state.error=false
            if (payload.success) {
              toast.success('Usuario logueado con exito')
            } else {
              toast.warning('Algo salio mal')
            }
          })

          builder.addCase(loginUserThunk.rejected,(state, action)=>{

            state.isLoading=false
            const {error}=action
            toast.error(error.message)

          })

          
          builder.addCase(registerUserThunk.pending,(state, action)=>{
            state.isLoading=true
          })

          builder.addCase(registerUserThunk.fulfilled,(state, action)=>{
            
            const {payload}=action
            state.isLoading=false
            state.success=true
            state.error=false

            if (payload.success) {
              toast.success('Usuario registrado con exito')
            } else {
              toast.warning('Algo salio mal')
            }

          })
          
          builder.addCase(registerUserThunk.rejected, (state, action) => {
            // Add user to the state array
            console.log(action)
            state.isLoading=false
            const {error}=action
           toast.error(error.message)
      
          })



    }
})

export const {userIsLogged,userLogged}=usersSlice.actions

export default usersSlice.reducer;