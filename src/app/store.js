import { configureStore } from '@reduxjs/toolkit'
import usersSlice from '../features/users/usersSlice'
import rolesSlice from '../features/roles/rolesSlice'
import categoriesSlice from '../features/categories/categoriesSlice'
import uiSlice from '../features/ui/uiSlice'
import accountMoneySlice from '../features/accountsMoney/accountMoneySlice'
import operationsSlice from '../features/operations/operationsSlice'
import currencySlice from '../features/currencies/currencySlice'

export const store = configureStore({
  reducer: {
    users: usersSlice,
    roles: rolesSlice,
    categories: categoriesSlice,
    ui: uiSlice,
    accountsMoney: accountMoneySlice,
    operations:operationsSlice,
    currencies:currencySlice
  },
})