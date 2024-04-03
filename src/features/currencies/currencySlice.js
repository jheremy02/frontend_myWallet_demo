import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCurrenciesService, getCurrencyUser } from '../../components/configs/services'

export const getCurrenciesThunk = createAsyncThunk('currencies/currenciesThunk', async () => {
    const response = await getCurrenciesService()
    return response
})

export const getMyCurrencyThunk=createAsyncThunk('currencies/myCurrencyThunk',async ()=>{
    const response= await getCurrencyUser();

    return response
})


const initialState = {
    currenciesList: [],
    currencySelected: null,
    myCurrency:{
        id_currency
        :''},
    isLoading:false,
    success:true,
    error:false
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {

        currencySelected: (state, action) => {
            state.myCurrency=action.payload
        }

    },
    extraReducers: (builder) => {

        builder.addCase(getCurrenciesThunk.pending,(state, action)=>{
            state.isLoading=true
        }) ;
        
        builder.addCase(getCurrenciesThunk.fulfilled,(state, action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {data}=action.payload
            state.currenciesList=data
   
        })

        builder.addCase(getCurrenciesThunk.rejected,(state, action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
        
        })

        builder.addCase(getMyCurrencyThunk.pending,(state, action)=>{
            state.isLoading=true
        }) ;
        
        builder.addCase(getMyCurrencyThunk.fulfilled,(state, action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {data}=action.payload
            state.myCurrency=data
   
        })

        builder.addCase(getMyCurrencyThunk.rejected,(state, action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
        
        })
    }
})


export const { currencySelected } = currencySlice.actions

export default currencySlice.reducer