import React, { useEffect } from "react";
import { initFlowbite } from 'flowbite'
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../features/users/usersSlice";
import { FaListUl } from "react-icons/fa6";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
import { getUsersSelector } from "../features/users/selectors";
import ModalCreateUser from "../components/users/ModalCreateUser";
import { getRolesThunk } from "../features/roles/rolesSlice";
import { Dropdown } from "flowbite-react";

const columnHelper = createColumnHelper();

const columns = [
  
    columnHelper.accessor("first_name", {
      header: () => "Nombres",
    }),
  
    columnHelper.accessor("last_name", {
      header: () => "Apellidos",
      
    }),
  
    columnHelper.accessor("email", {
      header: () => "Email",
      
    }),
  
    columnHelper.accessor('created_at', {
      header: () => "Creado",
      id: "created_at"
    }),
    columnHelper.accessor(row=>row, {
      id: 'options',
      cell: info  => {
        return <Dropdown label="" size="xs" renderTrigger={()=><button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><FaListUl></FaListUl></button>}>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Anular</Dropdown.Item>
        
      </Dropdown>
      },
      header: () => '',
    }),
  ];

function Users() {

    const users= useSelector(getUsersSelector)
    const data=users
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

    const dispatch=useDispatch()
    useEffect(()=>{
        initFlowbite();
        (async () =>{
            await  dispatch(getUsersThunk({}))
            await dispatch(getRolesThunk({}))
          })()
    },[])
  return (
    <div>
      <div
        
        className="block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 "
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Usuarios
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          
        </p>
        <ModalCreateUser></ModalCreateUser>
        

<div className="relative overflow-x-auto mt-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} scope="col" className="px-6 py-3">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-6 py-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
        </tbody>
    </table>
</div>

      </div>
    </div>
  );
}

export default Users;
