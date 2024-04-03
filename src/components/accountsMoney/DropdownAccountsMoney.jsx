import { Dropdown } from 'flowbite-react';
import React from 'react'
import { useDispatch } from 'react-redux'
import { showModalDeleteItemReducer, showModalUpdateAccountReducer, showModalUpdateReducer } from '../../features/ui/uiSlice'
import { FaListUl } from 'react-icons/fa6'
import { categorySelected } from '../../features/categories/categoriesSlice';
import { accountMoneySelected } from '../../features/accountsMoney/accountMoneySlice';

function DropdownAccountsMoney({accountMoney}) {
    const dispatch=useDispatch()
  return (
    <Dropdown   label="" size="xs" renderTrigger={()=><button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><FaListUl></FaListUl></button>}>
        <Dropdown.Item onClick={()=>{
            dispatch(showModalUpdateAccountReducer(true))
            dispatch( accountMoneySelected(accountMoney))
        }} >Editar</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          dispatch(showModalDeleteItemReducer(true))
          dispatch(accountMoneySelected(accountMoney))
        }}>Anular</Dropdown.Item>
        
      </Dropdown>
  )
}

export default DropdownAccountsMoney