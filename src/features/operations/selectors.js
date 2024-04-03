import { createSelector } from '@reduxjs/toolkit'


const getOperationsBaseSelector = state => state.operations.operationsList;
const getCategoriesSelector = state => state.categories.categoriesList;
const getAccountsSelector = state => state.accountsMoney.accountsMoneyList
export const getOperationsSelector = createSelector(
  getOperationsBaseSelector,
  getCategoriesSelector,
  getAccountsSelector,
  (operations, categories, accounts) => {

    const operationsResult = []

    operations.forEach(operation => {
      const categoryFound = categories.find(category => category.id == operation.id_type_category)
      const accountFound = accounts.find(account => account.id == operation.id_account_money)
      if (categoryFound && accountFound) {
        
        operationsResult.push({ ...operation, category: categoryFound, account: accountFound })
      }

    });



    return operationsResult
  }
);

export const getOperationSelected = (state) => state.operations.operationSelected
