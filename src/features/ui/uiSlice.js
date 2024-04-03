import {  createSlice } from '@reduxjs/toolkit'


const initialState={
    theme:'dark',
    isDark:true,
    dateRange:[null,null],
    categories:{
        showModalUpdate:false
    },

    showModalDeleteItem:false,
    accountsMoney:{
        showModalUpdate:false
    },
    operations:{
        showModalUpdateOperation:false
    }
}

export const uiSlice= createSlice({

    name:'ui',
    initialState,
    reducers:{
        showModalUpdateReducer: (state,action)=>{
            state.categories.showModalUpdate=action.payload
        },
        showModalDeleteItemReducer:(state,action)=>{
            state.showModalDeleteItem=action.payload
        },
        showModalUpdateAccountReducer:(state,action)=>{
            state.accountsMoney.showModalUpdate=action.payload
        },

        showModalUpdateOperationReducer:(state,action)=>{
            state.operations.showModalUpdateOperation=action.payload
        },

        setDateRangeReducer:(state,action)=>{
            state.dateRange=action.payload
        },

        setDarkTheme:(state,action)=>{

            state.isDark=action.payload
            state.theme=action.payload?'dark':'light'
            
        }

    },
    
})

export const { showModalUpdateReducer,setDateRangeReducer,showModalDeleteItemReducer ,showModalUpdateAccountReducer,showModalUpdateOperationReducer,setDarkTheme} = uiSlice.actions

export default uiSlice.reducer