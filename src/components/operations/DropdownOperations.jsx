import { Dropdown } from 'flowbite-react'
import React from 'react'
import { FaListUl } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { showModalDeleteItemReducer, showModalUpdateOperationReducer } from '../../features/ui/uiSlice'
import { operationSelectedReducer } from '../../features/operations/operationsSlice'

function DropdownOperations({operation}) {
    const dispatch=useDispatch()
  return (
    <Dropdown   label="" size="xs" renderTrigger={()=><button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><FaListUl></FaListUl></button>}>
        <Dropdown.Item onClick={()=>{
          console.log(operation)
            dispatch(showModalUpdateOperationReducer(true))
            dispatch(operationSelectedReducer(operation))
        }} >Editar</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          dispatch(showModalDeleteItemReducer(true))
          dispatch(operationSelectedReducer(operation))
        }}>Anular</Dropdown.Item>
        
      </Dropdown>
  )
}

export default DropdownOperations