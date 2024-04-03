import { initFlowbite } from "flowbite";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesSelector } from "../features/categories/selectors";
import {
  accountMoneySelectedSelector,
  getAccountsSelector,
} from "../features/accountsMoney/selectors";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  deleteAccountMoneyThunk,
  getAccounstMoneyThunk,
} from "../features/accountsMoney/accountMoneySlice";
import ModalCreateAccountMoney from "../components/accountsMoney/ModalCreateAccountMoney";
import DropdownAccountsMoney from "../components/accountsMoney/DropdownAccountsMoney";
import ModalDeleteItem from "../components/ModalDeleteItem";
import ModalUpdateAccountMoney from "../components/accountsMoney/ModalUpdateAccountMoney";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Nombre",
  }),

  columnHelper.accessor("id_user", {
    header: () => "Usuario",
  }),

  columnHelper.accessor("name_company", {
    header: () => "Nombre Banco",
  }),

  columnHelper.accessor("total_money", {
    id: "Total",
  }),
  columnHelper.accessor((row) => row, {
    id: "options",
    cell: (info) => {
      return (
        <DropdownAccountsMoney
          accountMoney={info.getValue()}
        ></DropdownAccountsMoney>
      );
    },
    header: () => "",
  }),
];

function Accounts() {
  const accountsMoneyList = useSelector(getAccountsSelector);
  const dispatch = useDispatch();
  const accountMoneySelected = useSelector(accountMoneySelectedSelector);
  const { id, name } = accountMoneySelected;

  const table = useReactTable({
    data: accountsMoneyList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    initFlowbite();
    (async () => {
      await dispatch(getAccounstMoneyThunk({}));
    })();
  }, []);
  return (
    <div>
      <div className="block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Cuentas
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <ModalCreateAccountMoney></ModalCreateAccountMoney>
          <ModalDeleteItem
            itemSelected={{ id, nameItem: name }}
            submitThunk={deleteAccountMoneyThunk}
            listThunk={getAccounstMoneyThunk}
          ></ModalDeleteItem>
          <ModalUpdateAccountMoney></ModalUpdateAccountMoney>
        </p>

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
              {table.getRowModel().rows.length > 0 ?table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              )):(
                <tr>
                  <td colSpan={columns.length} className="text-center py-8">
                    <span className="text-gray-500">No hay resultados...</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
