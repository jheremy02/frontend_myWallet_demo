import { Dropdown } from 'flowbite-react';
import React from 'react'
import { useDispatch } from 'react-redux'
import { showModalDeleteItemReducer, showModalUpdateReducer } from '../../features/ui/uiSlice'
import { FaListUl } from 'react-icons/fa6'
import { categorySelected } from '../../features/categories/categoriesSlice';

function DropdownCategories({category}) {
    const dispatch=useDispatch()
  return (
    <Dropdown   label="" size="xs" renderTrigger={()=><button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><FaListUl></FaListUl></button>}>
        <Dropdown.Item onClick={()=>{
            dispatch(showModalUpdateReducer(true))
            dispatch(categorySelected(category))
        }} >Editar</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          dispatch(showModalDeleteItemReducer(true))
          dispatch(categorySelected(category))
        }}>Anular</Dropdown.Item>
        
      </Dropdown>
  )
}

export default DropdownCategories